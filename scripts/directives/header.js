angular.module("nova").directive("header", [function () {
    return {
        restrict: 'E',
        scope: false,
        // replace: true,
        link: function (scope, elements, attributes) {
            
        },
        templateUrl: "/header.html"
    }
}]);