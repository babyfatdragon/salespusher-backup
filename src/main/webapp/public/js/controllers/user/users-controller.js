(function(){
	angular.module('salespusher.controllers')
	.controller('UsersCtrl',['$rootScope','$scope','User','Company',function($rootScope, $scope,User,Company){
		User.query().$promise.then(function(users){
			$scope.users = users;
			$scope.displayUsers = users;
		});
		$scope.itemsByPage = 10;
	}]);
})();
