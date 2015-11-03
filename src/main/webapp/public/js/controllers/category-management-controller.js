(function(){
	angular.module('salespusher.controllers')
    .controller('CategoryManagementCtrl', ['$scope','$route','ModalService','CategoryOne','AllCategoryTwo','CategoryProduct','ProductImage','ProductDocument','ProductVideo',
                                           function ($scope,$route,ModalService,CategoryOne,AllCategoryTwo,CategoryProduct,ProductImage,ProductDocument,ProductVideo) {
    	$scope.categoryones = [];
    	$scope.categorytwos = [];
	    $scope.displayCategorytwos = [];
	    
    	CategoryOne.query().$promise.then(function(categoryones){
    		$scope.categoryones = categoryones;
        	AllCategoryTwo.query().$promise.then(function(categorytwos){
        		for(var i=0;i<categorytwos.length;i++){
        			categorytwos[i].catalogName = $scope.getCategoryOneName(categorytwos[i].categoryOneId);
        		}
        		$scope.categorytwos = categorytwos;
        	    $scope.displayCategorytwos = [].concat(categorytwos);
        	});
    	});

    	$scope.getCategoryOneName = function(id){
    		if($scope.categoryones.length){
        		var result = $.grep($scope.categoryones, function(element){
        			return element.id === id; 
    			});
        		if(result.length){
            		return result[0].name;
        		}
    		}
    	};
    	
    	$scope.itemsByPage = 10;
    	
		/* delete images,documents of the all products and category itself */
		$scope.deleteAll = function(categorytwo){
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
						var categoryTwoId = categorytwo.id;
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
								/*delete product here*/
								products[i].$remove().then(function(data){});
							}						
						});	
						/*delete category here*/
						categorytwo.$remove();
					}
				});
	    	});					
		}
		
    }]);
})();
