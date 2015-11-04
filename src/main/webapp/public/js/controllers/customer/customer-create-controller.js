(function(){
	angular.module('salespusher.controllers').controller('CustomerCreateCtrl',['$scope','Company','Customer',function($scope,Company,Customer){
		$scope.companies = Company.query();
		$scope.customer = new Customer();
	}]);
})();