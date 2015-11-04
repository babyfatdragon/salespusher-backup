(function(){
	angular.module('salespusher.controllers')
	.controller('CustomerUpdateCtrl',['$scope','$stateParams','Company','Customer', function($scope,$stateParams,Company,Customer){
		$scope.companies = Company.query();
		$scope.customer = Customer.get({id:$stateParams.id});
	}]);
})();