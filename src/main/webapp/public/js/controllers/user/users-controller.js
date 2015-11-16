(function(){
	angular.module('salespusher.controllers')
	.controller('UsersCtrl',['$rootScope','$scope','User',function($rootScope, $scope,User){
		User.query().$promise.then(function(users){
			$scope.users = users;
			$scope.displayUsers = users;
		});
		$scope.itemsByPage = 10;
	}]);
})();
