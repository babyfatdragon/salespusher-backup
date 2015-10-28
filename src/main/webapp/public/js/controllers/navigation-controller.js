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
		var authenticate = function(callback) {
			$http.get('user').success(function(data) {
				if (data.name) {
					$rootScope.authenticated = true;
		        	/* set $rootScope authority */
					$http.get('/user', {}).success(function(data){
		        		$rootScope.authority = data.authorities[0].authority;
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
