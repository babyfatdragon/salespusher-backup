(function(){
	angular.module('salespusher.controllers')
	.controller('DealShowCtrl',['$scope','$stateParams','User','Product','Company','Customer','Deal',function($scope,$stateParams,User,Product,Company,Customer,Deal){		
		User.query().$promise.then(function(users){
			$scope.users = users;
			Product.query().$promise.then(function(products){
				$scope.products = products;
				Company.query().$promise.then(function(companies){
					$scope.companies = companies;
					Customer.query().$promise.then(function(customers){
						$scope.customers = customers;
						Deal.get({id:$stateParams.id}).$promise.then(function(deal){
							
								var product = $scope.getObjectById($scope.products,deal.productId);
								deal.productName = product.name;
								var customer = $scope.getObjectById($scope.customers,deal.customerId);
								deal.customerName = customer.name;
								var company = $scope.getObjectById($scope.companies,customer.companyId);
								deal.companyName = company.name;
								var user = $scope.getObjectById($scope.users,deal.userId);
								deal.userName = user.firstname+" "+user.lastname;
							
							$scope.deal = deal;
						});
					});
				});
			});
		});
		
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
		$scope.getUserByUsername = function(username){
    		if($scope.users.length){
        		var result = $.grep($scope.users, function(element){
        			return element.username === usernmae; 
    			});
        		if(result.length){
            		return result[0];
        		}
    		}
		}
	}]);
})();