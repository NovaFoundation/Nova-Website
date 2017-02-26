angular.module("nova").directive("issue", ['$templateCache', '$compile', function ($templateCache, $compile) {
    return {
        restrict: 'E',
        scope: {
            values: "="
        },
        replace: true,
        link: function (scope, elements, attributes) {
            
        },
        templateUrl: "/content/templates/issue.html"
    }
}]);