(function(){
	angular.module('salespusher.controllers')
	.controller('ProductUpdateCtrl',[
	'$scope','$routeParams','$location','CategoryOne','CategoryTwo','Product','ProductImage','ProductDocument','ModalService',
	function($scope,$routeParams,$location,CategoryOne,CategoryTwo,Product,ProductImage,ProductDocument,ModalService){
		$scope.categoryones = CategoryOne.query();
		$scope.categorytwos = [];
		$scope.product = Product.get({id:$routeParams.id});
		
		/* delete images,documents of the product and itself */
		$scope.deleteAll = function(){
		    ModalService.showModal({
		    	templateUrl: "templates/partials/_modal_dialog.html",
		    	controller: "ModalDialogController",
		    	inputs: {
		    		header: "Attention",
		    		content: "Delete this products and all related images and documents?"
		    	}
		    })
			.then(function(modal) {
				modal.element.modal();
				modal.close.then(function(result) {
					if(result){
						ProductImage.query({productId:$routeParams.id}).$promise.then(function(productImages){
							for(var i=0;i<productImages.length;i++) productImages[i].$remove();
							ProductDocument.query({productId:$routeParams.id}).$promise.then(function(productDocuments){
								for(var i=0;i<productDocuments.length;i++) productDocuments[i].$remove();
								var categoryOneId = $scope.product.categoryOneId;
								var categoryTwoId = $scope.product.categoryTwoId;
								$scope.product.$remove().then(function(data){
									console.log(categoryOneId+"   "+categoryTwoId);
									console.log("/product_catalog/"+categoryOneId+"/categories/"+categoryTwoId+"/products");
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