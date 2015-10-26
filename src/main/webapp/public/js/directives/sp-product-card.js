(function(){
	angular.module('salespusher.directives')
	.directive('productCard', [function() {
	  return {
	    restrict: "E",
	    scope: {
	      header: "=",
	      id: "="
	    },
	    templateUrl: "templates/directives/sp-product-card.html",
	  };
	}]);

})();