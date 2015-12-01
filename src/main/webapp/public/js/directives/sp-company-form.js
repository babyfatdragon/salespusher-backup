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
			controller: ['$rootScope','$scope','$location','ModalService','Company', function($rootScope,$scope,$location,ModalService,Company){
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
									$scope.company.$save().then(function(company){
										//$location.path("/customer_management/company");
										$rootScope.$broadcast('COMPANY_CREATED',{company:company});
									});
								} else if($scope.action==="Update"){
									$scope.company.$update().then(function(company){
										//$location.path("/customer_management/company");
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