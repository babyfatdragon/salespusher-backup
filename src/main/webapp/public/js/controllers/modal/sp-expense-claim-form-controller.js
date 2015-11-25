(function(){
	angular.module('salespusher.controllers').controller('ExpenseClaimFormCtrl',['$rootScope','$scope','$timeout','DealFollower','DealServiceEvent','DealExpenseClaim',
		'header','deal','expenseClaim','expenseClaimAction',
 	function($rootScope,$scope,$timeout,DealFollower,DealServiceEvent,DealExpenseClaim,header,deal,expenseClaim,expenseClaimAction){
		$scope.header = header;
		$scope.deal = deal;
		$scope.expenseClaim = {};
		angular.copy(expenseClaim,$scope.expenseClaim);
		$scope.expenseClaimAction = expenseClaimAction;
		$scope.expenseClaim.dateIncurred = new Date();
		$scope.dateIncurredStatus = {
			opened: false
		};
		$scope.openDateIncurred = function($event) {
			$scope.dateIncurredStatus.opened = true;
		};
						
		$scope.submit = function(){
			$scope.expenseClaim.dealId = $scope.deal.id;
			$scope.expenseClaim.userId = $rootScope.currentUser.id;
			if($scope.expenseClaimAction==='Create'){
				DealExpenseClaim.save($scope.expenseClaim).$promise.then(function(expenseClaim){
					$rootScope.$broadcast('EXPENSE_CLAIM_CREATED',{newExpenseClaim:expenseClaim});
				});
			} else if($scope.expenseClaimAction==='Update'){
				DealExpenseClaim.update({id:$scope.expenseClaim.id},$scope.expenseClaim).$promise.then(function(expenseClaim){
					$rootScope.$broadcast('EXPENSE_CLAIM_UPDATED',{updatedExpenseClaim:expenseClaim});
				});
			}
			/** update unread flags for other followers **/
			DealFollower.query({dealId:$scope.deal.id}).$promise.then(function(followers){
				for(var i=0;i<followers.length;i++){
					if(followers[i].userId==$scope.expenseClaim.userId){
						//self, do nothing
					}
					else{
						followers[i].unreadExpenseClaims+=1;
						followers[i].$update();
					}
				}
			});
		}
		$scope.remove = function(){
			DealExpenseClaim.remove({dealId:$scope.deal.id,id:$scope.expenseClaim.id}).$promise.then(function(){
			});		
		};
		
		$scope.cancel = function(){
		};
	}]);
})();
