angular.module('myServices').factory('apiService', function($http) {

  function getLastFmKey(onSuccess, onError) {
    $http.get('api/keys/lastfm').then(function(response) {
      onSuccess(response);
    }, function(response) {
      onError(response);
    });
  };

  return {
    getLastFmKey: getLastFmKey
  };

});
