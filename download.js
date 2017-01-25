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
    
    $scope.downloadTypes = [{
        id: 'stable',
        name: 'Stable',
        version: $scope.currentOs.stableVersions.last(),
        versions: getAllVersions("stableVersions")
    }, {
        id: 'beta',
        name: 'Beta',
        version: $scope.currentOs.betaVersions.last(),
        versions: getAllVersions("betaVersions")
    }];
    
    $scope.loaded = function () {
        if ($stateParams.version) {
            var index = $stateParams.version.indexOf(':');
            index = index < 0 ? $stateParams.version.length : index;
            
            $scope.build = $stateParams.version.substring(0, index);
            $scope.buildVersion = $stateParams.version.substring(index);
            
            jump($scope.build, false);
        }
    };
}]);