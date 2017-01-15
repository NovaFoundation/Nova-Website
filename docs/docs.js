angular.module("nova").controller("DocsController", ["$scope", function ($scope) {
    $scope.pages = [{
        header: "nothign",
        subheader: "if defsird",
        template: "",
        children: []
    }];
    
    $scope.page = $scope.pages[0];
    
    $scope.sharePage = function (page) {
        page = page || $scope.page;
        
        alert("sharing " + page.header);
    };
}]);