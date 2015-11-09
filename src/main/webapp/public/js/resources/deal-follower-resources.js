(function(){
	angular.module('salespusher.resources').factory('DealFollower', ['$resource',function DealFollowerFactory($resource) {  
		return $resource("/dealFollowers/:dealId/followers/:id", {dealId:'@dealId',id:'@id'}, {
			'update': {method:'PUT'}
		});
	}]);
})();