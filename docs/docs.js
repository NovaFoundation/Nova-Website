window.docsPages = [{
    header: "Class Types",
    url: "class-types",
    children: []
}, {
    header: "HELLO WORLD",
    url: "hello-world",
    children: []
}];

angular.module("nova").controller("DocsController", ["$scope", "$rootScope", function ($scope, $rootScope) {
    $scope.sharePage = function (page) {
        page = page || $scope.page;
        
        alert("sharing " + page.header);
    };
    
    function stateUpdated() {
        var url = $rootScope.state.url.substring(1);
        
        $scope.page = window.docsPages.find(function (d) {
            return d.url == url;
        });
    }
    
    stateUpdated();
    
    $rootScope.$on("stateUpdated", stateUpdated);
}]);