(function(){
	angular.module('salespusher.controllers')
	.controller('ProductUpdateCtrl',[
	'$scope','$http','$route','$cookies','$routeParams','ModalService','CategoryOne','CategoryTwo','Product','FileUploader',
	function($scope,$http,$route,$cookies,$routeParams,ModalService,CategoryOne,CategoryTwo,Product,FileUploader){
		$scope.categoryones = CategoryOne.query();
		$scope.categorytwos = [];
		$scope.$watch("product.categoryOneId", function(){
			$scope.categorytwos = CategoryTwo.query({categoryOneId: $scope.product.categoryOneId});
		});
		$scope.product = Product.get({id:$routeParams.id});
		
		$scope.popUpdateConfirmationDialog = function(product){
		    ModalService.showModal({
		    	templateUrl: "templates/partials/modal-dialog.html",
		    	controller: "ModalDialogController",
		    	inputs: {
		    		header: "Product Update Creation",
		    		content: "You are updating "+$scope.product.name+"."
		    	}
		    })
			.then(function(modal) {
				modal.element.modal();
				modal.close.then(function(result) {
					if(result){
						$scope.product.$save().then(function(){
							//$route.reload();
						})
						.finally(function(){});
					}
				});
	    	});
		}
	}]);
})();