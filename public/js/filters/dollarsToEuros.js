angular.module('myFilters').filter('dollarsToEuros', function() {
  return function (dollars) {
    return dollars * 0.900142673;
  };
});
