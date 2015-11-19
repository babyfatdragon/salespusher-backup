(function(){
	angular.module('salespusher.controllers')
	.controller('DealManagementCtrl',['$scope','Product','Customer',function($scope,Product,Customer){
		Product.query().$promise.then(function(products){
			$scope.products = products;
		});
		
		Customer.query().$promise.then(function(customers){
			$scope.customers = customers;
		});
	}]);
})();