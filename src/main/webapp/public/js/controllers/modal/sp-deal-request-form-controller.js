(function(){
	angular.module('salespusher.controllers').controller('DealRequestFormCtrl',['$rootScope','$scope','$timeout','User','DealServiceEvent','DealRequestByDealId',
		'header','deal','dealRequest','dealRequestAction','usage',
     function($rootScope,$scope,$timeout,User,DealServiceEvent,DealRequestByDealId,header,deal,dealRequest,dealRequestAction,usage){
     	$scope.header = header;
     	$scope.deal = deal;
     	$scope.dealRequest = {};
     	angular.copy(dealRequest,$scope.dealRequest);
     	$scope.dealRequestAction = dealRequestAction;
     	$scope.usage = usage;
		$scope.typeOptions = [{name:"APPLICATION APPROVAL"},{name:"DISCOUNT OFFER"}];
		$scope.users = new Array();				
		User.query().$promise.then(function(users){
			$scope.users = users;
		});
		$scope.submit = function(){
			$scope.dealRequest.dealId = $scope.deal.id;
			$scope.dealRequest.userId = $rootScope.currentUser.id;
			if($scope.dealRequestAction==='Create'){
				DealRequestByDealId.save($scope.dealRequest).$promise.then(function(dealRequest){
					$rootScope.$broadcast('DEAL_REQUEST_CREATED',{newRequest:dealRequest});
				});
			} 
			else if($scope.dealRequestAction==='Update'){
				DealRequestByDealId.update({id:$scope.dealRequest.id},$scope.dealRequest).$promise.then(function(dealRequest){
					$rootScope.$broadcast('DEAL_REQUEST_UPDATED',{updatedRequest:dealRequest});
				});
			}
		}
		$scope.deleteDealRequest = function(){
			DealRequestByDealId.remove({dealId:$scope.deal.id,id:$scope.dealRequest.id}).$promise.then(function(){
			});		
		};
		
		$scope.cancelDealRequest = function(){
		};
	}]);
})();