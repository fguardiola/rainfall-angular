// Routing tutorial 			- https://scotch.io/tutorials/single-page-apps-with-angularjs-routing-and-templating
// Resource tutorial 			- http://fdietz.github.io/recipes-with-angular-js/consuming-external-services/consuming-restful-apis.html
// Ascii art generation 		- http://patorjk.com/software/taag/#p=display&v=1&f=Doom&t=lol


(function(window, angular, undefined) {'use strict';

	var restEndpointBaseUri = 'http://themalldataserver.azurewebsites.net';

/* Module
	___  ___          _       _      
	|  \/  |         | |     | |     
	| .  . | ___   __| |_   _| | ___ 
	| |\/| |/ _ \ / _` | | | | |/ _ \
	| |  | | (_) | (_| | |_| | |  __/
	\_|  |_/\___/ \__,_|\__,_|_|\___|
*/
	var rainfallApp = angular.module('rainfallApp', ['ngRoute', 'ngResource']);

/* Routes
	______            _            
	| ___ \          | |           
	| |_/ /___  _   _| |_ ___  ___ 
	|    // _ \| | | | __/ _ \/ __|
	| |\ \ (_) | |_| | ||  __/\__ \
	\_| \_\___/ \__,_|\__\___||___/
*/
    rainfallApp.config(function($routeProvider) {
        $routeProvider

            // =====  Home  =====
            .when('/home', {
                templateUrl : 'pages/home.html',
                controller  : 'mainController'
            })

            // =====  About  =====
            .when('/about', {
                templateUrl : 'pages/about.html',
                controller  : 'aboutController'
            })

            // =====  Contact  =====
            .when('/contact', {
                templateUrl : 'pages/contact.html',
                controller  : 'contactController'
            })


            // =====  Retailers  =====
            .when('/retailers', {
                templateUrl : 'pages/retailers.html',
                controller  : 'retailersController'
            })

            // =====  Retailer  =====
            .when('/retailer/:id', {
                templateUrl : 'pages/retailer.html',
                controller  : 'retailerController'
            })

            // =====  Category =====
            .when('/category/:id', {
                templateUrl : 'pages/category.html',
                controller  : 'categoryController'
            })

            // =====  Product  =====
            .when('/product/:id', {
                templateUrl : 'pages/product.html',
                controller  : 'productController'
            })


            // =====  Default  =====
            .otherwise({
            	redirectTo: '/home'
            });
    });

/* Resources
	______                                        
	| ___ \                                       
	| |_/ /___  ___  ___  _   _ _ __ ___ ___  ___ 
	|    // _ \/ __|/ _ \| | | | '__/ __/ _ \/ __|
	| |\ \  __/\__ \ (_) | |_| | | | (_|  __/\__ \
	\_| \_\___||___/\___/ \__,_|_|  \___\___||___/
*/
    rainfallApp.factory('Retailer', function($resource){
    	return $resource(restEndpointBaseUri + '/retailers/:id', {id: '@id'}, {
    		query: { method: "GET", isArray: false }
    	});
    });

    rainfallApp.factory('Category', function($resource){
    	return $resource(restEndpointBaseUri + '/categories/:id', {id: '@id'}, {
    		query: { method: "GET", isArray: false }
    	});
    });

    rainfallApp.factory('Product', function($resource){
    	return $resource(restEndpointBaseUri + '/products/:id', {id: '@id'}, {
    		query: { method: "GET", isArray: false }
    	});
    });

/* Controllers
	 _____             _             _ _               
	/  __ \           | |           | | |              
	| /  \/ ___  _ __ | |_ _ __ ___ | | | ___ _ __ ___ 
	| |    / _ \| '_ \| __| '__/ _ \| | |/ _ \ '__/ __|
	| \__/\ (_) | | | | |_| | | (_) | | |  __/ |  \__ \
	 \____/\___/|_| |_|\__|_|  \___/|_|_|\___|_|  |___/
*/    
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

	/* Retailer
		______     _        _ _           
		| ___ \   | |      (_) |          
		| |_/ /___| |_ __ _ _| | ___ _ __ 
		|    // _ \ __/ _` | | |/ _ \ '__|
		| |\ \  __/ || (_| | | |  __/ |   
		\_| \_\___|\__\__,_|_|_|\___|_|   
	*/
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

	/* Category
		 _____       _                              
		/  __ \     | |                             
		| /  \/ __ _| |_ ___  __ _  ___  _ __ _   _ 
		| |    / _` | __/ _ \/ _` |/ _ \| '__| | | |
		| \__/\ (_| | ||  __/ (_| | (_) | |  | |_| |
		 \____/\__,_|\__\___|\__, |\___/|_|   \__, |
		                      __/ |            __/ |
		                     |___/            |___/ 
	*/
    rainfallApp.controller('categoryController', function($scope, $routeParams, Category) {
    	var idParameter = $scope.categoryID || $routeParams.id;
    	if(idParameter){
    		Category.get({id: idParameter}, function(data){
    			$scope.category = data.categories[0];
    		});
    	}
    });

	/* Product
		______              _            _   
		| ___ \            | |          | |  
		| |_/ / __ ___   __| |_   _  ___| |_ 
		|  __/ '__/ _ \ / _` | | | |/ __| __|
		| |  | | | (_) | (_| | |_| | (__| |_ 
		\_|  |_|  \___/ \__,_|\__,_|\___|\__|
	*/
    rainfallApp.controller('productController', function($scope, $routeParams, Product) {
    	var idParameter = $scope.productID || $routeParams.id;
    	if(idParameter){
    		Product.get({id: idParameter}, function(data){
    			$scope.product = data.products[0];
    		});
    	}
    });

})(window, window.angular);