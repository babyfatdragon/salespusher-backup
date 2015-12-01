(function(){
	angular.module('salespusher.controllers').controller('LeadQualifyCtrl',['$rootScope','$scope','$state','LeadByUser','LeadContact','Company','Customer',
		'header','lead',
	function($rootScope,$scope,$state,LeadByUser,LeadContact,Company,Customer,header,lead){
		$scope.header = header;
		$scope.lead = lead;
		
		$scope.companies = new Array();
		$scope.company = new Company();
		$scope.company.name = $scope.lead.companyName;
		if($scope.lead.companyId!=0){
			$scope.company.id = $scope.lead.companyId;
			Company.get({id:$scope.company.id}).$promise.then(function(company){
				$scope.companies.push(company);
			});
		} else{
			delete $scope.company.id;
		}
		$scope.customer = new Customer();
		$scope.customer.name = $scope.lead.name;
		if($scope.lead.customerId!=0){
			$scope.customer.id = $scope.lead.customerId;
		} else{
			delete $scope.customer.id;
		}
		$scope.customer.telephone = $scope.lead.telephone;
		$scope.customer.email = $scope.lead.email;
		$scope.$on('COMPANY_CREATED',function(event,args){
			$scope.lead.companyId = args.company.id;
			$scope.companies.push(args.company);
			$scope.lead.$update();
		});
		$scope.$on('CUSTOMER_CREATED',function(event,args){
			$scope.lead.customerId = args.customer.id;
			$scope.lead.telephone = args.customer.telephone;
			$scope.lead.email = args.customer.email;
			$scope.lead.leadStatus = "QUALIFIED";
			$scope.lead.$update().then(function(){
				$rootScope.$broadcast("LEADS_UPDATED");
			});
		});

		$scope.save = function(){
			$scope.lead.leadStatus = "QUALIFIED";
			$scope.lead.$update().then(function(){
				$rootScope.$broadcast("LEADS_UPDATED");
			});
		};

		$scope.cancel = function(){
		};

	}]);
})();
