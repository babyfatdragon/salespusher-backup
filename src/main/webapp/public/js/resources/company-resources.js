(function(){
	angular.module('salespusher.resources').factory('Company', ['$resource',function CompanyFactory($resource) {  
		return $resource("/companies/:id", {id:'@id'}, {
			'update': {method:'PUT'}
		});
	}]);
})();