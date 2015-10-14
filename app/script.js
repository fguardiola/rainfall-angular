// https://scotch.io/tutorials/single-page-apps-with-angularjs-routing-and-templating


(function(window, angular, undefined) {'use strict';

	// create the module and name it rainfallApp
	var rainfallApp = angular.module('rainfallApp', ['ngRoute']);

	// configure our routes
    rainfallApp.config(function($routeProvider) {
        $routeProvider

            // route for the home page
            .when('/home', {
                templateUrl : 'pages/home.html',
                controller  : 'mainController'
            })

            // route for the about page
            .when('/about', {
                templateUrl : 'pages/about.html',
                controller  : 'aboutController'
            })

            // route for the contact page
            .when('/contact', {
                templateUrl : 'pages/contact.html',
                controller  : 'contactController'
            })

            .otherwise({
            	redirectTo: '/home'
            });
    });

    // create the controller and inject Angular's $scope
    rainfallApp.controller('mainController', function($scope) {
        // create a message to display in our view
        $scope.message = 'Everyone come and see how good I look!';
    });

    rainfallApp.controller('aboutController', function($scope) {
        $scope.message = 'Look! I am an about page.';
    });

    rainfallApp.controller('contactController', function($scope) {
        $scope.message = 'Contact us! JK. This is just a demo.';
    });


})(window, window.angular);