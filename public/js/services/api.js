angular.module('myServices').factory('apiService', function($http) {

  function getKey(onSuccess, onError) {
    $http.get('api/key').then(function(response) {
      onSuccess(response);
    }, function(response) {
      onError(response);
    });
  };

  return {
    getKey: getKey
  };

});
