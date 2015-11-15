(function(){
	angular.module('salespusher.resources').factory('Deal', ['$resource',function DealFactory($resource) {  
		return $resource("/deals/:id", {id:'@id'}, {
			'update': {method:'PUT'}
		});
	}]);
	angular.module('salespusher.resources').factory('UserDeal', ['$resource',function UserDealFactory($resource) {  
		return $resource("/dealsByUser/:userId", {userId:'@userId'}, {
			'update': {method:'PUT'}
		});
	}]);
	angular.module('salespusher.resources').factory('CompanyDeal', ['$resource',function CompanyDealFactory($resource) {  
		return $resource("/dealsByCompany/:companyId", {companyId:'@companyId'}, {
			'update': {method:'PUT'}
		});
	}]);
})();