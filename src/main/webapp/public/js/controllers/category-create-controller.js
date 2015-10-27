(function(){
	angular.module('salespusher.controllers').controller('CategoryCreateCtrl', ['$scope','$http','$route','CategoryOne','CategoryTwo','ModalService', function($scope,$http,$route,CategoryOne,CategoryTwo,ModalService){
		$scope.categoryones = CategoryOne.query();
		$scope.categorytwo = new CategoryTwo();
		
  		$scope.popSaveConfirmationDialog = function() {		
		    ModalService.showModal({
		    	templateUrl: "templates/partials/modal-dialog.html",
		    	controller: "ModalDialogController",
		    	inputs: {
		    		header: "Product Category Creation",
		    		content: "You are creating a new product category"
		    	}
		    })
			.then(function(modal) {
				modal.element.modal();
				modal.close.then(function(result) {
					if(result){
						$scope.categorytwo.$save().then(function(){
							$route.reload();
						})
						.finally(function(){});
					}
				});
	    	});
  		};
	}]);
})();
