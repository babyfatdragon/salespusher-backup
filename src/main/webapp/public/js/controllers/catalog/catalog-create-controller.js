(function(){
	angular.module('salespusher.controllers').controller('CatalogCreateCtrl',['$scope','CategoryOne', function($scope,CategoryOne){
		$scope.categoryone = new CategoryOne();  		
	}]);
})();
