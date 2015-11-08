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
			controller: ['$rootScope','$scope','DealComment', function($rootScope,$scope,DealComment){
				$scope.submit = function(){
					$scope.comment.dealId = $scope.deal.id;
					$scope.comment.userId = $rootScope.currentUser.id;
					console.log($scope.comment);
					$scope.comment.$save().then(function(){
						$scope.comment = new DealComment();
						$rootScope.$broadcast('COMMENTS_UPDATED');
					});
				};
			}]
		};
	}]);
})();