(function(){
	angular.module('salespusher.controllers')
	.controller('CompanyManagementCtrl',['$scope','Company',function($scope,Company){
		Company.query().$promise.then(function(companies){
			$scope.companies = companies;
    	    $scope.displayCompanies = [].concat(companies);
		});
    	$scope.itemsByPage = 10;
	}]);
})();