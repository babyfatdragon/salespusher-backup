(function(){
	angular.module("salespusher.resources").factory("User", function UserFactory($resource) {  
		return $resource("/users/:id", {}, {});
	});
})();

