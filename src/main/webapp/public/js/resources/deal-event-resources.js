(function(){
	angular.module('salespusher.resources').factory('DealEvent', ['$resource',function DealEventFactory($resource) {  
		return $resource("/dealEvents/:dealId/events/:id", {dealId:'@dealId',id:'@id'}, {
			'update': {method:'PUT'}
		});
	}]);
})();