(function(){
	angular.module('salespusher.controllers').controller('CatalogIndexCtrl',['$scope','$http', '$routeParams', 'CategoryOne',function($scope,$http,$routeParams,CategoryOne){		
		$scope.categoryones = CategoryOne.query();
	}]);
})();