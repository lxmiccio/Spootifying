angular.module('myServices').factory('userService', function($http, apiService) {

  function getTopTracks(username, onSuccess, onError) {
    apiService.getKey(function(response) {
      var key = response.data;
      $http.get('http://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=' + username + '&api_key=' + key + '&format=json').then(function(response) {
        onSuccess(response);
      }, function(response) {
        onError(response);
      });
    }, function(response) {
      console.log(response);
    });
  };

  return {
    getTopTracks: getTopTracks
  };

});
