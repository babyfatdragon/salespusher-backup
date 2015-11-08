(function(){
	angular.module('salespusher.directives')
	.directive('spCompanyForm',[function(){
		return{
			restrict: 'E',
			scope: {
				company: '=',
				action: '@',
			},
			templateUrl: 'templates/directives/sp-company-form.html',
			controller: ['$scope','$location','ModalService','Company', function($scope,$location,ModalService,Company){
				$scope.popSaveConfirmationDialog = function() {
					var content = $scope.action==="Create"?"Create new company: "+$scope.company.name+" ?":"Update details of "+$scope.company.name+" ?";
				    ModalService.showModal({
				    	templateUrl: "templates/partials/_modal_dialog.html",
				    	controller: "ModalDialogController",
				    	inputs: {
				    		header: "Company "+$scope.action,
				    		content: content
				    	}
				    })
					.then(function(modal) {
						modal.element.modal();
						modal.close.then(function(result) {
							if(result){
								if($scope.action==="Create"){
									$scope.company.$save().then(function(data){
										$location.path("/customer_management/company");
									});
								} else if($scope.action==="Update"){
									$scope.company.$update().then(function(data){
										$location.path("/customer_management/company");
									});
								}
							}
						});
			    	});
		  		};
			}]
		};
	}]);
})();