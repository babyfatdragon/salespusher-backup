(function(){
	angular.module('salespusher.controllers')
	.controller('UsersCtrl',['$rootScope','$scope','User','MonthlyDeal','YearlyDeal', function($rootScope, $scope,User,MonthlyDeal,YearlyDeal){
		User.query().$promise.then(function(users){
			users.forEach(function(user){
				YearlyDeal.query({year:new Date().getFullYear(),userId:user.id}).$promise.then(function(yearlyDeals){
					user.yearlyAmount = 0;
					yearlyDeals.forEach(function(deal){
						if(deal.dealStatus==="WON"){
							user.yearlyAmount+=deal.totalPrice;
						}
					});
				});
				MonthlyDeal.query({year:new Date().getFullYear(),month:new Date().getMonth(),userId:user.id}).$promise.then(function(monthlyDeals){
					user.monthlyAmount = 0;
					monthlyDeals.forEach(function(deal){
						if(deal.dealStatus==="WON"){
							user.monthlyAmount+=deal.totalPrice;
						}
					});
				});	
			});
			$scope.users = users;
			$scope.displayUsers = users;
			
			
		});
		$scope.itemsByPage = 10;
	}]);
})();
