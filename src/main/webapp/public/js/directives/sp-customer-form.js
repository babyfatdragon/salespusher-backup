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
			controller: ['$rootScope','$scope','$location','ModalService','Company','Customer', function($rootScope,$scope,$location,ModalService,Company,Customer){
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
									$scope.customer.$save().then(function(customer){
										//$location.path("/customer_management/customer");
										$rootScope.$broadcast('CUSTOMER_CREATED',{customer:customer});
									});
								} else if($scope.action==="Update"){
									$scope.customer.$update().then(function(customer){
										//$location.path("/customer_management/customer");
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