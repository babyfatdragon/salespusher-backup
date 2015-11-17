(function(){
	angular.module('salespusher.controllers')
	.controller('CompanyShowCtrl',['$scope','$stateParams','User','Product','Company','CompanyDeal',function($scope,$stateParams,User,Product,Company,CompanyDeal){		
		$scope.deals = new Array();
		$scope.displayDeals = new Array();
		User.query().$promise.then(function(users){
			$scope.users = users;
			Product.query().$promise.then(function(products){
				$scope.products = products;
				Company.get({id:$stateParams.id}).$promise.then(function(company){
					$scope.company = company;
					CompanyDeal.query({companyId:company.id}).$promise.then(function(deals){
						for(var i=0;i<deals.length;i++){
							var product = $scope.getObjectById($scope.products,deals[i].productId);
							deals[i].productName = product.name;
							var user = $scope.getObjectById($scope.users,deals[i].userId);
							deals[i].userName = user.firstname+" "+user.lastname;
						}
						$scope.deals = deals;
						$scope.displayDeals = [].concat(deals);
					});
				});
			});
		});
		
		$scope.$watch('deals',function(){
			$scope.filteredTotalAmount = 0;
			$scope.deals.forEach(function(deal){
				$scope.filteredTotalAmount+=deal.totalPrice;
			});
			console.log($scope.filteredTotalAmount);
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
	}]);
})();