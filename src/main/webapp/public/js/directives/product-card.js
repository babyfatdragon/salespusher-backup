(function(){
	angular.module('salespusher.directives')
	.directive('productCard', [function() {
	  return {
	    replace: false,
	    restrict: "E",
	    scope: {
	      header: "=",
	      id: "="
	    },
	    templateUrl: "templates/directives/product-card.html",
	  };
	}]);

})();