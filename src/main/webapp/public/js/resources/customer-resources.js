(function(){
	angular.module('salespusher.resources').factory('Customer', ['$resource',function CustomerFactory($resource) {  
		return $resource("/customers/:id", {id:'@id'}, {
			'update': {method:'PUT'}
		});
	}]);
})();