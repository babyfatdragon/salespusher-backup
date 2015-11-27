(function(){
	angular.module('salespusher.resources').factory('Lead', ['$resource',function LeadFactory($resource) {  
		return $resource("/leads/:id", {id:'@id'}, {
			'update': {method:'PUT'}
		});
	}]);
})();