angular.module("nova").controller("DownloadController", ["$scope", "$stateParams", function ($scope, $stateParams) {
    function getAllVersions(type) {
        var versions = [];
        
        $scope.osArray.forEach(function (os) {
            os[type].forEach(function (version) {
                versions.pushUnique(version);
            });
        });
        
        return versions.sort(function (a, b) {
            return b - a;
        });
    }
    
    $scope.stable = {
        version: $scope.currentOs.stableVersions.last(),
        versions: getAllVersions("stableVersions")
    };
    
    $scope.beta = {
        version: $scope.currentOs.betaVersions.last(),
        versions: getAllVersions("betaVersions")
    };
    
    $scope.showAll = function (type) {
        $scope[type].showAll = true;
    };
    
    if ($stateParams.version) {
        var index = $stateParams.version.indexOf(':');
        index = index < 0 ? $stateParams.version.length : index;
        
        $scope.build = $stateParams.version.substring(0, index);
        $scope.buildVersion = $stateParams.version.substring(index);
        
        jump($scope.build, false);
    }
}]);