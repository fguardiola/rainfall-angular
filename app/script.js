// https://scotch.io/tutorials/single-page-apps-with-angularjs-routing-and-templating


(function(window, angular, undefined) {'use strict';

	var restEndpointBaseUri = 'http://themalldataserver.azurewebsites.net';

	// create the module and name it rainfallApp
	var rainfallApp = angular.module('rainfallApp', ['ngRoute', 'ngResource']);

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


            // route for the retailers page
            .when('/retailers', {
                templateUrl : 'pages/retailers.html',
                controller  : 'retailersController'
            })


            // route for the retailer page
            .when('/retailer/:id', {
                templateUrl : 'pages/retailer.html',
                controller  : 'retailerController'
            })

            .otherwise({
            	redirectTo: '/home'
            });
    });

    rainfallApp.factory('Retailer', function($resource){
    	return $resource(restEndpointBaseUri + '/retailers/:id', {id: '@id'}, {
    		query: { method: "GET", isArray: false }
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


    rainfallApp.controller('retailersController', function($scope, Retailer) {
    	Retailer.query(function(data){
    		$scope.retailers = data.retailers;
    	});
    });

    rainfallApp.controller('retailerController', function($scope, $routeParams, Retailer) {
    	if($routeParams.id){
    		Retailer.get({id: $routeParams.id}, function(data){
    			$scope.retailer = data.retailers[0];
    		});
    	} else {
        	$location.path( "/" );
    	}
    });


})(window, window.angular);