angular.module('myControllers').controller('UserController', function($filter, apiService, trackService, userService) {

  var vm  = this;

  vm.getTopTracks = function(user) {
    apiService.getLastFmKey(function(response) {

      userService.getTopTracks(response.data, user, function(response) {
        vm.albums = [];
        vm.artists = [];
        vm.tracks = [];

        angular.forEach(response.data.toptracks.track, function(track, index) {
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
                dollars: $filter('number')(track.playcount * 0.006),
                euros: $filter('number')($filter('dollarsToEuros')(track.playcount * 0.006))
              },
              url: response.data.tracks.items[0].external_urls.spotify
            });

            var found = false;

            angular.forEach(vm.albums, function(album, index) {
              if(response.data.tracks.items[0].album.id == album.id) {
                found = true;

                vm.albums[index].playcount += parseInt(track.playcount);
                vm.albums[index].return.dollars = $filter('number')(parseFloat(album.return.dollars) + parseFloat(track.playcount * 0.006));
                vm.albums[index].return.euros = $filter('number')(parseFloat(album.return.euros) + parseFloat($filter('dollarsToEuros')(track.playcount * 0.006)));
                vm.albums[index].tracks.push({
                  id: response.data.tracks.items[0].id,
                  name: response.data.tracks.items[0].name,
                  url: response.data.tracks.items[0].external_urls.spotify
                });
              }
            });

            if(!found) {
              vm.albums.push({
                id: response.data.tracks.items[0].album.id,
                artist: {
                  id: response.data.tracks.items[0].artists[0].id,
                  name: response.data.tracks.items[0].artists[0].name,
                  url: response.data.tracks.items[0].artists[0].external_urls.spotify
                },
                name: response.data.tracks.items[0].album.name,
                playcount: parseInt(track.playcount),
                return: {
                  dollars: parseFloat($filter('number')(track.playcount * 0.006)),
                  euros: parseFloat($filter('number')($filter('dollarsToEuros')(track.playcount * 0.006)))
                },
                tracks: [{
                  id: response.data.tracks.items[0].id,
                  name: response.data.tracks.items[0].name,
                  url: response.data.tracks.items[0].external_urls.spotify
                }],
                url: response.data.tracks.items[0].album.external_urls.spotify
              });
            }

            found = false;

            angular.forEach(vm.artists, function(artist, index) {
              if(response.data.tracks.items[0].artists[0].id == artist.id) {
                found = true;

                vm.artists[index].return.dollars = $filter('number')(parseFloat(artist.return.dollars) + parseFloat(track.playcount * 0.006)),
                vm.artists[index].return.euros = $filter('number')(parseFloat(artist.return.euros) + parseFloat($filter('dollarsToEuros')(track.playcount * 0.006)))
              }
            });

            if(!found) {
              vm.artists.push({
                id: response.data.tracks.items[0].artists[0].id,
                name: response.data.tracks.items[0].artists[0].name,
                return: {
                  dollars: parseFloat($filter('number')(track.playcount * 0.006)),
                  euros: parseFloat($filter('number')($filter('dollarsToEuros')(track.playcount * 0.006)))
                },
                url: response.data.tracks.items[0].artists[0].external_urls.spotify
              });
            }

            console.log(vm.albums)
            console.log(vm.artists)
          }, function(response) {
            console.log(response);
          });
        });

      }, function(response) {
        console.log(response);
      });

    }, function(response) {
      console.log(response);
    });
  };

});
