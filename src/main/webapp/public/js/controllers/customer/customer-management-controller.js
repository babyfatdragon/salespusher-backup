(function(){
	angular.module('salespusher.controllers')
	.controller('CustomerManagementCtrl',['$scope','Company','Customer',function($scope,Company,Customer){
		Company.query().$promise.then(function(companies){
			$scope.companies = companies;
			Customer.query().$promise.then(function(customers){
				for(var i=0;i<customers.length;i++){
					var company = $scope.getObjectById($scope.companies,customers[i].companyId);
					customers[i].companyName = company.name;
				}
				$scope.customers = customers;
	    	    $scope.displayCustomers = [].concat(customers);
			});
		});

    	$scope.itemsByPage = 10;
    	
		$scope.getObjectById = function(models,id){
    		if(models.length){
        		var result = $.grep(models, function(element){
        			return element.id === id; 
    			});
        		if(result.length){
            		return result[0];
        		}
    		}
		}
	}]);
})();