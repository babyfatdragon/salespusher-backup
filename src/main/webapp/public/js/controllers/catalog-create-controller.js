(function(){
	angular.module('salespusher.controllers').controller('CatalogCreateCtrl',['$scope','$http','$location','CategoryOne', function($scope,$http,$location,CategoryOne){
		$scope.categoryone = new CategoryOne();
	  		$scope.isSubmitting = false;

	  		$scope.saveCategoryOne = function(categoryone){
	  			$scope.isSubmitting = true;
	  			categoryone.$save().then(function(){
  				$location.path("/product_catalog");
		    })
		    .finally(function(){
		    	$scope.isSubmitting = false;
		    });
  		}
	}]);
	
})();
