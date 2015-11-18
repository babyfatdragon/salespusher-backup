(function(){
	angular.module('salespusher')
	.config(['eehNavigationProvider', function (eehNavigationProvider) {
	    eehNavigationProvider.iconBaseClass('glyphicon');	    
	    // Add a menu item that links to "/home" to the "bar" menu.
	    eehNavigationProvider
	    .menuItem('spSidebar.home', {
	        text: 'Home',
	        iconClass: 'glyphicon-home',    
	        state: 'home'
	    })
	    .menuItem('spSidebar.companyOverview', {
	        text: 'Company Overview',
	        iconClass: 'glyphicon-dashboard',    
	        state: 'companyOverview'
	    })
	    .menuItem('spSidebar.user',{
	    	text: 'Staff',
	    	iconClass: 'glyphicon-user',
	        isCollapsed: true
	    })    
	    .menuItem('spSidebar.user.management',{
	    	text: 'Staff Management',
	    	iconClass: 'glyphicon-user',
	    	state: 'users'
	    })
	    .menuItem('spSidebar.user.locator',{
	    	text: 'Staff Locator',
	    	iconClass: 'glyphicon-map-marker',
	    	state: 'users.locator'
	    })
	    .menuItem('spSidebar.product',{
	    	text: 'Product',
	    	iconClass: 'glyphicon-book',
	        isCollapsed: true
	    })
	    .menuItem('spSidebar.product.catalog',{
	    	text: 'Product Catalog',
	        state: 'productCatalog'
	    })
	    .menuItem('spSidebar.product.catalogManagement',{
	    	text: 'Catalog Management',
	        state: 'productManagement.catalog'
	    })
	    .menuItem('spSidebar.product.categoryManagement',{
	    	text: 'Category Management',
	        state: 'productManagement.category'
	    })
	    .menuItem('spSidebar.product.productManagement',{
	    	text: 'Product Management',
	        state: 'productManagement.product'
	    })
	    .menuItem('spSidebar.customer', {
	        text: 'Customer',
	        iconClass: 'glyphicon-phone-alt',    
	        isCollapsed: true
	    })
	    .menuItem('spSidebar.customer.companyManagement',{
	    	text: 'Company Management',
	        state: 'customerManagement.company'
	    })
	    .menuItem('spSidebar.customer.customerManagement',{
	    	text: 'Customer Management',
	        state: 'customerManagement.customer'
	    })
	    .menuItem('spSidebar.deal', {
	        text: 'Deal',
	        iconClass: 'glyphicon-usd', 
	        state: 'dealManagement'
	    })
	    ;
	}]);
})();