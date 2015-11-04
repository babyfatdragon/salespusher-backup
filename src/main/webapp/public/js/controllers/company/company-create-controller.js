(function(){
	angular.module('salespusher.controllers').controller('CompanyCreateCtrl',['$scope','Company',function($scope,Company){
		$scope.company = new Company();
	}]);
})();