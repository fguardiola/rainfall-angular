// Routing tutorial             - https://scotch.io/tutorials/single-page-apps-with-angularjs-routing-and-templating
// Resource tutorial            - http://fdietz.github.io/recipes-with-angular-js/consuming-external-services/consuming-restful-apis.html
// Ascii art generation         - http://patorjk.com/software/taag/#p=display&v=1&f=Doom&t=lol


(function(window, angular, undefined) {
    'use strict';

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
    var rainfallApp = angular.module('rainfallApp', ['ngRoute', 'ngResource', 'CustomFilters', 'ngStorage','ui.bootstrap']);

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
            templateUrl: 'app/pages/home.html',
            controller: 'mainController'
        })

        // =====  About  =====
        .when('/about', {
            templateUrl: 'app/pages/about.html',
            controller: 'aboutController'
        })

        // =====  Contact  =====
        .when('/contact', {
            templateUrl: 'app/pages/contact.html',
            controller: 'contactController'
        })


        // =====  Retailers  =====
        .when('/retailers', {
            templateUrl: 'app/pages/retailers.html',
            controller: 'retailersController'
        })

        // =====  Retailer  =====
        .when('/retailer/:id', {
            templateUrl: 'app/pages/retailer.html',
            controller: 'retailerController'
        })

        // =====  Category =====
        .when('/category/:id', {
            templateUrl: 'app/pages/category.html',
            controller: 'categoryController'
        })

        // =====  Product  =====
        // .when('/product/:id', {
        //     templateUrl : 'app/pages/product.html',
        //     controller  : 'productController'
        // })
        .when('/product/:id', {
                templateUrl: 'app/pages/singleProduct.html',
                controller: 'singleProductController'
            })
            .when('/newProduct', {
                templateUrl: 'app/pages/newProduct.html',
                controller: 'newProductController'
            })
            .when('/newRetailer', {
                templateUrl: 'app/pages/newRetailer.html',
                controller: 'newRetailerController'
            })
            .when('/newCategory', {
                templateUrl: 'app/pages/newCategory.html',
                controller: 'newCategoryController'
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
    rainfallApp.factory('Retailer', function($resource) {
        return $resource(restEndpointBaseUri + '/retailers/:id', {
            id: '@id'
        }, {
            query: {
                method: "GET",
                isArray: false
            },
            update: {
                method: 'PUT',
                isArray: false
            }
        });
    });

    rainfallApp.factory('Category', function($resource) {
        return $resource(restEndpointBaseUri + '/categories/:id', {
            id: '@id'
        }, {
            query: {
                method: "GET",
                isArray: false
            },
            update: {
                method: 'PUT',
                isArray: false
            }
        });
    });

    rainfallApp.factory('Product', function($resource) {
        return $resource(restEndpointBaseUri + '/products/:id', {
            id: '@id'
        }, {
            query: {
                method: "GET",
                isArray: false
            },
            update: {
                method: 'PUT',
                isArray: false
            },
            delete: {
                method: 'DELETE'
            }


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
    rainfallApp.controller('retailersController', function($scope, Retailer, $location, Data) {

        // Data.setFirstName("Fernando from retailer");
        // console.log("DATA read from retailers controller:"+Data.getFirstName())
        // $scope.firstName = '';
        // $scope.$watch('firstName', function (newValue, oldValue) {
        //     if (newValue !== oldValue) Data.setFirstName(newValue);
        // });
        // $scope.dataShare = {};

        // $scope.$watch('dataShare', function (newValue, oldValue) {
        //     if (newValue !== oldValue) Data.setFirstName(newValue);
        // });

        Retailer.query(function(data) {
            $scope.retailers = data.retailers;

        });


        $scope.newRetailer = function() {
            //share info neccessary to create a new product
            $location.url('/newRetailer');
            // alert("No implemented yet")
        };


    });

    rainfallApp.controller('newRetailerController', function($scope, Retailer, $location) {



        $scope.retailerToModify = new Retailer({
            "retailers": []

        });
        $scope.retailer = {
            "name": '',
            "image": ''

        };

        // Save new contact
        $scope.save = function() {
            //alert("Not implemented yet")
            if ($scope.newRetailer.$invalid) {
                $scope.$broadcast('record:invalid'); //??????
            } else {
                $scope.retailerToModify.retailers.push($scope.retailer);
                $scope.retailerToModify.$save(function(res, err) {
                   var url = "/retailers";
                    $location.url(url);
                });
                
            }
        };



    });



    rainfallApp.controller('retailerController', function($scope, $routeParams, Retailer, Data, $localStorage) {
        //share data between controllers
        // $scope.dataShare = {};

        // $scope.$watch('dataShare', function (newValue, oldValue) {
        //     if (newValue !== oldValue) Data.dataShare(newValue);
        // });


        if ($routeParams.id) {
            Retailer.get({
                id: $routeParams.id
            }, function(data) {
                $scope.retailer = data.retailers[0];
                console.log("Retailer:" + JSON.stringify($scope.retailer))
                    // Data.setProperty("retailerId",$scope.retailer.id)
                    // if()
                delete $localStorage.dataShare;
                $localStorage.dataShare = {
                    retailerId: '',
                    categoryId: ''
                   
                };
                $localStorage.dataShare.retailerId = $scope.retailer.id;
                $scope.retailerToModify = data;
                console.log("Storage:" + JSON.stringify($localStorage.dataShare));
            });
        } else {
            $location.path("/");
        }


        $scope.newDefaultCategory = function() {
            //share info neccessary to create a new product
            //$location.url('/newCategory');
            alert("No implemented yet")
        };

        $scope.delete = function() {
            //share info neccessary to create a new product
            // $location.url('/newRetailer');
            alert("No implemented yet")
        };
      
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
    rainfallApp.controller('categoryController', function($scope, $routeParams, Category,Product, $location, Data, $localStorage,$q) {

        //  $scope.$watch(function() {
        //     return Data.getDataShare();
        // }, function(newValue, oldValue) {
        //     if (newValue !== oldValue) $scope.dataShare = newValue;
        // });

        // console.log("DataShare: "+JSON.stringify(Data.getDataShare()))

        //using promises 
        var deferred=$q.defer();
        var promises=[];

        var idParameter = $scope.categoryID || $routeParams.id;
        if (idParameter) {
            Category.get({
                id: idParameter
            }, function(data) {
                // console.log("Data:"+JSON.stringify(data));
                $scope.category = data.categories[0];
                $scope.categoryToModify = data;
                console.log("Category: " + JSON.stringify($scope.category))
                $localStorage.dataShare.categoryId = $scope.category.id;
               // $localStorage.dataShare.parentCategoryId =  $scope.category.id;
                // if($scope.category.links.parent){
                //     $localStorage.dataShare.parentCategoryId= $scope.category.links.parent;
                // }

                console.log("Storage:" + JSON.stringify($localStorage.dataShare))

                    // Data.setProperty('categoryId',$scope.category.id)

            });
        }

        $scope.newCategory = function() {
            //share info neccessary to create a new product
            $location.url('/newCategory');
            //alert("No implemented yet")
        };

        $scope.newProduct = function() {
            //share info neccessary to create a new product
            $location.url('/newProduct');
        };

        $scope.delete = function() {
           // var promise1=$scope.getDataPromise();
           // var promise2=$scope.getDataPromise();
           // promises.push(promise1,promise2)

           //  $q.all(promises).then(function(data) {
           //      console.log("WOW All Promises COMPLETED"+JSON.stringify(data));
           //      console.log("Promise1 data: "+JSON.stringify(data[0]));
           //      console.log("Promise2 data: "+JSON.stringify(data[1]));
           //  });

           //  var pomiseChildren=$scope.getChildrensIdAsPromise();
           
           // pomiseChildren.then(function(arrayChildrenIds){
             
           //   console.log("WOW DATA Array of children category ids REceived from server as a promise:"+arrayChildrenIds);

           console.log("cat to delete: "+$scope.category.id);
           alert("Sorry: not implemented yet");

            // console.log("Deleting 1....");
            // $scope.deleteCategoryAndProductsRecursevily($scope.category.id).then(function(){
                
            //     console.log("Fucking class!!!");
            //     if($scope.category.links.parent){
            //          $location.url('/category/'+$scope.category.links.parent);
            //     }
            //     else if($scope.category.links.retailer){
            //          $location.url('/retailer/'+$scope.category.links.retailer);
            //     }
            //     else  $location.url('/home');
            // })

           };
    

        $scope.getCategoryAsPromise=function(id){
             Category.get({
                id: id
            },function(data){
               deferred.resolve(data); 
            },function(error){
                deferred.reject(error);
            });
           return deferred.promise;
        };

        $scope.deleteCategoryById=function(Id){
            Category.delete({
                id: Id
            },function(data){
               deferred.resolve(); 
            },function(error){
                deferred.reject(error);
            });
           return deferred.promise;
        };

        $scope.deleteProductById=function(Id){
            Product.delete({
                id: id
            },function(data){
               deferred.resolve(); 
            },function(error){
                deferred.reject(error);
            });
           return deferred.promise;
        };
  
        $scope.saveParentId=function(){
          
           $localStorage.dataShare.parentCategoryId=$scope.category.id;
            console.log("DataShare: "+JSON.stringify($localStorage.dataShare))
            // alert("Category id:"+  $localStorage.dataShare.categoryId+" parentCategoryId"+  $localStorage.dataShare.parentCategoryId);
        };


        // $scope.deleteCategoryAndProductsRecursevily=function (categoryId) {
                    
        // console.log("Deleting recursevily");
        //    return $scope.getCategoryAsPromise(categoryId).then(function(category){
        //         var children=category.categories[0].links.children || [];
        //         var products=category.categories[0].links.products || [];
        //          console.log("children: "+children+" products: "+products);
        //         //alert("children: "+children+"products: "+products);

        //         var deleteOperations=[];
        //         if(children.length>0){
        //             console.log("Children length:"+children.length);
                    
        //             alert("Children to delete"+children)
        //             children.forEach(function(childCategory){
        //                 console.log("trying to delete children: "+childCategory);
        //                 deleteOperations.push($scope.deleteCategoryAndProductsRecursevily(childCategory))
        //             })
                    
        //             $q.all(deleteOperations).then(function(data) {
        //                 console.log("trying to do shitttt");
        //                 var deleteProducts = [];
        //                 if(products.length>0){
        //                     products.forEach(function (product) {
        //                         deleteProducts.push($scope.deleteProductById(product));
        //                     })
        //                     $q.all(deleteProducts).then(function () {
        //                         //Delete category
        //                         $scope.deleteCategoryById(categoryId).then(function(){
        //                             deferred.resolve(); 
        //                             return;
        //                             console.log("Category children and products deleted")
        //                         })
        //                        });
                                
        //                 }
        //                 deferred.resolve(); 
        //             });

        //               deferred.resolve();
        //         }

        //           deferred.resolve();
        //     });
        // };

         $scope.deleteCategoryAndProductsRecursevily=function (categoryId) {
           return $scope.getCategoryAsPromise(categoryId).then(function(category){
                var children=category.categories[0].links.children || [];
                var products=category.categories[0].links.products || [];
                
                $scope.deleteCategoryById(children[0]).then(function(){
                    $scope.deleteCategoryById(categoryId).then(function(){
                        deferred.resolve();
                        console.log("Deletion completed");
                    });
                });


            });

         };
    });
   
    rainfallApp.controller('newCategoryController', function($scope, Category, $location,$localStorage) {

     

        $scope.categoryToModify = new Category({
            "categories": []

        });
        $scope.category = {
            "parent":'',
            "name": '',
            "image": '',
            "retailer": ''

        };
        if($localStorage.dataShare && $localStorage.dataShare.parentCategoryId){
            $scope.category.parent=$localStorage.dataShare.parentCategoryId;
        }
         if($localStorage.dataShare && $localStorage.dataShare.retailerId){
            $scope.category.retailer=$localStorage.dataShare.retailerId;
        }

        // Save new category
        $scope.save = function() {
           // alert("Not implemented yet")
                if ($scope.newCategory.$invalid) {
                    $scope.$broadcast('record:invalid'); //??????
                } else { 
                    
                    if($scope.category.retailer && $scope.category.parent){
                        console.log("categotry to save:"+JSON.stringify($scope.category));
                        $scope.categoryToModify.categories.push($scope.category);
                        $scope.categoryToModify.$save(function(res, err) {
                            console.log("Creating category Response:" + JSON.stringify(res))
                            var url = "/category/"+ $scope.category.parent ;
                            $location.url(url);
                        });
                    }
                    else{
                        //something went wrong and we dont have the retailer id or the parent id

                    }
                    // var url = "/category"+ "something";
                    // $location.url(url);
                }
        };
        



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
        if (idParameter) {
            Product.get({
                id: idParameter
            }, function(data) {
                // console.log("Product getting back:"+JSON.stringify(data));
                $scope.productToModify = data;
                $scope.product = data.products[0];
                $scope.disableInput = true;
                $scope.showForm = false;
                $scope.disableEdit = false;
                // console.log(JSON.stringify($scope.product));
            });
        }

        $scope.saveProduct = function(evt) {
            // console.log(evt);
            // console.log("Saving...");
            // console.log("Product"+JSON.stringify($scope.product));
            // evt.target.disabled = true;
            $scope.productToModify.products = [];
            $scope.productToModify.products.push($scope.product);
            console.log("Product to save:" + JSON.stringify($scope.productToModify));
            Product.update({
                id: idParameter
            }, JSON.stringify($scope.productToModify), function success(succ) {
                console.log("Success");
                console.log("$scope.showForm" + $scope.showForm);
                $scope.disableEdit = false;
                $scope.showForm = false;
                // evt.target.disabled = false;
            }, function error(err) {
                console.log(err);
                // evt.target.disabled = false;
            });
        };

        $scope.editProduct = function(evt) {

            $scope.showForm = true;
            $scope.disableEdit = true;
            $scope.enableDisableEdit
        };
        $scope.enableDisableEdit = function() {
            //  console.log("Are enable???s")
            // console.log("$scope.disableInput:"+$scope.disableInput)
            $scope.disableEdit = !$scope.disableEdit;
            return $scope.disableEdit
        };
        // $scope.showForm=function(){
        //    //  console.log("Are enable???s")
        //    // console.log("$scope.disableInput:"+$scope.disableInput)
        //     return $scope.showForm;
        // };

    });
    rainfallApp.controller('singleProductController', function($scope, $routeParams, Product, $location, Data, $localStorage) {

        //  $scope.$watch(function() {
        //     return Data.getDataShare();
        // }, function(newValue, oldValue) {
        //     if (newValue !== oldValue) $scope.dataShare = newValue;
        // });

        // console.log("DATA read from product controller:"+Data.getFirstName())

        var idParameter = $scope.productID || $routeParams.id;


        if (idParameter) {

            $scope.rawData = Product.get({
                id: idParameter
            }, function(data) {
                $scope.productToModify = data;
                $scope.product = data.products[0];
                // console.log("Product getting back:"+JSON.stringify(data));
                console.log("Product :" + JSON.stringify($scope.product));

            });



        }

        $scope.delete = function() {
            Product.delete({
                id: $scope.product.id
            }, function(res, error) {
                if (res) {
                    console.log("Deletion completed");
                    // var url = "/category/" + $scope.product.links.categories[0];
                    var url = "/category/" + $localStorage.dataShare.categoryId;
                    // console.log("URL" + url)
                     $location.url(url);
                } else if (error) {
                    console.log("Error trying to delete");
                }
            });

            
        };

    });
    rainfallApp.controller('newProductController', function($scope, $routeParams, Product,Retailer,Category,$location, Data, $localStorage) {


        // $scope.$watch(function() {
        //     return Data.getDataShare();
        // }, function(newValue, oldValue) {
        //     if (newValue !== oldValue) $scope.dataShare = newValue;
        // });
        
        $scope.retailersInfo=[];
        $scope.retailerName="Unselected";
        $scope.categoryName="Unselected";
        $scope.retailerId="";
        $scope.categoryId="";
        $scope.disable=true;
        
        Retailer.query(function(data) {
            $scope.retailers = data.retailers;
            
            $scope.retailers.forEach(function(retailer){
                 if(retailer.links && retailer.links.categories){
                    $scope.retailersInfo.push({retailerName:retailer.name,id:retailer.id,categories:retailer.links.categories});
                 }
                 else  $scope.retailersInfo.push({retailerName:retailer.name,id:retailer.id});
                 //$scope.retailersInfo.push(retailer.name);
                
                 // $scope.retailersInfo.push({retailerName:retailer.name});
            })
            console.log( $scope.retailersInfo)

         });

        

        $scope.productToModify = new Product({
            "products": []

        });
        $scope.product = {
            "retailer":"",
            "categories":"",
            "name":"",
            "mainimage":"",
            "augment":"",
            "description":"",
            "price":""
        };

        // Save new contact
        $scope.save = function() {
            // alert("Not implemented yet")
            $scope.productToSave={};
            if ($scope.newProduct.$invalid) {
                $scope.$broadcast('record:invalid'); //??????
            } else {

                
                for (var k in $scope.product) {
                     console.log("Key is " + k + ", value is" + $scope.product[k]);
                    if ($scope.product[k]) {
                        //check if category is selected. if not not include the key in product to save
                        if(k==="categories" && $scope.product[k].length>0){
                            $scope.productToSave[k]=$scope.product[k];
                        }
                        else {$scope.productToSave[k]=$scope.product[k];}
                         
                         console.log("Key is " + k + ", value is" + $scope.product[k]);
                    }
                }

                console.log("productToModify: "+JSON.stringify($scope.product));
                console.log("productToSave: "+JSON.stringify($scope.productToSave));

                $scope.productToModify.products.push($scope.productToSave);
                if ($scope.productToModify.products[0].retailer) {
                    $scope.productToModify.$save(function(res, err) {
                        console.log("Saving Product Response:" + JSON.stringify(res))
                         var url;
                         if(res.products[0].links.categories[0]){
                          url = "/category/" + res.products[0].links.categories[0];
                          $location.url(url);
                          }
                        else if(res.products[0].links.retailer){
                             url = "/retailer/" + res.products[0].links.retailer;
                          $location.url(url);
                        }
                    });

                   
                }

                // var dataShared = Data.getDataShare();
                // console.log("Retailer: "+dataShared.retailerId+"  Category:"+dataShared.categoryId)
                // var retailerId=dataShared.retailerId;
                // var categoryId=dataShared.categoryId;

                // alert("Retailer: "+$localStorage.dataShare.retailerId+"  Category:"+$localStorage.dataShare.categoryId)
                

                // $scope.product.retailer = $localStorage.dataShare.retailerId;
                // $scope.product.categories.push($localStorage.dataShare.categoryId);
                // $scope.productToModify.products.push($scope.product);
                

                // console.log("Product to save"+JSON.stringify($scope.productToSave));
            }
        };

        $scope.show = function(retailer) {
            //set retailer Id in object
            
            $scope.retailerName=retailer.retailerName;

            $scope.retailerId = retailer.id;
            $scope.product.retailer=  retailer.id;
            console.log("Retailer:" + JSON.stringify(retailer));

            $scope.categoriesInfo = [];
            //get categories database
            var idParameter = retailer.categories || null;
            console.log("Categories info:"+idParameter);
            console.log("Categories ids:"+  $scope.categoriesInfo);
            if (idParameter) {
                Category.get({
                    id: idParameter
                }, function(data) {
                    $scope.categoriesInfo = [];
                    console.log("Data:" + JSON.stringify(data));
                    $scope.categories = data.categories;

                    $scope.categories.forEach(function(category) {
                        $scope.categoriesInfo.push({
                            categoryName: category.name,
                            id: category.id
                        })
                    });
                    console.log("CategoriesInfo:"+JSON.stringify($scope.categoriesInfo));
                });
            };
        $scope.disable = false;
        // alert("Retailer selected:"+retailer.retailer[0]+" Id: "+retailer.retailer[1]);

    };

    //set category id
    $scope.setCategory = function(category) {
        $scope.categoryId=category.id;
        $scope.categoryName=category.categoryName;
        $scope.product.categories=[];
        $scope.product.categories.push(category.id);
        console.log("Category selected:"+JSON.stringify(category));
        console.log("Category id:"+JSON.stringify($scope.categoryId));
    };

});

    //DIRECTIVES

    rainfallApp.directive('formField', function($timeout, Product, Category, Retailer) {
        return {
            restrict: 'EA', //can be used as an element or an attribute
            templateUrl: 'app/pages/form-field.html', //template: html the formFiel is gonna be replaced with
            replace: true, //if false the html template will be render within the element
            scope: { //this is where we choose what attributes that are place on the element are gonna be available inside of the actual directives
                record: '=', //is contact which is references to an object in the controller $scope.contact. '='sign means two way binding-> any change we make to the record object within the directive is gonna be make to the contact object
                rawrecord: '=',
                field: '@', //we only need to read those values not reflect changes ->'@'           
                live: '@',
                required: '@',
                recordtype: '@'
            },
            require: '^form',
            link: function($scope, element, attr, form) { //is run during the creation of this directive and it allows us to modify whats going on when the directive is created and replaces the content
                // $scope.types = FieldTypes;

                // console.log("Record from directive: " + JSON.stringify($scope.record));
                // console.log("RawRecord " + JSON.stringify($scope.rawrecord));

                // var type = $scope.recordtype;
                // console.log(type);

                $scope.$on('record:invalid', function() {
                    // console.log("FIELD InVALIDDDDDDD")
                    $scope[$scope.field].$setDirty(); //refers to the ng-form attribute or fake form element created inside the directive
                })



                $scope.update = function() {
                    console.log("Updating.....");

                    if ($scope.live !== 'false') {

                        if ($scope.recordtype === 'product') {
                            console.log("Updating product.....");
                            Product.update({
                                id: $scope.rawrecord.products[0].id
                            }, JSON.stringify($scope.rawrecord), function success(updatedRecord) {
                                console.log("Success");
                                console.log("Product updated:" + JSON.stringify($scope.rawrecord));
                                //$scope.record = updatedRecord.products[0];
                            }, function error(err) {
                                console.log(err);
                                // evt.target.disabled = false;
                            });
                        } else if ($scope.recordtype === 'category') {
                            console.log("Updating category.....");
                            Category.update({
                                id: $scope.rawrecord.categories[0].id
                            }, JSON.stringify($scope.rawrecord), function success(updatedRecord) {
                                console.log("Success");
                                console.log("Category updated:" + JSON.stringify($scope.rawrecord));
                                //$scope.record = updatedRecord.products[0];
                            }, function error(err) {
                                console.log(err);
                                // evt.target.disabled = false;
                            });

                        } else if ($scope.recordtype === 'retailer') {
                            console.log("Updating retailer.....");
                            Retailer.update({
                                id: $scope.rawrecord.retailers[0].id
                            }, JSON.stringify($scope.rawrecord), function success(updatedRecord) {
                                console.log("Success");
                                console.log("Retailer updated:" + JSON.stringify($scope.rawrecord));
                                //$scope.record = updatedRecord.products[0];
                            }, function error(err) {
                                console.log(err);
                                // evt.target.disabled = false;
                            });
                        }


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
    rainfallApp.factory('Data', function() {

        var data = {
            FirstName: ''
        };

        var dataShare = {};

        return {
            getFirstName: function() {
                return data.FirstName;
            },
            setFirstName: function(firstName) {
                data.FirstName = firstName;
            },
            setProperty: function(propName, value) {
                dataShare[propName] = value;
            },
            getProperty: function(propName) {
                return dataShare[propName];
            },
            getDataShare: function() {
                return dataShare;
            },
            setDataSahre: function(data) {
                dataShare = data;
            }
        };
    });

})(window, window.angular);