(function(){
	angular.module('salespusher.resources').factory('DealFollowRequest', ['$resource',function DealFollowRequestFactory($resource) {  
		return $resource("/dealFollowRequests/:inviteeId/requests/:id", {inviteeId:'@inviteeId',id:'@id'}, {
			'update': {method:'PUT'}
		});
	}]);
})();