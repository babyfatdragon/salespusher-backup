(function(){
	angular.module('salespusher.directives')
	.directive('spProductImages',[function(){
		return {  
			restrict: 'E',
			scope: {
				productId: '=',
			},
			templateUrl: 'templates/directives/sp-product-images.html',
			controller: ['$scope','ProductImage','ModalService', function($scope,ProductImage,ModalService){
				$scope.$watch('productId', function(){
					if($scope.productId){
						ProductImage.query({productId:$scope.productId})
						.$promise.then(function(productImages){
							$scope.productImages = productImages;
						});	
					}
				});	
				
				$scope.getFilePath = function(fileName){
					if(fileName!=null){
						return "/resources/products/images/"+fileName;
					}
				}
				
				$scope.remove = function(productImage){
				    ModalService.showModal({
				    	templateUrl: "templates/partials/_modal_dialog.html",
				    	controller: "ModalDialogController",
				    	inputs: {
				    		header: "Delete Image",
				    		content: "Delete this image?"
				    	}
				    })
					.then(function(modal) {
						modal.element.modal();
						modal.close.then(function(result) {
							if(result){
								productImage.$remove().then(function(data){
								})
								.finally(function(){});
							}
						});
			    	});					
				}
			}]
		};
	}]);
})();