(function(){
	angular.module("salespusher.resources").factory("Product", function ProductFactory($resource) {  
		return $resource("/products/:id", {}, {});	
	});
	
	angular.module("salespusher.resources").factory("CategoryProduct", function CategoryProductFactory($resource){
		return $resource("/categorytwos/:categoryTwoId/products/:id", {categoryTwoId:'@categoryTwoId'}, {});
	});
})();