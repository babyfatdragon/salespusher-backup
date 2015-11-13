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
})();