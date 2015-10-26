(function(){
	angular.module("salespusher.resources").factory("CategoryTwo", function CategoryTwoFactory($resource) {  
		return $resource("/categorytwos/:id", {categoryOneId:'@categoryOneId'}, {});
	});
})();