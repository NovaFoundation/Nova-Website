angular.module("nova").controller("MasterController", ["$scope", "$rootScope", function ($scope, $rootScope) {
    $scope.jump = jump;
    
    var listeners = {};
    
    $rootScope.addEventListener = function (type, callback, fireOnAdd) {
        listeners[type] = listeners[type] || [];
        
        listeners[type].push(callback);
        
        if (fireOnAdd) {
            callback();
        }
        
        $rootScope.$on(type, function () {
            callback.apply($rootScope, [].slice.call(arguments));
        });
        
        return callback;
    };
    
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