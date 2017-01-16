angular.module("nova").controller("ConfigureEnvironmentController", ["$scope", "$stateParams", function ($scope, $stateParams) {
    jump($scope.lowerOs, false);
}]);