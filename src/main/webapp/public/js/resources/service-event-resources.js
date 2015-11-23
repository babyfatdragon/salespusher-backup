(function(){
	angular.module('salespusher.resources').factory('DealServiceEvent', ['$resource',function DealServiceEventFactory($resource) {  
		return $resource("/serviceEventsByDeal/:dealId/events/:id", {dealId:'@dealId',id:'@id'}, {
			'update': {method:'PUT'}
		});
	}]);
	angular.module('salespusher.resources').factory('UserServiceEvent', ['$resource',function UserServiceEventFactory($resource) {  
		return $resource("/serviceEventsByUser/:userId/events/:id", {userId:'@userId',id:'@id'}, {
			'update': {method:'PUT'}
		});
	}]);

	angular.module('salespusher.resources').factory('MonthlyUserServiceEvent', ['$resource',function MonthlyUserServiceEventFactory($resource) {  
		return $resource("/monthlyServiceEventsByUser/:userId/year/:year/month/:month/events/:id", {userId:'@userId',year:'@year',month:'@month',id:'@id'}, {
			'update': {method:'PUT'}
		});
	}]);
	
	angular.module('salespusher.resources').factory('AllServiceEvent', ['$resource',function UserServiceEventFactory($resource) {  
		return $resource("/serviceEvents/:id", {id:'@id'}, {
			'update': {method:'PUT'}
		});
	}]);
})();