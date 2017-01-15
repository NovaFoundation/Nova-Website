angular.module("nova").controller("DownloadController", ["$scope", function ($scope) {
    $scope.os = jscd.os;
    $scope.osVersion = jscd.osVersion;
    $scope.lowerOs = $scope.os.toLowerCase();
    
    var validOses = ["windows", "mac", "linux"];
    
    // clean here
    
    $scope.stableOses = [$scope.lowerOs];
    $scope.betaOses = [$scope.lowerOs];
    
}]);