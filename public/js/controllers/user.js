angular.module('myControllers').controller('UserController', function($filter, $q, apiService, paginationService, trackService, userService) {

  var vm  = this;

  vm.getTopTracks = function(user) {
    apiService.getLastFmKey(function(response) {

      userService.getTopTracks(response.data, user, function(response) {
        vm.tracks = [];

        var promises = [];

        angular.forEach(response.data.toptracks.track, function(track, index) {
          var deferred = $q.defer();

          trackService.getInfo(track.artist.name, track.name, function(response) {
            vm.tracks.push({
              id: response.data.tracks.items[0].id,
              album: {
                id: response.data.tracks.items[0].album.id,
                name: response.data.tracks.items[0].album.name,
                url: response.data.tracks.items[0].album.external_urls.spotify
              },
              artist: {
                id: response.data.tracks.items[0].artists[0].id,
                name: response.data.tracks.items[0].artists[0].name,
                url: response.data.tracks.items[0].artists[0].external_urls.spotify
              },
              duration: $filter('secondsToMinutes')(track.duration),
              name: response.data.tracks.items[0].name,
              playcount: parseInt(track.playcount),
              return: {
                dollars: parseFloat(track.playcount * 0.006),
                euros: parseFloat($filter('dollarsToEuros')(track.playcount * 0.006))
              },
              url: response.data.tracks.items[0].external_urls.spotify
            });

            deferred.resolve(response);
          }, function(response) {
            console.log(response);
          });

          promises.push(deferred.promise);
        });

        $q.all(promises).then(function(responses) {
          vm.tracks = $filter('orderBy')(vm.tracks, 'playcount', true);
          vm.showTracks = true;

          vm.totalPlaycount = 0;
          vm.albums = [];
          vm.artists = [];

          angular.forEach(vm.tracks, function(track) {
            vm.totalPlaycount += parseInt(track.playcount);

            var found = false;

            angular.forEach(vm.albums, function(album, index) {
              if(track.album.id == album.id) {
                found = true;

                vm.albums[index].playcount += parseInt(track.playcount);
                vm.albums[index].return.dollars += parseFloat(track.playcount * 0.006);
                vm.albums[index].return.euros += parseFloat($filter('dollarsToEuros')(track.playcount * 0.006));
                vm.albums[index].tracks.push({
                  id: track.id,
                  name: track.name,
                  url: track.url
                });
              }
            });

            if(!found) {
              vm.albums.push({
                id: track.album.id,
                artist: {
                  id: track.artist.id,
                  name: track.artist.name,
                  url: track.artist.url
                },
                name: track.album.name,
                playcount: parseInt(track.playcount),
                return: {
                  dollars: parseFloat(track.playcount * 0.006),
                  euros: parseFloat($filter('dollarsToEuros')(track.playcount * 0.006))
                },
                tracks: [{
                  id: track.id,
                  name: track.name,
                  url: track.url
                }],
                url: track.album.url
              });
            }

            found = false;

            angular.forEach(vm.artists, function(artist, index) {
              if(track.artist.id == artist.id) {
                found = true;

                vm.artists[index].playcount += parseInt(track.playcount);
                vm.artists[index].return.dollars += parseFloat(track.playcount * 0.006);
                vm.artists[index].return.euros += parseFloat($filter('dollarsToEuros')(track.playcount * 0.006));
                vm.artists[index].tracks.push({
                  id: track.id,
                  name: track.name,
                  url: track.url
                });
              }
            });

            if(!found) {
              vm.artists.push({
                id: track.artist.id,
                albums: [],
                name: track.artist.name,
                playcount: parseInt(track.playcount),
                return: {
                  dollars: parseFloat(track.playcount * 0.006),
                  euros: parseFloat($filter('dollarsToEuros')(track.playcount * 0.006))
                },
                tracks: [{
                  id: track.id,
                  name: track.name,
                  url: track.url
                }],
                url: track.artist.url
              });
            }
          });

          vm.albums = $filter('orderBy')(vm.albums, 'playcount', true);
          vm.showAlbums = true;

          angular.forEach(vm.artists, function(artist, index) {
            angular.forEach(vm.albums, function(album) {
              if(artist.id == album.artist.id) {
                vm.artists[index].albums.push({
                  id: album.id,
                  name: album.name,
                  url: album.url
                });
              }
            });
          });

          vm.artists = $filter('orderBy')(vm.artists, 'playcount', true);
          vm.showArtists = true;

          vm.tracksPagination = paginationService.getTracksPagination(paginationService.paginate(vm.tracks, 15), 1);
          vm.albumsPagination = paginationService.getAlbumsPagination(paginationService.paginate(vm.albums, 10), 1);
          vm.artistsPagination = paginationService.getArtistsPagination(paginationService.paginate(vm.artists, 5), 1);
        }, function(response) {
          console.log(response);
        });

      }, function(response) {
        console.log(response);
      });

    }, function(response) {
      console.log(response);
    });
  };

  vm.redirectToTracksPage = function(page) {
    if(page > 0 && page <= vm.tracksPagination.totalPages) {
      vm.tracksPagination = paginationService.getTracksPagination(paginationService.paginate(vm.tracks, 15), page);
    }
  };

  vm.redirectToAlbumsPage = function(page) {
    if(page > 0 && page <= vm.albumsPagination.totalPages) {
      vm.albumsPagination = paginationService.getAlbumsPagination(paginationService.paginate(vm.albums, 10), page);
    }
  };

  vm.redirectToArtistsPage = function(page) {
    if(page > 0 && page <= vm.artistsPagination.totalPages) {
      vm.artistsPagination = paginationService.getArtistsPagination(paginationService.paginate(vm.artists, 5), page);
    }
  };

});
