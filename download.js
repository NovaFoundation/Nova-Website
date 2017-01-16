angular.module("nova").controller("DownloadController", ["$scope", "$stateParams", function ($scope, $stateParams) {
    var validOses = ["windows", "mac", "linux"];
    
    // clean here
    
    $scope.stableOses = [$scope.lowerOs];
    $scope.betaOses = [$scope.lowerOs];
    
    $scope.showAll = function (type) {
        validOses.forEach(function (os) {
            if ($scope[type + "Oses"].indexOf(os) < 0) {
                $scope[type + "Oses"].push(os);
            }
        });
    };
    
    if ($stateParams.version) {
        var index = $stateParams.version.indexOf(':');
        index = index < 0 ? $stateParams.version.length : index;
        
        $scope.build = $stateParams.version.substring(0, index);
        $scope.buildVersion = $stateParams.version.substring(index);
        
        jump($scope.build, false);
    }
    
    $scope.download = function () {
        alert("Havent added downloads yet.");
    };
}]);