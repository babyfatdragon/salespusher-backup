(function(){
	angular.module('salespusher.controllers')
	.controller('ProductUpdateCtrl',[
	'$scope','$stateParams','$location','CategoryOne','CategoryTwo','Product','ProductImage','ProductDocument','ModalService',
	function($scope,$stateParams,$location,CategoryOne,CategoryTwo,Product,ProductImage,ProductDocument,ModalService){
		/* Retrieve categoryone and categorytwo for showing in breadcrumb */
		//$scope.categoryone = CategoryOne.get({id:$stateParams.categoryOneId});
		//$scope.categorytwo = CategoryTwo.get({categoryOneId:$stateParams.categoryOneId,id:$stateParams.categoryTwoId});
		/* Retrieve categoryones and categorytwos for updating product   */
		$scope.categoryones = CategoryOne.query();
		$scope.categorytwos = [];
		$scope.product = Product.get({id:$stateParams.id});
		
		/* delete images,documents of the product and itself */
		$scope.deleteAll = function(){
		    ModalService.showModal({
		    	templateUrl: "templates/partials/_modal_dialog.html",
		    	controller: "ModalDialogController",
		    	inputs: {
		    		header: "Attention",
		    		content: "Delete this product and all related images and documents?"
		    	}
		    })
			.then(function(modal) {
				modal.element.modal();
				modal.close.then(function(result) {
					if(result){
						ProductImage.query({productId:$stateParams.id}).$promise.then(function(productImages){
							for(var i=0;i<productImages.length;i++) productImages[i].$remove();
							ProductDocument.query({productId:$stateParams.id}).$promise.then(function(productDocuments){
								for(var i=0;i<productDocuments.length;i++) productDocuments[i].$remove();
								var categoryOneId = $scope.product.categoryOneId;
								var categoryTwoId = $scope.product.categoryTwoId;
								$scope.product.$remove().then(function(data){
									$location.path("/product_catalog/"+categoryOneId+"/categories/"+categoryTwoId+"/products");
								}).finally(function(){});
							});
						});
					}
				});
	    	});					
		}
	}]);
})();