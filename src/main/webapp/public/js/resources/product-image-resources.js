(function(){
	angular.module("salespusher.resources").factory("ProductImage",['$resource', function ProductImageFactory($resource){
		return $resource("/products/:productId/productImages/:id",{productId:'@productId',id:'@id'},{});
	}]);
})();