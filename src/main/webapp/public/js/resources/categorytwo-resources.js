(function(){
	angular.module("salespusher.resources").factory("CategoryTwo", function CategoryTwoFactory($resource) {  
		return $resource("/categoryones/:categoryOneId/categorytwos/:id", {categoryOneId:'@categoryOneId'}, {});
	});
})();