(function(){
	angular.module('salespusher.controllers')
	.controller('CustomerShowCtrl',['$scope','$stateParams','Company','Customer',function($scope,$stateParams,Company,Customer){		
		Customer.get({id:$stateParams.id}).$promise.then(function(customer){
			Company.get({id:$stateParams.id}).$promise.then(function(company){
				customer.companyName = company.name;
			});
			$scope.customer = customer;
		});
	}]);
})();