(function(){
	angular.module('salespusher')
	.config(function($routeProvider, $httpProvider) {
		$routeProvider
		.when('/', {
			templateUrl : '/templates/partials/_home.html',
			controller : 'HomeCtrl'
		})
		.when('/login', {
			templateUrl : '/templates/partials/_login.html',
			controller : 'NavigationCtrl'
		})
		.when('/users',{
			templateUrl: '/templates/partials/_users.html',
			controller: 'UsersCtrl'
		})
		.when('/product_catalog',{
			templateUrl: '/templates/products/catalog_index.html',
			controller: 'CatalogIndexCtrl'
		})
		.when('/product_catalog/create',{
			templateUrl: '/templates/products/create.html',
		})
		.when('/product_catalog/create/catalog',{
			templateUrl: '/templates/products/catalog_create.html',
			controller: 'CatalogCreateCtrl'
		})
		.when('/product_catalog/create/category',{
			templateUrl: '/templates/products/category_create.html',
			controller: 'CategoryCreateCtrl'
		})
		.when('/product_catalog/create/product',{
			templateUrl: '/templates/products/product_create.html',
			controller: 'ProductCreateCtrl'
		})		
		.when('/product_catalog/:categoryOneId',{
			templateUrl: 'templates/products/categories_index.html',
			controller: 'CategoriesIndexCtrl'
		})
		.when('/product_catalog/:categoryOneId/categories/:categoryTwoId/products',{
			templateUrl: 'templates/products/products_index.html',
			controller: 'ProductsIndexCtrl'
		})
		.when('/product_catalog/:categoryOneId/categories/:categoryTwoId/products/:id',{
			templateUrl: 'templates/products/product_show.html',
			controller: 'ProductShowCtrl'
		})
		.otherwise('/');
		
		/* disable basic http authentication dialog */
/*		$httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';	*/
	})
})();