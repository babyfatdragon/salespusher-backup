(function(){
	angular.module('salespusher.resources').factory('DealEvent', ['$resource',function DealEventFactory($resource) {  
		return $resource("/dealEvents/:dealId/events/:id", {dealId:'@dealId',id:'@id'}, {
			'update': {method:'PUT'}
		});
	}]);
	angular.module('salespusher.resources').factory('AllEvent', ['$resource',function AllEventFactory($resource) {  
		return $resource("/dealEvents", {}, {
			'update': {method:'PUT'}
		});
	}]);
})();