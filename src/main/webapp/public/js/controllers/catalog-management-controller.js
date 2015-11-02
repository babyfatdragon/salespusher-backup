(function(){
	angular.module('salespusher.controllers')
    .controller('CatalogManagementCtrl', ['$scope','CategoryOne', function ($scope,CategoryOne) {
	    $scope.displayCategoryones = [];
    	CategoryOne.query().$promise.then(function(categoryones){
    		$scope.categoryones = categoryones;
    	    $scope.displayCategoryones = [].concat(categoryones);
    	});
    	
    	$scope.itemsByPage = 10;
    }]);
})();
