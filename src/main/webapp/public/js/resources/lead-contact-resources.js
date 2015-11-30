(function(){
	angular.module('salespusher.resources').factory('LeadContact', ['$resource',function LeadContactFactory($resource) {  
		return $resource("/leadContacts/:leadId/contacts/:id", {leadId:'@leadId',id:'@id'}, {
			'update': {method:'PUT'}
		});
	}]);
})();