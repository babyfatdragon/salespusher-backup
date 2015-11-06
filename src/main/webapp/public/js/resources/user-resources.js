(function(){
	angular.module("salespusher.resources").factory("User", ['$resource', function UserFactory($resource) {  
		return $resource("/users/:username", {username:'@username'}, {});
	}]);
})();

