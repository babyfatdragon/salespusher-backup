(function(){
	angular.module('salespusher.controllers')
    .controller('CatalogManagementCtrl', ['$scope','CategoryOne', function ($scope,CategoryOne) {
    	$scope.categoryones = [];
    	CategoryOne.query().$promise.then(function(categoryones){
    		$scope.categoryones = categoryones;
    	});
    }]);
})();
