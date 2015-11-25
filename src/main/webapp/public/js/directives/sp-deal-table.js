(function(){
	angular.module('salespusher.directives')
	.directive('spDealTable', [function(){
		return {
			strict: 'E',
			scope: {
				deals: '=',
				displayDeals: '=',
				companies: '=',
				customers: '=',
				users: '=',
				products: '=',
				itemsByPage: '=',
			},
			templateUrl: '/templates/directives/sp-deal-table.html',
			controller: ['$rootScope','$scope','ModalService','User','Product','Company','Customer','Deal',function($rootScope,$scope,ModalService,User,Product,Company,Customer,Deal){
				$scope.deals = new Array();
				$scope.displayDeals = new Array();
				User.query().$promise.then(function(users){
					$scope.users = users;
					Product.query().$promise.then(function(products){
						$scope.products = products;
						Company.query().$promise.then(function(companies){
							$scope.companies = companies;
							Customer.query().$promise.then(function(customers){
								$scope.customers = customers;
								Deal.query().$promise.then(function(deals){
									for(var i=0;i<deals.length;i++){
										var product = $scope.getObjectById($scope.products,deals[i].productId);
										deals[i].productName = product.name;
										var customer = $scope.getObjectById($scope.customers,deals[i].customerId);
										deals[i].customerName = customer.name;
										var company = $scope.getObjectById($scope.companies,customer.companyId);
										deals[i].companyName = company.name;
										var user = $scope.getObjectById($scope.users,deals[i].userId);
										deals[i].userName = user.firstname+" "+user.lastname;
									}
									$scope.deals = deals;
									$scope.displayDeals = [].concat(deals);
								});
							});
						});
					});
				});
				
				$scope.$watch('deals',function(){
					$scope.filteredTotalAmount = 0;
					$scope.deals.forEach(function(deal){
						$scope.filteredTotalAmount+=deal.totalPrice;
					});
				});

		    	$scope.itemsByPage = 10;
		    	$scope.add = function(){
		    		$scope.dealAction = "Create";
		    		$scope.deal = {};
					ModalService.showModal({
				    	templateUrl: "templates/directives/sp-deal-form.html",
				    	controller: "DealFormCtrl",
				    	inputs: {
				    		header: 'Edit Deal',
						 	deal: $scope.deal,
						 	dealAction: $scope.dealAction,
						 	products: $scope.products,
						 	customers: $scope.customers
				    	}
				    })
					.then(function(modal) {
						modal.element.modal();
						modal.close.then(function(result) {
						});
			    	});	
		    	}
		    	$scope.edit = function(deal){
		    		$scope.disableAdd = true;
		    		$scope.dealAction = "Update";
					ModalService.showModal({
				    	templateUrl: "templates/directives/sp-deal-form.html",
				    	controller: "DealFormCtrl",
				    	inputs: {
				    		header: 'Edit Deal',
						 	deal: deal,
						 	dealAction: $scope.dealAction,
						 	products: $scope.products,
						 	customers: $scope.customers
				    	}
				    })
					.then(function(modal) {
						modal.element.modal();
						modal.close.then(function(result) {
						});
			    	});	
		    	}
		    	
				$scope.$on('DEALS_UPDATED',function(events,args){
					Deal.query().$promise.then(function(deals){
						for(var i=0;i<deals.length;i++){
							var product = $scope.getObjectById($scope.products,deals[i].productId);
							deals[i].productName = product.name;
							var customer = $scope.getObjectById($scope.customers,deals[i].customerId);
							deals[i].customerName = customer.name;
							var company = $scope.getObjectById($scope.companies,customer.companyId);
							deals[i].companyName = company.name;
							var user = $scope.getObjectById($scope.users,deals[i].userId);
							deals[i].userName = user.firstname+" "+user.lastname;
						}
						$scope.deals = deals;
						$scope.displayDeals = [].concat(deals);
					});
				});
				
				$scope.$on('UPDATE_CANCELED',function(events,args){
					$scope.disableAdd = false;
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
			}]
		}
	}]);
})();