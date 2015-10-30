(function(){
	angular.module('salespusher.directives')
	.directive('spProductDocuments',[function(){
		return {  
			restrict: 'E',
			scope: {
				productId: '='
			},
			templateUrl: 'templates/directives/sp-product-documents.html',
			controller: ['$scope','ProductDocument','ModalService',function($scope,ProductDocument,ModalService){				
				$scope.$watch("productId", function(){
					ProductDocument.query({productId:$scope.productId})
					.$promise.then(function(productDocuments){
						$scope.productDocuments = productDocuments;
					});
				});	
				
				$scope.getFilePath = function(fileName){
					if(fileName!=null)
						return "/resources/products/documents/"+fileName;
				};
				$scope.getOriginDocumentName = function(fileName){
					if(fileName!=null)
						return fileName.substr(fileName.indexOf("-")+1);
				};
				$scope.remove = function(productDcoument){
				    ModalService.showModal({
				    	templateUrl: "templates/partials/_modal_dialog.html",
				    	controller: "ModalDialogController",
				    	inputs: {
				    		header: "Delete Document",
				    		content: "Delete this document?"
				    	}
				    })
					.then(function(modal) {
						modal.element.modal();
						modal.close.then(function(result) {
							if(result){
								productDcoument.$remove().then(function(data){
								})
								.finally(function(){});
							}
						});
			    	});					
				};
			}]
		};
	}]);
})();