(function(){
	angular.module('salespusher.directives')
	.directive('spExpenseClaimForm',[function(){
		return{
			restrict: 'E',
			scope: {
				deal: '=',
				expenseClaim: '=',
				action: '='
			},
			templateUrl: 'templates/directives/sp-expense-claim-form.html',
			controller: ['$rootScope','$scope','$state','$timeout','DealFollower','DealServiceEvent','DealExpenseClaim',
			             function($rootScope,$scope,$state,$timeout,DealFollower,DealServiceEvent,DealExpenseClaim){
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
					if($scope.action==='Create'){
						console.log("create expense");
						DealExpenseClaim.save($scope.expenseClaim);
					} else if($scope.action==='Update'){
						console.log("update expense");
						DealExpenseClaim.update({id:$scope.expenseClaim.id},$scope.expenseClaim);
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
					$state.reload();
				}
				$scope.remove = function(){
					DealExpenseClaim.remove({dealId:$scope.deal.id,id:$scope.expenseClaim.id}).$promise.then(function(){
						$state.reload();
					});		
				};
				
				$scope.cancel = function(){
					$rootScope.$broadcast('EXPENSE_CLAIM_FORM_CANCELED');	
				};
			}]
		};
	}]);
})();