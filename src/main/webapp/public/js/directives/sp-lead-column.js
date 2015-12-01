(function(){
	angular.module('salespusher.directives')
	.directive('spLeadColumn',[function(){
		return{
			restrict: 'E',
	        // replace : true,
			scope: {
				lead: '=',
				type: '=',
				header: '@',
				leadLimitTo: '=',
				leads: '=',
				products: '=',
				customers: '=',
				companies: '=',
				deals: '=',
			},
			templateUrl: 'templates/directives/sp-lead-column.html',
			controller: ['$rootScope','$scope','$state','filterFilter','ModalService','LeadByUser', function($rootScope,$scope,$state,filterFilter,ModalService,LeadByUser){
				$scope.leadLimitTo = 5;
				$scope.loadMoreLeads = function(){
					$scope.leadLimitTo+=5;
				};

		    	$scope.editLead = function(lead){
		    		$scope.leadAction = "Update";
		    		$scope.lead = lead;
		    		$scope.lead.customer = {};
		    		$scope.lead.customer.name = $scope.lead.name;
		    		$scope.lead.customer.id = $scope.lead.customerId;
					$scope.lead.customer.telephone = $scope.lead.telephone;
					$scope.lead.customer.email = $scope.lead.email;
					$scope.lead.customer.companyId = $scope.lead.companyId;
		    		$scope.lead.company = {};
		    		$scope.lead.company.name = $scope.lead.companyName;
		    		$scope.lead.company.id = $scope.lead.companyId;

					ModalService.showModal({
				    	templateUrl: "templates/directives/sp-lead-form.html",
				    	controller: "LeadFormCtrl",
				    	inputs: {
				    		header: 'Edit Lead',
						 	lead: $scope.lead,
						 	leadAction: $scope.leadAction,
						 	products: $scope.products,
						 	customers: $scope.customers,
						 	companies: $scope.companies
				    	}
				    })
					.then(function(modal) {
						modal.element.modal();
						modal.close.then(function(result) {
						});
			    	});	
		    	};

		    	$scope.contact = function(lead){
		    		$scope.lead = lead;
					ModalService.showModal({
				    	templateUrl: "templates/directives/sp-lead-contact.html",
				    	controller: "LeadContactCtrl",
				    	inputs: {
				    		header: 'Contact History',
						 	lead: $scope.lead
				    	}
				    })
					.then(function(modal) {
						modal.element.modal();
						modal.close.then(function(result) {
						});
			    	});	
		    	};

		    	$scope.qualify = function(lead){
		    		$scope.lead = lead;
					ModalService.showModal({
				    	templateUrl: "templates/directives/sp-lead-qualify.html",
				    	controller: "LeadQualifyCtrl",
				    	inputs: {
				    		header: 'Lead Qualify',
						 	lead: $scope.lead
				    	}
				    })
					.then(function(modal) {
						modal.element.modal();
						modal.close.then(function(result) {
						});
			    	});	
		    	};
		    	$scope.analysis = function(lead){
		    		$scope.lead = lead;
					ModalService.showModal({
				    	templateUrl: "templates/directives/sp-lead-analysis.html",
				    	controller: "LeadAnalysisCtrl",
				    	inputs: {
				    		header: 'Lead Analysis',
						 	lead: $scope.lead,
						 	products: $scope.products,
						 	deals: $scope.deals
				    	}
				    })
					.then(function(modal) {
						modal.element.modal();
						modal.close.then(function(result) {
						});
			    	});	
		    	};

    			$scope.$watch('searchLeads', function (newVal, oldVal) {
					$scope.filtered = filterFilter($scope.leads, newVal);
				}, true);	
			}]
		};
	}]);
})();