angular.module('myControllers').controller('UserController', function($filter, apiService, trackService, userService) {

  var vm  = this;

  vm.getTopTracks = function(user) {
    apiService.getLastFmKey(function(response) {

      userService.getTopTracks(response.data, user, function(response) {
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
              playcount: track.playcount,
              rank: index + 1,
              return: {
                dollars: $filter('number')(track.playcount * 0.006),
                euros: $filter('number')($filter('dollarsToEuros')(track.playcount * 0.006))
              },
              url: response.data.tracks.items[0].external_urls.spotify
            });
          }, function(response) {
            console.log(response);
          });
        });

        vm.showTopTracks = true;
      }, function(response) {
        console.log(response);
      });

    }, function(response) {
      console.log(response);
    });
  };

});
