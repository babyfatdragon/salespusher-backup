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
			templateUrl: '/templates/products/catalog_create.html',
			controller: 'CatalogCreateCtrl'
		})
		.when('/product_catalog/:categoryOneId',{
			templateUrl: 'templates/products/categories_index.html',
			controller: 'CategoriesIndexCtrl'
		})
		.when('/product_catalog/:categoryOneId/categories/:categoryTwoId/products',{
			templateUrl: 'templates/products/products_index.html',
			controller: 'ProductsIndexCtrl'
		})
		.otherwise('/');
		
		/* disable basic http authentication dialog */
		$httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';	
	})
})();