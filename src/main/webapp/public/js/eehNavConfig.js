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
	    });
	}]);
})();