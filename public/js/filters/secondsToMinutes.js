angular.module('myFilters').filter('secondsToMinutes', function() {
  return function (seconds) {
    return parseInt(seconds / 60) + ':' + seconds % 60;
  };
});
