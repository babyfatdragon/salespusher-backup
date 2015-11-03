(function(){
	angular.module('salespusher.controllers')
    .controller('ProductManagementCtrl', ['$scope','$location','ModalService','CategoryOne','AllCategoryTwo','Product','ProductImage','ProductDocument','ProductVideo',
                                           function ($scope,$location,ModalService,CategoryOne,AllCategoryTwo,Product,ProductImage,ProductDocument,ProductVideo) {
    	$scope.categoryones = [];
    	$scope.categorytwos = [];
    	$scope.products = [];
	    $scope.displayProducts = [];
    	CategoryOne.query().$promise.then(function(categoryones){
    		$scope.categoryones = categoryones;
        	AllCategoryTwo.query().$promise.then(function(categorytwos){
        		$scope.categorytwos = categorytwos;
        		Product.query().$promise.then(function(products){
            		for(var i=0;i<products.length;i++){
            			products[i].catalogName = $scope.getCategoryOneName(products[i].categoryOneId);
            			products[i].categoryName = $scope.getCategoryTwoName(products[i].categoryTwoId);
            		}
            		$scope.products = products;
            	    $scope.displayProducts = [].concat(products);
        		});
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
    	$scope.getCategoryTwoName = function(id){
    		if($scope.categorytwos.length){
        		var result = $.grep($scope.categorytwos, function(element){
        			return element.id === id; 
    			});
        		if(result.length){
            		return result[0].name;
        		}
    		}
    	};
    	
    	$scope.itemsByPage = 10;
    	
		/* delete images,documents of the product and itself */
		$scope.deleteAll = function(product){
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
						var productId = product.id;
						ProductImage.query({productId:productId}).$promise.then(function(productImages){
							for(var i=0;i<productImages.length;i++) productImages[i].$remove();
						});
						ProductDocument.query({productId:productId}).$promise.then(function(productDocuments){
							for(var i=0;i<productDocuments.length;i++) productDocuments[i].$remove();
						});
						ProductVideo.query({productId:productId}).$promise.then(function(productVideos){
							for(var i=0;i<productVideos.length;i++) productVideos[i].$remove();
						});
						product.$remove().then(function(data){
							$location.path("/product_catalog/management/product");
						});
					}
				});
	    	});					
		}
		
    }]);
})();
