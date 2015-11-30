(function(){
	angular.module('salespusher.resources').factory('Lead', ['$resource',function LeadFactory($resource) {  
		return $resource("/leads/:id", {id:'@id'}, {
			'update': {method:'PUT'}
		});
	}]);
	angular.module('salespusher.resources').factory('LeadByUser', ['$resource',function LeadByUserFactory($resource) {  
		return $resource("/leadsByUser/:userId/leads/:id", {userId:'@userId',id:'@id'}, {
			'update': {method:'PUT'}
		});
	}]);
})();