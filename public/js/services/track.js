angular.module('myServices').factory('trackService', function($http) {

  function getInfo(artist, track, onSuccess, onError) {
    $http.get('https://api.spotify.com/v1/search?q=artist:"' + artist + '" track:"' + track + '"&type=track').then(function(response) {
      onSuccess(response);
    }, function(response) {
      onError(response);
    });
  };

  return {
    getInfo: getInfo
  };

});
