(function(){
	angular.module("salespusher.resources").factory("DealDocument",['$resource', function DealDocumentFactory($resource){
		return $resource("/deals/:dealId/dealDocuments/:id",{dealId:'@dealId',id:'@id'},{});
	}]);
})();