(function(){
	angular.module('salespusher')
	.config(function($breadcrumbProvider) {
		$breadcrumbProvider.setOptions({
			prefixStateName: 'home',
			template: 'bootstrap3'
	    });
	})
	.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
	  	.state('home', {
	  		url: '/',
	  		templateUrl : '/templates/partials/_home.html',
	  		controller : 'HomeCtrl',
	  		ncyBreadcrumb: {
	  			label: 'Home'
	  		}
	  	})
	  	.state('login',{
	  		url: '/login',
	  		templateUrl : '/templates/partials/_login.html',
	  		controller : 'NavigationCtrl',
	  		ncyBreadcrumb: {
	  			label: 'Login',
	  			parent: 'home'
	  		}
	  	})
	  	.state('users',{
	  		url: '/users',
	  		templateUrl: '/templates/partials/_users.html',
	  		controller: 'UsersCtrl',
	  		ncyBreadcrumb: {
	  			label: 'Users',
	  			parent: 'home'
	  		}
	  	})
	  	.state('productCatalog',{
	  		url: '/product_catalog',
	  		templateUrl: '/templates/products/catalog_index.html',
	  		controller: 'CatalogIndexCtrl',
	  		ncyBreadcrumb: {
	  			label: 'Product Catalog',
	  			parent: 'home'
	  		}
	  	})
	  	.state('productManagement',{
	  		url: '/product_catalog/management',
	  		templateUrl: '/templates/products/management.html',
	  		ncyBreadcrumb: {
	  			label: 'Product Management',
	  			parent: 'productCatalog'
	  		}
	  	})
	  	.state('productManagement.catalog',{
	  		url: '/catalog',
	  		templateUrl: '/templates/products/catalog_management.html',
	  		controller: 'CatalogManagementCtrl',
	  		ncyBreadcrumb: {
	  			label: 'Catalog Management',
	  		}
	  	})
	  	.state('productManagement.catalogCreate',{
	  		url: '/catalog/create',
	  		templateUrl: '/templates/products/catalog_create.html',
	  		controller: 'CatalogCreateCtrl',
	  		ncyBreadcrumb: {
	  			label: 'Catalog Create',
	  		}
	  	})
	  	.state('productManagement.catalogUpdate',{
	  		url: '/catalog/:categoryOneId/update',
	  		templateUrl: '/templates/products/catalog_update.html',
	  		controller: 'CatalogUpdateCtrl',
	  		ncyBreadcrumb: {
	  			label: 'Catalog Update',
	  		}
	  	})
	  	.state('productManagement.category',{
	  		url: '/category',
	  		templateUrl: '/templates/products/category_management.html',
	  		controller: 'CategoryManagementCtrl',
	  		ncyBreadcrumb: {
	  			label: 'Category Management',
	  		}
	  	})
	  	.state('productManagement.categoryCreate',{
	  		url: '/category/create',
	  		templateUrl: '/templates/products/category_create.html',
	  		controller: 'CategoryCreateCtrl',
	  		ncyBreadcrumb: {
	  			label: 'Category Create',
	  		}
	  	})
	  	.state('productManagement.categoryUpdate',{
	  		url: '/category/:id/update',
	  		templateUrl: '/templates/products/category_update.html',
	  		controller: 'categoryUpdateCtrl',
	  		ncyBreadcrumb: {
	  			label: 'Category Update',
	  		}
	  	})
	  	.state('productManagement.product',{
	  		url: '/product',
	  		templateUrl: '/templates/products/product_management.html',
	  		controller: 'ProductManagementCtrl',
	  		ncyBreadcrumb: {
	  			label: 'Product Management',
	  		}
	  	})
	  	.state('productManagement.productCreate',{
	  		url: '/product/create',
	  		templateUrl: '/templates/products/product_create.html',
	  		controller: 'ProductCreateCtrl',
	  		ncyBreadcrumb: {
	  			label: 'Product Create',
	  		}
	  	})
	  	.state('productManagement.productUpdate',{
	  		url: '/product/:id/update',
	  		templateUrl: '/templates/products/product_update.html',
	  		controller: 'ProductUpdateCtrl',
	  		ncyBreadcrumb: {
	  			label: 'Product Update',
	  		}
	  	})
	  	.state('productCategory',{
	  		url: '/product_catalog/:categoryOneId',
	  		templateUrl: 'templates/products/categories_index.html',
	  		controller: 'CategoriesIndexCtrl',
	  		ncyBreadcrumb: {
	  			label: '{{categoryone.name}}',
	  			parent: 'productCatalog'
	  		}
	  	})
	  	.state('products',{
	  		url: '/product_catalog/:categoryOneId/categories/:categoryTwoId/products',
	  		templateUrl: 'templates/products/products_index.html',
	  		controller: 'ProductsIndexCtrl',
	  		ncyBreadcrumb: {
	  			label: '{{categorytwo.name}}',
	  			parent: 'productCategory'
	  		}
	  	})
	  	.state('product',{
	  		url: '/product_catalog/:categoryOneId/categories/:categoryTwoId/products/:id',
			templateUrl: 'templates/products/product_show.html',
			controller: 'ProductShowCtrl',
	  		ncyBreadcrumb: {
	  			label: '{{product.name}}',
	  			parent: 'products'
	  		}
	  	})
	  	.state('productUpdate',{
	  		url: '/product_catalog/:categoryOneId/categories/:categoryTwoId/products/:id/update',
			templateUrl: 'templates/products/product_update.html',
			controller: 'ProductUpdateCtrl',
	  		ncyBreadcrumb: {
	  			label: 'Update',
	  			parent: 'product'
	  		}
	  	})
	  	/****** customer management ******/
	  	.state('customerManagement',{
	  		url: '/customerManagement',
	  		templateUrl: '/templates/customers/management.html',
	  		ncyBreadcrumb: {
	  			label: 'Customers',
	  			parent: 'home'
	  		}
	  	})
	  	.state('customerManagement.company',{
	  		url: '/company',
	  		templateUrl: '/templates/customers/company_management.html',
	  		controller: 'CompanyManagementCtrl',
	  		ncyBreadcrumb: {
	  			label: 'Company Management',
	  		}
	  	})
	  	.state('customerManagement.companyCreate',{
	  		url: '/company/create',
	  		templateUrl: '/templates/customers/company_create.html',
  			controller: 'CompanyCreateCtrl',
	  		ncyBreadcrumb: {
	  			label: 'Company Create',
	  		}
	  	})
	  	.state('customerManagement.companyUpdate',{
	  		url: '/company/:id/update',
	  		templateUrl: '/templates/customers/company_update.html',
  			controller: 'CompanyUpdateCtrl',
	  		ncyBreadcrumb: {
	  			label: 'Company Update',
	  		}
	  	})
	  	.state('customerManagement.customer',{
	  		url: '/customer',
	  		templateUrl: '/templates/customers/customer_management.html',
	  		controller: 'CustomerManagementCtrl',
	  		ncyBreadcrumb: {
	  			label: 'Customer Management',
	  		}
	  	})
	  	.state('customerManagement.customerCreate',{
	  		url: '/customer/create',
	  		templateUrl: '/templates/customers/customer_create.html',
  			controller: 'CustomerCreateCtrl',
	  		ncyBreadcrumb: {
	  			label: 'Customer Create',
	  		}
	  	})
	  	.state('customerManagement.customerUpdate',{
	  		url: '/customer/:id/update',
	  		templateUrl: '/templates/customers/customer_update.html',
  			controller: 'CustomerUpdateCtrl',
	  		ncyBreadcrumb: {
	  			label: 'Customer Update',
	  		}
	  	})
	  	$urlRouterProvider.otherwise('/');
    	
    	/* disable basic http authentication dialog */
		/*$httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';	*/
	})
})();