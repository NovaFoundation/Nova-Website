angular.module("nova").controller("MasterController", ["$scope", "$rootScope", "$os", function ($scope, $rootScope, $os) {
    $rootScope.os = $os.os;
    $rootScope.osVersion = $os.osVersion;
    $rootScope.lowerOs = $os.lowerOs;
    $rootScope.currentOs = $os.currentOs;
    $rootScope.oses = $os.oses;
    $rootScope.osArray = $os.osArray;
    $rootScope.osHeader = $os.osHeader;
    
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