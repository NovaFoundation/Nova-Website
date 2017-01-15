var app = angular.module("nova", ['ngSlide']);var app = angular.module("nova", ['ngSlide', 'ui.router']).filter('capitalize', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
});