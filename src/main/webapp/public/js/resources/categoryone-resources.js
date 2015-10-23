(function(){
	angular.module("salespusher.resources").factory("CategoryOne", function CategoryOneFactory($resource) {  
		return $resource("/categoryones/:id", {}, {});
	});
})();