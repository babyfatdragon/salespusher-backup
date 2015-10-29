(function(){
	angular.module('salespusher.directives')
	.directive('productCard', [function() {
	  return {
	    restrict: "E",
	    scope: {
	      header: "=",
	      id: "=",
	      thumbnail: "="
	    },
	    templateUrl: "templates/directives/sp-product-card.html",
	    controller: function($scope,ProductImage){
			var productImages = ProductImage.query({productId:$scope.id}).$promise.then(function(productImages){
				console.log("wahaha "+JSON.stringify(productImages,2,null));
				if(productImages.length){
					$scope.thumbnail = "/resources/products/images/" + productImages[0].name;
				} else{
					$scope.thumbnail = "";
				}
			});
	    }
	  };
	}]);

})();