(function(){
	angular.module('salespusher.directives')
	.directive('spProductForm',[function(){
		return{
			restrict: 'E',
			scope: {
				categoryones: '=',
				categorytwos: '=',
				product: '=',
				action: '@',
			},
			templateUrl: 'templates/directives/sp-product-form.html',
			controller: ['$scope','ModalService','CategoryTwo', function($scope,ModalService,CategoryTwo){
				$scope.$watch("product.categoryOneId", function(){
					if($scope.product.categoryOneId){
						$scope.categorytwos = CategoryTwo.query({categoryOneId: $scope.product.categoryOneId});
					}
				});
				$scope.popSaveConfirmationDialog = function() {
					var content = $scope.action==="Create"?"Create new product: "+$scope.product.name+" ?":"Update details of "+$scope.product.name+" ?";
				    ModalService.showModal({
				    	templateUrl: "templates/partials/_modal_dialog.html",
				    	controller: "ModalDialogController",
				    	inputs: {
				    		header: "Product "+$scope.action,
				    		content: content
				    	}
				    })
					.then(function(modal) {
						modal.element.modal();
						modal.close.then(function(result) {
							if(result){
								if($scope.action==="Create"){
									$scope.product.$save().then(function(data){
									})
									.finally(function(){});
								} else if($scope.action==="Update"){
									$scope.product.$update().then(function(data){
									})
									.finally(function(){});
								}
							}
						});
			    	});
		  		};
			}]
		};
	}]);
})();