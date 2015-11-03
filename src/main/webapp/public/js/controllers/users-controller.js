(function(){
	angular.module('salespusher.controllers').controller('UsersCtrl',['$rootScope','$scope','$http','User', function($rootScope, $scope, $http, User){

		$scope.users = User.query();
		
		$scope.getCurrentUser = function(){
			$http.get('/user').success(function(data){
				console.log("Current user information:");
				var str = JSON.stringify(data, null, 2);
				console.log(str);
			}).error(function(){
				
			});
		}
	}]);
})();
