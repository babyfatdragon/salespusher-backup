(function(){
	angular.module('salespusher.controllers').controller('CatalogCreateCtrl',['$scope','$http','$location','CategoryOne','ModalService', function($scope,$http,$location,CategoryOne,ModalService){
		$scope.categoryone = new CategoryOne();  		
  		$scope.popSaveConfirmationlDialog = function() {		
		    ModalService.showModal({
		    	templateUrl: "templates/partials/modal-dialog.html",
		    	controller: "ModalDialogController",
		    	inputs: {
		    		header: "Product Catalog Creation",
		    		content: "You are creating a new product catalog."
		    	}
		    })
			.then(function(modal) {
				modal.element.modal();
				modal.close.then(function(result) {
					if(result){
						$scope.isSubmitting = true;
						$scope.categoryone.$save().then(function(){
							$location.path("/product_catalog/create/category");
						})
						.finally(function(){});
					}
				});
	    	});
  		};
  		
	}]);
	
})();
