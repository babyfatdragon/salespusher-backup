(function(){
	angular.module("salespusher.resources").factory("Product", ['$resource',function ProductFactory($resource) {  
		return $resource("/products/:id", {}, {});	
	}]);
	
	angular.module("salespusher.resources").factory("CategoryProduct",['$resource', function CategoryProductFactory($resource){
		return $resource("/categorytwos/:categoryTwoId/products/:id", {categoryTwoId:'@categoryTwoId'}, {});
	}]);
})();