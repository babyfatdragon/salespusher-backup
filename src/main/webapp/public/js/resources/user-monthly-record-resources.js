(function(){
	angular.module('salespusher.resources').factory('UserMonthlyRecord', ['$resource',function UserMonthlyRecordFactory($resource){  
		return $resource("/userMonthlyRecords/:userId/records/:id", {userId:'@userId',id:'@id'}, {
			'update': {method:'PUT'}
		});
	}]);
})();