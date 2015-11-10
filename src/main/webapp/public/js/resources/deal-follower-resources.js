(function(){
	angular.module('salespusher.resources').factory('DealFollower', ['$resource',function DealFollowerFactory($resource) {  
		return $resource("/dealFollowers/:dealId/followers/:id", {dealId:'@dealId',id:'@id'}, {
			'update': {method:'PUT'}
		});
	}]);
	angular.module('salespusher.resources').factory('FollowingDeal', ['$resource',function FollowingDealFactory($resource) {  
		return $resource("/dealFollowers/:userId/deals/:id", {userId:'@userId',id:'@id'}, {
			'update': {method:'PUT'}
		});
	}]);
})();