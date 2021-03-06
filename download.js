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
    
    $scope.versionTimeText = "latest";
    
    if ($scope.currentOs) {
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
    } else {
        $scope.downloadTypes = [];
    }
    
    $scope.toggleShowAll = function (type, showAll) {
        showAll = typeof showAll !== 'undefined' ? showAll : !type.showAll;
        
        type.showAll = showAll;
        
        if (showAll) {
            type.oses = $scope.osArray;
        } else {
            type.oses = [$scope.currentOs];
        }
    };
    
    $scope.downloadTypes.forEach(function (type) {
        $scope.toggleShowAll(type, false);
    });
    
    $scope.loaded = function () {
        if ($stateParams.version) {
            var index = $stateParams.version.indexOf(':');
            index = index < 0 ? $stateParams.version.length : index;
            
            $scope.build = $stateParams.version.substring(0, index);
            $scope.buildVersion = $stateParams.version.substring(index + 1);
            
            if ($scope.buildVersion) {
                $scope.downloadTypes.forEach(function (type) {
                    if (type.version && type.version != $scope.buildVersion) {
                        type.version = $scope.buildVersion;
                        
                        $scope.versionTimeText = "v" + $scope.buildVersion;
                    }
                    
                    $scope.toggleShowAll(type, type.showAll);
                });
            }
            
            if (jump($scope.build, false)) {
                $scope.loaded = function () {};
            }
        }
    };
}]);