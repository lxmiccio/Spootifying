angular.module('myControllers').controller('UserController', function($filter, $q, apiService, trackService, userService) {

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
          vm.showTracks = true;

          vm.albums = [];
          vm.artists = [];

          angular.forEach(vm.tracks, function(track) {
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

          vm.showArtists = true;
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

});
