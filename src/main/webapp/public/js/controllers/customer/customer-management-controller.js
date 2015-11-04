(function(){
	angular.module('salespusher.controllers')
	.controller('CustomerManagementCtrl',['$scope','Company','Customer',function($scope,Company,Customer){
		Company.query().$promise.then(function(companies){
			$scope.companies = companies;
			Customer.query().$promise.then(function(customers){
				for(var i=0;i<customers.length;i++){
					customers[i].companyName = $scope.getCompanyName(customers[i].companyId);
				}
				$scope.customers = customers;
	    	    $scope.displayCustomers = [].concat(customers);
			});
		});

    	$scope.itemsByPage = 10;
    	
    	$scope.getCompanyName = function(id){
    		if($scope.companies.length){
        		var result = $.grep($scope.companies, function(element){
        			return element.id === id; 
    			});
        		if(result.length){
            		return result[0].name;
        		}
    		}
    	};
	}]);
})();