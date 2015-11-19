(function(){
	angular.module('salespusher.resources').factory('DealRequestByDealId', ['$resource',function DealRequestByDealIdFactory($resource) {  
		return $resource("/dealRequestsByDealId/:dealId/requests/:id", {dealId:'@dealId',id:'@id'}, {
			'update': {method:'PUT'}
		});
	}]);
	angular.module('salespusher.resources').factory('DealRequestByRequesteeId', ['$resource',function DealRequestByRequesteeIdFactory($resource) {  
		return $resource("/dealRequestsByRequesteeId/:requesteeId/requests/:id", {requesteeId:'@requesteeId',id:'@id'}, {
			'update': {method:'PUT'}
		});
	}]);
})();