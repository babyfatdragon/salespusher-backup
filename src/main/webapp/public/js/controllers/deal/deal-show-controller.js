(function(){
	angular.module('salespusher.controllers')
	.controller('DealShowCtrl',['$rootScope','$scope','$stateParams','User','Product','Company','Customer','Deal','DealComment',
	                            function($rootScope,$scope,$stateParams,User,Product,Company,Customer,Deal,DealComment){		
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
							/** retrieve comments **/
							DealComment.query({dealId:$stateParams.id}).$promise.then(function(comments){
								for(var i=0;i<comments.length;i++){
									var user = $scope.getObjectById($scope.users,comments[i].userId);
									comments[i].userName = user.firstname+" "+user.lastname;
								}
								$scope.comments = comments;
								/* pagination */
								$scope.totalItems = $scope.comments.length;
								$scope.currentPage = 1;
								$scope.pageCapacity = 5;
								$scope.noOfPages = Math.ceil($scope.totalItems / $scope.pageCapacity);
								
							});
						});
					});
				});
			});
		});

		$scope.comment = new DealComment();


		
		$scope.$on('COMMENTS_UPDATED',function(events,args){
			/** retrieve comments **/
			DealComment.query({dealId:$stateParams.id}).$promise.then(function(comments){
				for(var i=0;i<comments.length;i++){
					var user = $scope.getObjectById($scope.users,comments[i].userId);
					comments[i].userName = user.firstname+" "+user.lastname;
				}
				$scope.comments = comments;
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