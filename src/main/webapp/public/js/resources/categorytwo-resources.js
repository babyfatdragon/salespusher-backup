(function(){
	angular.module("salespusher.resources").factory("CategoryTwo", ['$resource',function CategoryTwoFactory($resource) {  
		return $resource("/categoryones/:categoryOneId/categorytwos/:id", {categoryOneId:'@categoryOneId',id:'@id'}, {
			'update': {method:'PUT'}
		});
	}]);
	angular.module("salespusher.resources").factory("AllCategoryTwo", ['$resource',function AllCategoryTwoFactory($resource) {  
		return $resource("/categorytwos/:id", {id:'@id'}, {
			'update': {method:'PUT'}
		});
	}]);
})();