(function(){
	angular.module('salespusher.directives')
	.directive('spDealRequestForm',[function(){
		return{
			restrict: 'E',
			scope: {
				deal: '=',
				dealRequest: '=',
				action: '=',
				usage: '='
			},
			templateUrl: 'templates/directives/sp-deal-request-form.html',
			controller: ['$rootScope','$scope','$state','$timeout','User','DealServiceEvent','DealRequestByDealId',
			             function($rootScope,$scope,$state,$timeout,User,DealServiceEvent,DealRequestByDealId){
				$scope.typeOptions = [{name:"APPLICATION APPROVAL"},{name:"DISCOUNT OFFER"}];
//				if($rootScope.currentUser.id===deal.userId){
//					usage = "Request";
//				}
//				else if($rootScope.currentUser.id===dealRequest.requesteeId){
//					usage = "Response";
//				}
				$scope.users = new Array();				
				User.query().$promise.then(function(users){
					$scope.users = users;
				});
				$scope.submit = function(){
					$scope.dealRequest.dealId = $scope.deal.id;
					$scope.dealRequest.userId = $rootScope.currentUser.id;
					if($scope.action==='Create'){
						console.log("create request");
						DealRequestByDealId.save($scope.dealRequest);
					} else if($scope.action==='Update'){
						console.log("update request");
						DealRequestByDealId.update({id:$scope.dealRequest.id},$scope.dealRequest);
					}
					$rootScope.$broadcast('DEAL_REQUEST_FORM_CANCELED');
					$state.reload();
				}
				$scope.deleteDealRequest = function(){
					DealRequestByDealId.remove({dealId:$scope.deal.id,id:$scope.dealRequest.id}).$promise.then(function(){
						$state.reload();
					});		
				};
				
				$scope.cancelDealRequest = function(){
					$rootScope.$broadcast('DEAL_REQUEST_FORM_CANCELED');	
				};
			}]
		};
	}]);
})();