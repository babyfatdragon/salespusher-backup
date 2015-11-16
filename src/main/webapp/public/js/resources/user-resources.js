(function(){
	angular.module("salespusher.resources").factory("User", ['$resource', function UserFactory($resource) {  
		return $resource("/users/:username", {username:'@username'}, {});
	}]);
	
	angular.module("salespusher.resources").factory("UserById", ['$resource', function UserByIdFactory($resource) {  
		return $resource("/usersById/:id", {id:'@id'}, {});
	}]);
})();

