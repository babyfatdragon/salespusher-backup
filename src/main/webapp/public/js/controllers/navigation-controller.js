(function(){
	angular.module('salespusher.controllers').controller('NavigationCtrl',['$rootScope','$scope','$http','$location','User', function($rootScope, $scope, $http, $location,User) {				
		/*authentication, login & logut*/
		var authenticate = function(callback) {
			$http.get('user').success(function(data) {
				if (data.name) {
					$rootScope.authenticated = true;
		        	/* set $rootScope authority */
					$http.get('/user', {}).success(function(user){
		        		$rootScope.authority = user.authorities[0].authority;
		        		User.get({username:user.name}).$promise.then(function(currentUser){
		        			$rootScope.currentUser =currentUser;
		        			console.log($rootScope.currentUser);
		        		});
		        	});
				} else {
					$rootScope.authenticated = false;
				}
				callback && callback();
		    }).error(function() {
		    	$rootScope.authenticated = false;
		    	callback && callback();
		    });
		}		
	    authenticate();
	    $scope.credentials = {};
	    $scope.login = function() {
	        $http.post('login', $.param($scope.credentials), {
	          headers : {"content-type" : "application/x-www-form-urlencoded"}
	        }).success(function(data) {
	        	authenticate(function() {
	        		if ($rootScope.authenticated) {
	    	    		console.log("login succeeded");
	        			$location.path("/");
	        			$scope.error = false;
		            } else {
		            	$location.path("/login");
		            	$scope.error = true;
		            }
	        	});
	        }).error(function(data) {s
	        	$location.path("/login");
	          	$scope.error = true;
	          	$rootScope.authenticated = false;
	        })
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
