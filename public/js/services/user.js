angular.module('myServices').factory('userService', function($http) {

  function getTopTracks(key, user, onSuccess, onError) {
    $http.get('http://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=' + user + '&api_key=' + key + '&format=json').then(function(response) {
      onSuccess(response);
    }, function(response) {
      onError(response);
    });
  };

  return {
    getTopTracks: getTopTracks
  };

});
