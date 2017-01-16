var app = angular.module("nova", ['ngSlide', 'ui.router', 'uiRouterStyles', 'hljs']).filter('capitalize', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
});