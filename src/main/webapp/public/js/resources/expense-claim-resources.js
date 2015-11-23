(function(){
	angular.module('salespusher.resources').factory('DealExpenseClaim', ['$resource',function DealExpenseClaimFactory($resource) {  
		return $resource("/expenseClaimsByDeal/:dealId/expenseClaims/:id", {dealId:'@dealId',id:'@id'}, {
			'update': {method:'PUT'}
		});
	}]);
	angular.module('salespusher.resources').factory('UserExpenseClaim', ['$resource',function UserExpenseClaimFactory($resource) {  
		return $resource("/expenseClaimsByUser/:userId/expenseClaims/:id", {userId:'@userId',id:'@id'}, {
			'update': {method:'PUT'}
		});
	}]);

	angular.module('salespusher.resources').factory('MonthlyUserExpenseClaim', ['$resource',function MonthlyUserExpenseClaimFactory($resource) {  
		return $resource("/monthlyExpenseClaimsByUser/:userId/year/:year/month/:month/expenseClaims/:id", {userId:'@userId',year:'@year',month:'@month',id:'@id'}, {
			'update': {method:'PUT'}
		});
	}]);
})();