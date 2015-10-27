// Routing tutorial 			- https://scotch.io/tutorials/single-page-apps-with-angularjs-routing-and-templating
// Resource tutorial 			- http://fdietz.github.io/recipes-with-angular-js/consuming-external-services/consuming-restful-apis.html
// Ascii art generation 		- http://patorjk.com/software/taag/#p=display&v=1&f=Doom&t=lol


(function(window, angular, undefined) {'use strict';

	// var restEndpointBaseUri = 'http://themalldataserver.azurewebsites.net';
    //get data runing the rainfall data server 
    var restEndpointBaseUri = 'http://localhost:4000';


/* Module
	___  ___          _       _      
	|  \/  |         | |     | |     
	| .  . | ___   __| |_   _| | ___ 
	| |\/| |/ _ \ / _` | | | | |/ _ \
	| |  | | (_) | (_| | |_| | |  __/
	\_|  |_/\___/ \__,_|\__,_|_|\___|
*/
	var rainfallApp = angular.module('rainfallApp', ['ngRoute', 'ngResource','CustomFilters']);

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
                templateUrl : 'app/pages/home.html',
                controller  : 'mainController'
            })

            // =====  About  =====
            .when('/about', {
                templateUrl : 'app/pages/about.html',
                controller  : 'aboutController'
            })

            // =====  Contact  =====
            .when('/contact', {
                templateUrl : 'app/pages/contact.html',
                controller  : 'contactController'
            })


            // =====  Retailers  =====
            .when('/retailers', {
                templateUrl : 'app/pages/retailers.html',
                controller  : 'retailersController'
            })

            // =====  Retailer  =====
            .when('/retailer/:id', {
                templateUrl : 'app/pages/retailer.html',
                controller  : 'retailerController'
            })

            // =====  Category =====
            .when('/category/:id', {
                templateUrl : 'app/pages/category.html',
                controller  : 'categoryController'
            })

            // =====  Product  =====
            // .when('/product/:id', {
            //     templateUrl : 'app/pages/product.html',
            //     controller  : 'productController'
            // })
             .when('/product/:id', {
                templateUrl : 'app/pages/singleProduct.html',
                controller  : 'singleProductController'
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
    		query: { method: "GET", isArray: false },
            update: {method:'PUT',isArray: false }

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
        $scope.message = 'Welcome user';
    });

    rainfallApp.controller('aboutController', function($scope) {

        $scope.message = 'Created 14-10-2015';
    });

    rainfallApp.controller('contactController', function($scope) {

        $scope.message = 'Contact us at: thehig@gmail.com';
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
    			// console.log("Product getting back:"+JSON.stringify(data));
                $scope.productToModify=data;
                $scope.product = data.products[0];
                $scope.disableInput=true;
                $scope.showForm=false;
                $scope.disableEdit=false;
                // console.log(JSON.stringify($scope.product));
    		});
    	}

        $scope.saveProduct = function(evt){
            // console.log(evt);
            // console.log("Saving...");
            // console.log("Product"+JSON.stringify($scope.product));
            // evt.target.disabled = true;
            $scope.productToModify.products=[];
            $scope.productToModify.products.push($scope.product);
            console.log("Product to save:"+JSON.stringify($scope.productToModify));
            Product.update({id: idParameter},JSON.stringify($scope.productToModify), function success(succ){
                 console.log("Success");
                 console.log("$scope.showForm"+$scope.showForm);
                  $scope.disableEdit=false;
                  $scope.showForm=false;
                 // evt.target.disabled = false;
            }, function error(err){
                 console.log(err);
                 // evt.target.disabled = false;
            });
        };

        $scope.editProduct=function(evt){
           
            $scope.showForm=true;
            $scope.disableEdit=true;
            $scope.enableDisableEdit
        };
        $scope.enableDisableEdit=function(){
           //  console.log("Are enable???s")
           // console.log("$scope.disableInput:"+$scope.disableInput)
            $scope.disableEdit=!$scope.disableEdit;
            return $scope.disableEdit
        };
        // $scope.showForm=function(){
        //    //  console.log("Are enable???s")
        //    // console.log("$scope.disableInput:"+$scope.disableInput)
        //     return $scope.showForm;
        // };

    })
    rainfallApp.controller('singleProductController', function($scope, $routeParams, Product) {
            var idParameter = $scope.productID || $routeParams.id;
            
           
            if(idParameter){
                
                Product.get({id: idParameter}, function(data){
                    $scope.productToModify=data;
                    $scope.product=data.products[0];
                    // console.log("Product getting back:"+JSON.stringify(data));
                    console.log("Product :"+JSON.stringify($scope.product));
                    
                    // console.log(JSON.stringify($scope.product));
                    // console.log("data: "+JSON.stringify(data));
                });
            

               
            }

            

        });
    
    //DIRECTIVES

    rainfallApp.directive('formField', function($timeout,Product) {
        return {
            restrict: 'EA', //can be used as an element or an attribute
            templateUrl: 'app/pages/form-field.html', //template: html the formFiel is gonna be replaced with
            replace: true, //if false the html template will be render within the element
            scope: { //this is where we choose what attributes that are place on the element are gonna be available inside of the actual directives
                record: '=', //is contact which is references to an object in the controller $scope.contact. '='sign means two way binding-> any change we make to the record object within the directive is gonna be make to the contact object
                rawrecord:'=',
                field: '@', //we only need to read those values not reflect changes ->'@'           
                live: '@',
                required: '@'
            },
            require:'^form',
            link: function($scope, element, attr,form) { //is run during the creation of this directive and it allows us to modify whats going on when the directive is created and replaces the content
                // $scope.types = FieldTypes;

                console.log("Product from directive: "+ JSON.stringify($scope.record));
                console.log("productToModify: "+ JSON.stringify($scope.rawrecord));
                
                $scope.$on('record:invalid', function() {
                    console.log("FIELD InVALIDDDDDDD")
                    $scope[$scope.field].$setDirty(); //refers to the ng-form attribute or fake form element created inside the directive
                })


                $scope.remove = function(field) {
                    console.log("REMOVE");
                    delete $scope.record[field];
                    $scope.record.$update();
                    //$scope.blurUpdate();
                };

                $scope.update = function() {
                    // console.log("Updating.....");
                    // console.log("Record to update:"+JSON.stringify($scope.record));
                    console.log("rawRecord to update:"+JSON.stringify($scope.rawrecord));
                    // var product=new Product();
                    // console.log("Product entity:"+JSON.stringify(product));
                    
                    if ($scope.live !== 'false') {
                        // $scope.rawrecord.products[0]=$scope.record;
                        // $scope.rawrecord.$update(function(updatedRecord) {
                        //     console.log("EUREKAAA");
                        //     $scope.record = updatedRecord.products[0];
                        // });
                        
                         Product.update({
                            id: $scope.rawrecord.products[0].id
                        }, JSON.stringify($scope.rawrecord), function success(updatedRecord) {
                            console.log("Success");
                            console.log("Product updated:"+JSON.stringify($scope.rawrecord));
                           //$scope.record = updatedRecord.products[0];
                        }, function error(err) {
                            console.log(err);
                            // evt.target.disabled = false;
                        });



                        // $scope.rawrecord.products = [];
                        // $scope.rawrecord.products.push($scope.record);
                        // console.log("Product to save:" + JSON.stringify($scope.rawrecord));
                        // Product.update({
                        //     id: idParameter
                        // }, JSON.stringify($scope.productToModify), function success(succ) {
                        //     console.log("Success");
                        //     console.log("$scope.showForm" + $scope.showForm);
                        //     $scope.disableEdit = false;
                        //     $scope.showForm = false;
                        //     // evt.target.disabled = false;
                        // }, function error(err) {
                        //     console.log(err);
                        //     // evt.target.disabled = false;
                        // });
                    }
                };

                var saveTimeout;
                $scope.blurUpdate = function() {
                    $timeout.cancel(saveTimeout);
                    saveTimeout = setTimeout($scope.update, 1000); // execute that function in one second. If the user modifies the field the timeout is reseted 
                };

            }

        }
    });

})(window, window.angular);