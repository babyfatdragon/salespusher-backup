(function(){
	angular.module('salespusher.controllers').controller('ProductCreateCtrl',['$scope','$http','$route','$cookies','ModalService','CategoryOne','CategoryTwo','Product','FileUploader',function($scope,$http,$route,$cookies,ModalService,CategoryOne,CategoryTwo,Product,FileUploader){
		$scope.product = new Product();
		$scope.categoryones = CategoryOne.query();
		$scope.categorytwos = [];
		
		$scope.$watch("product.categoryOneId", function(){
			$scope.categorytwos = CategoryTwo.query({categoryOneId: $scope.product.categoryOneId});
		});
		
		$scope.popSaveConfirmationDialog = function() {
		    ModalService.showModal({
		    	templateUrl: "templates/partials/modal-dialog.html",
		    	controller: "ModalDialogController",
		    	inputs: {
		    		header: "Product Creation",
		    		content: "You are creating a new product."
		    	}
		    })
			.then(function(modal) {
				modal.element.modal();
				modal.close.then(function(result) {
					if(result){
						$scope.product.$save().then(function(){
							$route.reload();
						})
						.finally(function(){});
					}
				});
	    	});
  		};
	}]);
})();