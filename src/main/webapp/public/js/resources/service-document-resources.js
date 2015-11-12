(function(){
	angular.module("salespusher.resources").factory("ServiceDocument",['$resource', function ServiceDocumentFactory($resource){
		return $resource("/services/:serviceId/serviceDocuments/:id",{serviceId:'@serviceId',id:'@id'},{});
	}]);
})();