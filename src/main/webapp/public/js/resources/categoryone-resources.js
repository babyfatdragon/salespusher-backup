(function(){
	angular.module("salespusher.resources").factory("CategoryOne", ['$resource',function CategoryOneFactory($resource) {  
		return $resource("/categoryones/:id", {id:'@id'}, {
			'update': {method:'PUT'}
		});
	}]);
})();