(function(){
	angular.module('salespusher.directives')
	.directive('spDocuments',[function(){
		return {  
			restrict: 'E',
			scope: {
				productId: '=',
				dealId: '=',
				serviceId: '='
			},
			templateUrl: 'templates/directives/sp-documents.html',
			controller: ['$scope','ProductDocument','DealDocument','ServiceDocument','ModalService', function($scope,ProductDocument,DealDocument,ServiceDocument,ModalService){				
				$scope.$watch("productId", function(){
					if($scope.productId){
						ProductDocument.query({productId:$scope.productId})
						.$promise.then(function(documents){
							$scope.documents = documents;
						});	
					}
				});
				
				$scope.$watch("dealId", function(){
					if($scope.dealId){
						DealDocument.query({dealId:$scope.dealId})
						.$promise.then(function(documents){
							$scope.documents = documents;
						});	
					}
				});
				
				$scope.$watch("serviceId", function(){
					if($scope.serviceId){
						ServiceDocument.query({serviceId:$scope.serviceId})
						.$promise.then(function(documents){
							$scope.documents = documents;
						});	
					}
				});
				
				$scope.getFilePath = function(fileName){
					if(fileName!=null){
						if($scope.productId){
							return "/resources/products/documents/"+fileName;	
						} else if($scope.dealId){
							return "/resources/deals/documents/"+fileName;
						} else if($scope.serviceId){
							return "/resources/services/documents/"+fileName;
						}
					}
				};
				$scope.getOriginDocumentName = function(fileName){
					if(fileName!=null)
						return fileName.substr(fileName.indexOf("-")+1);
				};
				$scope.remove = function(document){
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
								document.$remove().then(function(data){
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