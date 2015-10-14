// create the module and name it rainfallApp
var rainfallApp = angular.module('rainfallApp', []);

// create the controller and inject Angular's $scope
rainfallApp.controller('mainController', function($scope) {

    // create a message to display in our view
    $scope.message = 'Everyone come and see how good I look!';
});