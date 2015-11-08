(function(){
	angular.module('salespusher.resources').factory('DealComment', ['$resource',function DealCommentFactory($resource) {  
		return $resource("/dealComments/:dealId/comments/:id", {dealId:'@dealId',id:'@id'}, {
			'update': {method:'PUT'}
		});
	}]);
})();