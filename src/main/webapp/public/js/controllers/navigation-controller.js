(function(){
	angular.module('salespusher.controllers')
	.controller('NavigationCtrl',['$rootScope','$scope','$state','$http','$location','User','DealFollowRequest','UserById','DealFollower','DealRequestByRequesteeId',
		function($rootScope, $scope,$state,$http, $location,User,DealFollowRequest,UserById,DealFollower,DealRequestByRequesteeId) {
		/*authentication, login & logut*/
		$rootScope.followRequests = new Array();
		$rootScope.followRequestsCounter = 0;
		$rootScope.dealRequests = new Array();
		$rootScope.dealRequestsCounter = 0;
		var authenticate = function(callback) {
			$http.get('user').success(function(data) {
				if (data.name) {
					$rootScope.authenticated = true;
		        	/* set $rootScope authority */
					if(typeof $rootScope.currentUser==='undefined' || $rootScope.currentUser===null){
						$http.get('/user', {}).success(function(user){
			        		$rootScope.authority = user.authorities[0].authority;
			        		User.get({username:user.name}).$promise.then(function(currentUser){
			        			$rootScope.currentUser =currentUser;
			        			console.log($rootScope.currentUser);
								DealFollowRequest.query({inviteeId:currentUser.id}).$promise.then(function(followRequests){
									followRequests.forEach(function(followRequest){
										UserById.get({id:followRequest.userId}).$promise.then(function(user){
											followRequest.inviterName = user.firstname+" "+user.lastname;
											$rootScope.followRequests.push(followRequest);
											$rootScope.followRequestsCounter++;
										});
									});
								});
								DealRequestByRequesteeId.query({requesteeId:$rootScope.currentUser.id}).$promise.then(function(dealRequests){
									dealRequests.forEach(function(dealRequest){
										if(dealRequest.isComplete === 0){
											UserById.get({id:dealRequest.userId}).$promise.then(function(user){
												dealRequest.requesterName = user.firstname+" "+user.lastname;
												$rootScope.dealRequests.push(dealRequest);
												$rootScope.dealRequestsCounter++;
											});
										}
									});
								});
			        		});
			        	});
					}
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
	        }).error(function(data) {
	        	$location.path("/login");
	          	$scope.error = true;
	          	$rootScope.authenticated = false;
	        })
	    };
	    $scope.logout = function() {
	    	$http.post('logout', {}).success(function() {
	    		console.log("logout succeeded");
	    		$rootScope.authenticated = false;
	    		$rootScope.currentUser = null;
	    		$scope.followRequests = new Array();
	    		$location.path("/");
	    	})
	    	.error(function(data) {
	    		console.log("logout failed");
	    		$rootScope.authenticated = false;
	    		$rootScope.currentUser = null;
	    	});
	    };


		/** follow requests **/
		$scope.follow = function(followRequest){
			var follower = new DealFollower();
			follower.dealId = followRequest.dealId;
			follower.userId = $rootScope.currentUser.id;
			DealFollower.save(follower).$promise.then(function(follower){
				followRequest.isResponded = 1;
				followRequest.$delete();
				$scope.followRequestsCounter--;
	    		$state.go('dealShow',({id:follower.dealId}));
			});
		}
		$scope.notFollow = function(followRequest){
			followRequest.$delete();
			$scope.followRequestsCounter--;
		}
	}]);
})();
