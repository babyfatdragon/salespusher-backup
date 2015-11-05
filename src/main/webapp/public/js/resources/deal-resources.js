(function(){
	angular.module('salespusher.resources').factory('Deal', ['$resource',function DealFactory($resource) {  
		return $resource("/deals/:id", {id:'@id'}, {
			'update': {method:'PUT'}
		});
	}]);
})();