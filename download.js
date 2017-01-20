angular.module("nova").controller("DownloadController", ["$scope", "$stateParams", function ($scope, $stateParams) {
    $scope.stableVersion = "0.3.0";
    $scope.betaVersion = "0.3.0";
    
    // clean here
    
    $scope.stableOses = [$scope.currentOs];
    $scope.betaOses = [$scope.currentOs];
    
    $scope.showAll = function (type) {
        Object.keys($scope.oses).forEach(function (name) {
            var os = $scope.oses[name];
            
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
}]);