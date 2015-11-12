(function(){
	angular.module('salespusher.directives')
	.directive('spEventForm',[function(){
		return{
			restrict: 'E',
			scope: {
				deal: '=',
				event: '=',
				action: '=',
				eventType: "@"
			},
			templateUrl: 'templates/directives/sp-event-form.html',
			controller: ['$rootScope','$scope','$state','$timeout','Company','DealEvent','DealFollower','User','DealServiceEvent',
			             function($rootScope,$scope,$state,$timeout,Company,DealEvent,DealFollower,User,DealServiceEvent){
				User.query().$promise.then(function(users){
					$scope.users = users;
				});
				$scope.event.startDate = new Date();
				$scope.event.startTime = new Date();
				$scope.event.endDate = new Date();
				$scope.event.endTime = new Date();
				$scope.startDateStatus = {
					opened: false
				};
				$scope.endDateStatus = {
						opened: false
				};
				$scope.openStart = function($event) {
					$scope.startDateStatus.opened = true;
				};
				$scope.openEnd = function($event) {
					$scope.endDateStatus.opened = true;
				};
				$scope.hstep = 1;
				$scope.mstep = 15;

				$scope.options = {
					hstep: [1, 2, 3],
					mstep: [1, 5, 10, 15, 25, 30]
				};
				
				$timeout(function(){
					Company.get({id:$scope.deal.companyId}).$promise.then(function(company){
						/** set default event location to company's address **/
						$scope.event.location = company.address;
					});	
				},700);
				
				
				$scope.ismeridian = true;
				
				$scope.submit = function(){
					$scope.event.start = new Date(new Date($scope.event.startDate).getFullYear(),
							new Date($scope.event.startDate).getMonth(),
							new Date($scope.event.startDate).getDate(),
							new Date($scope.event.startTime).getHours(),
							new Date($scope.event.startTime).getMinutes());
					$scope.event.end = new Date(new Date($scope.event.endDate).getFullYear(),
							new Date($scope.event.endDate).getMonth(),
							new Date($scope.event.endDate).getDate(),
							new Date($scope.event.endTime).getHours(),
							new Date($scope.event.endTime).getMinutes());
					$scope.event.dealId = $scope.deal.id;
					if($scope.eventType==='Event'){
						if($scope.action==='Create'){
							DealEvent.save($scope.event);
						} else if($scope.action==='Update'){
							console.log("EVENT UPDATE");
							DealEvent.update({id:$scope.event.id},$scope.event);
						}	
					} else if($scope.eventType==='Service'){
						if($scope.action==='Create'){
							DealServiceEvent.save($scope.event);
						} else if($scope.action==='Update'){
							console.log("SERVICE EVENT UPDATE");
							DealServiceEvent.update({id:$scope.event.id},$scope.event);
						}
					}

					/** update unread flags for other followers **/
					DealFollower.query({dealId:$scope.deal.id}).$promise.then(function(followers){
						for(var i=0;i<followers.length;i++){
							if(followers[i].userId==$scope.event.userId){	
								//self, do nothing
							}
							else{
								followers[i].unreadEvents+=1;
								followers[i].$update();
							}
						}
					});
					$state.reload();
				}
				$scope.remove = function(){
					if($scope.eventType==='Event'){
						DealEvent.remove({dealId:$scope.deal.id,id:$scope.event.id}).$promise.then(function(){
							$state.reload();
						});		
					} else if($scope.eventType==='Service'){
						DealServiceEvent.remove({dealId:$scope.deal.id,id:$scope.event.id}).$promise.then(function(){
							$state.reload();
						});	
					}
				};
				
				$scope.cancel = function(){
					if($scope.eventType==='Event'){
						$rootScope.$broadcast('FORM_CANCELED');
					} else if($scope.eventType==='Service'){
						$rootScope.$broadcast('SERVICE_FORM_CANCELED');
					}
				};
			
			}]
		};
	}]);
})();