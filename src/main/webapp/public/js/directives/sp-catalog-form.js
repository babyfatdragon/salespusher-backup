(function(){
	angular.module('salespusher.directives')
	.directive('spCatalogForm',[function(){
		return{
			restrict: 'E',
			scope: {
				categoryone: '=',
				action: '@'
			},
			templateUrl: 'templates/directives/sp-catalog-form.html',
			controller: ['$scope','$location','ModalService','CategoryOne',function($scope,$location,ModalService,CategoryOne){
				$scope.popSaveConfirmationDialog = function() {
					var content = $scope.action==="Create"?"Create new catalog: "+$scope.categoryone.name+" ?":"Update details of "+$scope.categoryone.name+" ?";
				    ModalService.showModal({
				    	templateUrl: "templates/partials/_modal_dialog.html",
				    	controller: "ModalDialogController",
				    	inputs: {
				    		header: "Catalog "+$scope.action,
				    		content: content
				    	}
				    })
					.then(function(modal) {
						modal.element.modal();
						modal.close.then(function(result) {
							if(result){
								if($scope.action==="Create"){
									$scope.categoryone.$save().then(function(data){
										$location.path("/product_catalog/management/catalog");
									})
									.finally(function(){});
								} else if($scope.action==="Update"){
									$scope.categoryone.$update().then(function(data){
										$location.path("/product_catalog/management/catalog");
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