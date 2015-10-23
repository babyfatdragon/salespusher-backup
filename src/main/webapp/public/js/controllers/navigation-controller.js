(function(){
	angular.module('salespusher.controllers').controller('NavigationCtrl',['$rootScope','$scope','$http','$location', function($rootScope, $scope, $http, $location) {
		/*Set active class for clicked panel*/
		this.tab = 1;
		
		this.isSelected = function(checkTab){
			return this.tab === checkTab;
		}
		this.selectTab = function(setTab){
			this.tab = setTab;
		}
				
		/*authentication, login & logut*/
		var authenticate = function(credentials, callback) {
			var headers = credentials ? {authorization : "Basic " + btoa(credentials.username + ":" + credentials.password)} : {};
			$http.get('user', {headers : headers}).success(function(data) {
			if (data.name) {
				$rootScope.authenticated = true;
			} else {
				$rootScope.authenticated = false;
			}
			callback && callback();
			})
			.error(function() {
				$rootScope.authenticated = false;
				callback && callback();
			});
		}
	    authenticate();
	    $scope.credentials = {};
	    $scope.login = function() {
	    	authenticate($scope.credentials, function() {
	        if ($rootScope.authenticated) {
	        	/* set $rootScope authority */
	        	$http.get('/user', {}).success(function(data){
	        		$rootScope.authority = data.authorities[0].authority;
	        	});

	        	console.log("login succeeded");
	        	$location.path("/");
	        	$scope.error = false;
	        } else {
	        	console.log("login failed");
	        	$location.path("/login");
	        	$scope.error = true;
	        }
	    	});
	    };
	    $scope.logout = function() {
	    	$http.post('logout', {}).success(function() {
	    		console.log("logout succeeded");
	    		$rootScope.authenticated = false;
	    		$location.path("/");
	    	})
	    	.error(function(data) {
	    		console.log("logout failed");
	    		$rootScope.authenticated = false;
	    	});
	    }
	}]);
})();
