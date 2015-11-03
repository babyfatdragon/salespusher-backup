(function(){
	angular.module('salespusher.controllers')
    .controller('CatalogManagementCtrl', ['$scope','$location','ModalService','CategoryOne','CategoryTwo','CategoryProduct','ProductImage','ProductDocument','ProductVideo',
                                          function ($scope,$location,ModalService,CategoryOne,CategoryTwo,CategoryProduct,ProductImage,ProductDocument,ProductVideo) {
	    $scope.displayCategoryones = [];
    	CategoryOne.query().$promise.then(function(categoryones){
    		$scope.categoryones = categoryones;
    	    $scope.displayCategoryones = [].concat(categoryones);
    	});
    	
    	$scope.itemsByPage = 10;
    	
    	/* delete images,documents of the all products, categories and catalog itself */
		$scope.deleteAll = function(categoryone){
		    ModalService.showModal({
		    	templateUrl: "templates/partials/_modal_dialog.html",
		    	controller: "ModalDialogController",
		    	inputs: {
		    		header: "Attention",
		    		content: "Delete this category and all related products (including images and documents)?"
		    	}
		    })
			.then(function(modal) {
				modal.element.modal();
				modal.close.then(function(result) {
					if(result){
						var categoryOneId = categoryone.id;
						CategoryTwo.query({categoryOneId:categoryOneId}).$promise.then(function(categorytwos){
							for(var i=0;i<categorytwos.length;i++){
								var categoryTwoId = categorytwos[i].id;
								CategoryProduct.query({categoryTwoId:categoryTwoId}).$promise.then(function(products){
									for(var i=0;i<products.length;i++){
										var productId = products[i].id;
										ProductImage.query({productId:productId}).$promise.then(function(productImages){
											for(var i=0;i<productImages.length;i++) productImages[i].$remove();
										});
										ProductDocument.query({productId:productId}).$promise.then(function(productDocuments){
											for(var i=0;i<productDocuments.length;i++) productDocuments[i].$remove();
										});
										ProductVideo.query({productId:productId}).$promise.then(function(productVideos){
											for(var i=0;i<productVideos.length;i++) productVideos[i].$remove();
										});
										/* delete product here*/
										products[i].$remove().then(function(data){});
									}
								});
								/*delete category here*/
								categorytwos[i].$remove();
							}
						});
						/*delete catalog here*/
						categoryone.$remove();
					}
				});
	    	});					
		}
		
    }]);
})();
