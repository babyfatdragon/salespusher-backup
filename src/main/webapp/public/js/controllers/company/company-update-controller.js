(function(){
	angular.module('salespusher.controllers')
	.controller('CompanyUpdateCtrl',['$scope','$stateParams','Company', function($scope,$stateParams,Company){
		$scope.company = Company.get({id:$stateParams.id});
	}]);
})();