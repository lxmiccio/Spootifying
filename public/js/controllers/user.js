angular.module('myControllers').controller('UserController', function($filter, userService) {

  var vm  = this;

  vm.getTopTracks = function(user) {
    userService.getTopTracks(user, function(response) {
      vm.tracks = [];
      angular.forEach(response.data.toptracks.track, function(track, index) {
        vm.tracks.push({
          artist: {
            name: track.artist.name,
            url: track.artist.url
          },
          dollars: $filter('number')(track.playcount * 0.006),
          duration: $filter('secondsToMinutes')(track.duration),
          euros: $filter('number')($filter('dollarsToEuros')(track.playcount * 0.006)),
          playcount: track.playcount,
          rank: index + 1,
          track: {
            name: track.name,
            url: track.url
          }
        });
      });
      vm.showTopTracks = true;
    }, function(response) {
      console.log(response);
    });
  };

});
