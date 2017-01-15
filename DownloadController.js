angular.module("nova").controller("DownloadController", ["$scope", function ($scope) {
    $scope.os = jscd.os;
    $scope.osVersion = jscd.osVersion;
    $scope.lowerOs = $scope.os.toLowerCase();
    
    var validOses = ["windows", "mac", "linux"];
    
    // clean here
    
    $scope.stableOses = [$scope.lowerOs];
    $scope.betaOses = [$scope.lowerOs];
    
    if (queryParams.version) {
        var index = queryParams.version.indexOf(':');
        index = index < 0 ? queryParams.version.length : index;
        
        $scope.build = queryParams.version.substring(0, index);
        $scope.buildVersion = queryParams.version.substring(index);
        
        jump($scope.build);
    }
    
    $scope.download = function () {
        alert("Havent added downloads yet.");
    };
}]);