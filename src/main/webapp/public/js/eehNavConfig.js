(function(){
	angular.module('salespusher')
	.config(['eehNavigationProvider', function (eehNavigationProvider) {
	    eehNavigationProvider.iconBaseClass('glyphicon');	    
	    // Add a menu item that links to "/home" to the "bar" menu.
	    eehNavigationProvider
	    .menuItem('spSidebar.home', {
	        text: 'Home',
	        iconClass: 'glyphicon-home',    
	        href: '#/home'
	    })
	    .menuItem('spSidebar.user',{
	    	text: 'Staff',
	    	iconClass: 'glyphicon-user',
	        isCollapsed: true
	    })    
	    .menuItem('spSidebar.user.management',{
	    	text: 'Staff Management',
	    	iconClass: 'glyphicon-user',
	    	href: '#/users'
	    })
	    .menuItem('spSidebar.user.locator',{
	    	text: 'Staff Locator',
	    	iconClass: 'glyphicon-map-marker',
	    	href: '#/users/locator'
	    });
	}]);
})();