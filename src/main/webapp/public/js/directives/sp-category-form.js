(function(){
	angular.module('salespusher.directives')
	.directive('spCategoryForm',[function(){
		return{
			restrict: 'E',
			scope: {
				categoryones: '=',
				categorytwo: '=',
				action: '@'
			},
			templateUrl: 'templates/directives/sp-category-form.html',
			controller: ['$scope','$location','ModalService','CategoryTwo',function($scope,$location,ModalService,CategoryTwo){
				$scope.popSaveConfirmationDialog = function() {
					var content = $scope.action==="Create"?"Create new category: "+$scope.categorytwo.name+" ?":"Update details of "+$scope.categorytwo.name+" ?";
				    ModalService.showModal({
				    	templateUrl: "templates/partials/_modal_dialog.html",
				    	controller: "ModalDialogController",
				    	inputs: {
				    		header: "Category "+$scope.action,
				    		content: content
				    	}
				    })
					.then(function(modal) {
						modal.element.modal();
						modal.close.then(function(result) {
							if(result){
								if($scope.action==="Create"){
									$scope.categorytwo.$save().then(function(data){
										$location.path("/product_catalog/management/category");
									})
									.finally(function(){});
								} else if($scope.action==="Update"){
									$scope.categorytwo.$update().then(function(data){
										$location.path("/product_catalog/management/category");
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