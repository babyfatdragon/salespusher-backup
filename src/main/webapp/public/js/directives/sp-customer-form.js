(function(){
	angular.module('salespusher.directives')
	.directive('spCustomerForm',[function(){
		return{
			restrict: 'E',
			scope: {
				companies: '=',
				customer: '=',
				action: '@',
			},
			templateUrl: 'templates/directives/sp-customer-form.html',
			controller: ['$scope','$location','ModalService','Company','Customer', function($scope,$location,ModalService,Company,Customer){
				$scope.genders = [{type:'Male'},{type:'Female'}];
				$scope.$watch("customer.companyId", function(){
					if($scope.customer.companyId){
						Company.get({id:$scope.customer.companyId}).$promise.then(function(company){
							$scope.customer.address = company.address;
						});
					}
				});
				
				$scope.popSaveConfirmationDialog = function() {
					var content = $scope.action==="Create"?"Create new customer: "+$scope.customer.name+" ?":"Update details of "+$scope.customer.name+" ?";
				    ModalService.showModal({
				    	templateUrl: "templates/partials/_modal_dialog.html",
				    	controller: "ModalDialogController",
				    	inputs: {
				    		header: "Customer "+$scope.action,
				    		content: content
				    	}
				    })
					.then(function(modal) {
						modal.element.modal();
						modal.close.then(function(result) {
							if(result){
								if($scope.action==="Create"){
									$scope.customer.$save().then(function(data){
										$location.path("/customerManagement/customer");
									});
								} else if($scope.action==="Update"){
									$scope.customer.$update().then(function(data){
										$location.path("/customerManagement/customer");
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