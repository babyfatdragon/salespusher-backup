(function(){
	angular.module('salespusher.controllers')
	.controller('HomeCtrl',['$rootScope','$scope','$timeout',"$http",'Product','Company','Customer','Deal','DealEvent','FollowingDeal',
	                        function($rootScope,$scope,$timeout,$http,Product,Company,Customer,Deal,DealEvent,FollowingDeal){
		$http.get('/resource/').success(function(data){
			$scope.greeting = data;
		});
		$scope.ownDeals = [];
		$scope.otherDeals = [];
		
		/** set a delay for getting $rootScope.currentUser **/
		$timeout(function(){
			FollowingDeal.query({userId:$rootScope.currentUser.id}).$promise.then(function(followingDeals){
				followingDeals.forEach(function(followingDeal){
					Deal.get({id:followingDeal.dealId}).$promise.then(function(deal){
						followingDeal.productId = deal.productId;
						followingDeal.quantity = deal.quantity;
						followingDeal.totalPrice = deal.totalPrice;
						followingDeal.customerId = deal.customerId;
						followingDeal.companyId = deal.companyId;
						followingDeal.dealStatus = deal.dealStatus;
						Product.get({id:deal.productId}).$promise.then(function(product){
							followingDeal.productName = product.name;
							Company.get({id:deal.companyId}).$promise.then(function(company){
								followingDeal.companyName = company.name;
								Customer.get({id:deal.customerId}).$promise.then(function(customer){
									followingDeal.customerName = customer.name;
									if(followingDeal.isOwner){
										$scope.ownDeals.push(followingDeal);
									} else if(!followingDeal.isOwner){
										$scope.otherDeals.push(followingDeal);
									}
								});
							});
						});
					});	
				});
			});
		},200);
		
		$scope.eventSources = [];


	}]);
})();
