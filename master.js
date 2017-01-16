angular.module("nova").controller("MasterController", ["$scope", "$rootScope", function ($scope, $rootScope) {
    $scope.jump = jump;
    
    $rootScope.$safeApply = function (fn) {
         var phase = $scope.$root.$$phase;
         
         if (phase == '$apply' || phase == '$digest') {
             if (fn && typeof fn === 'function') {
                 fn();
             }
         } else {
             $scope.$apply(fn);
         }
     };
}]);