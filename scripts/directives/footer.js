angular.module("nova").directive("footer", [function () {
    return {
        restrict: 'E',
        scope: false,
        // replace: true,
        link: function (scope, elements, attributes) {
            
        },
        templateUrl: "/footer.html"
    }
}]);