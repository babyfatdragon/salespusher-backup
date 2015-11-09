(function(){
	angular.module('salespusher.directives')
	.directive('spEventForm',[function(){
		return{
			restrict: 'E',
			scope: {
				deal: '=',
				event: '=',
				action: '=',
			},
			templateUrl: 'templates/directives/sp-event-form.html',
			controller: ['$rootScope','$scope','$state','DealEvent','DealFollower',function($rootScope,$scope,$state,DealEvent,DealFollower){
			    
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
					if($scope.action==='Create'){
						DealEvent.save($scope.event);
					} else if($scope.action==='Update'){
						DealEvent.update({id:$scope.event.id},$scope.event);
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
					DealEvent.remove({dealId:$scope.deal.id,id:$scope.event.id}).$promise.then(function(){
						$state.reload();
					});
				};
				
				$scope.cancel = function(){
					$rootScope.$broadcast('FORM_CANCELED');
					console.log($scope.showForm);
				}
			
			}]
		};
	}]);
})();