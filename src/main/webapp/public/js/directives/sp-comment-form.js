(function(){
	angular.module('salespusher.directives')
	.directive('spCommentForm',[function(){
		return{
			restrict: 'E',
			scope: {
				comment: '=',
				deal: '=',
			},
			templateUrl: 'templates/directives/sp-comment-form.html',
			controller: ['$rootScope','$scope','DealComment','DealFollower', function($rootScope,$scope,DealComment,DealFollower){
				$scope.submit = function(){
					$scope.comment.dealId = $scope.deal.id;
					$scope.comment.userId = $rootScope.currentUser.id;
					$scope.comment.$save().then(function(comment){
						/** update unread flags for other followers **/
						DealFollower.query({dealId:$scope.deal.id}).$promise.then(function(followers){
							for(var i=0;i<followers.length;i++){
								if(followers[i].userId==comment.userId){
									//self, do nothing
								}
								else{
									followers[i].unreadComments+=1;
									followers[i].$update();
								}
							}
						});
						$scope.comment = new DealComment();
						$rootScope.$broadcast('COMMENTS_UPDATED');
					});
				};
			}]
		};
	}]);
})();