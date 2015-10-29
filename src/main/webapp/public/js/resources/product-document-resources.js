(function(){
	angular.module("salespusher.resources").factory("ProductDocument",['$resource', function ProductDocumentFactory($resource){
		return $resource("/products/:productId/productDocuments/:id",{productId:'@productId'},{});
	}]);
})();