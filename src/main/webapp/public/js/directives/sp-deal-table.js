(function(){
	angular.module('salespusher.directives')
	.directive('spDealTable', [function(){
		return {
			strict: 'E',
			scope: {
				deals: '=',
				displayDeals: '=',
				itemsByPage: '=',
			},
			templateUrl: '/templates/directives/sp-deal-table.html',
			controller: ['$rootScope','$scope','Deal',function($rootScope,$scope,Deal){
				Deal.query().$promise.then(function(deals){
					for(var i=0;i<deals.length;i++){
						
					}
					$scope.deals = deals;
					$scope.displayDeals = [].concat(deals);
				});
		    	$scope.itemsByPage = 10;
		    	$scope.add = function(){
		    		$rootScope.$broadcast('SHOW_DEAL_FORM');
		    		console.log("show");
		    	}
			}]
		}
	}]);
})();