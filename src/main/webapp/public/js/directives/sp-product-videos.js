(function(){
	angular.module('salespusher.directives')
	.directive('spProductVideos', [function(){
		return{
			'restrict': 'E',
			scope: {
				productId: '=',
				action: '='
			},
			templateUrl: 'templates/directives/sp-product-videos.html',
			controller: ['$scope','$route','ModalService','ProductVideo', function($scope,$route,ModalService,ProductVideo){
				$scope.newProductVideo = new ProductVideo();
				$scope.$watch('productId', function(){
					if($scope.productId){
						ProductVideo.query({productId:$scope.productId})
						.$promise.then(function(productVideos){
							$scope.productVideos = productVideos;
						});
					}
				});
								
				$scope.remove = function(productVideo){
				    ModalService.showModal({
				    	templateUrl: "templates/partials/_modal_dialog.html",
				    	controller: "ModalDialogController",
				    	inputs: {
				    		header: "Delete Video",
				    		content: "Delete this video?"
				    	}
				    })
					.then(function(modal) {
						modal.element.modal();
						modal.close.then(function(result) {
							if(result){
								productVideo.$remove().then(function(data){
								})
								.finally(function(){});
							}
						});
			    	});	
				};
				
				$scope.popSaveConfirmationDialog = function(){
				    ModalService.showModal({
				    	templateUrl: "templates/partials/_modal_dialog.html",
				    	controller: "ModalDialogController",
				    	inputs: {
				    		header: "Add Video Link",
				    		content: "Add this video?"
				    	}
				    })
					.then(function(modal) {
						modal.element.modal();
						modal.close.then(function(result) {
							if(result){
								$scope.newProductVideo.productId = $scope.productId;
								$scope.newProductVideo.$save({productId:$scope.productId}).then(function(data){
									$scope.newProductVideo = {};
									/*retrieve newest video lists */
									ProductVideo.query({productId:$scope.productId})
									.$promise.then(function(productVideos){
										$scope.productVideos = productVideos;
									});
								});
							}
						});
			    	});	
				};
			}]
		};
	}]);
})();