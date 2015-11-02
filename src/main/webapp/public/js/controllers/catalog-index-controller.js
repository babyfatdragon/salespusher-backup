(function(){
	angular.module('salespusher.controllers').controller('CatalogIndexCtrl',['$scope','filterFilter','CategoryOne',function($scope,filterFilter,CategoryOne){		
		$scope.categoryones = [];
		$scope.filtered = [];
		/* pagination */
		$scope.currentPage = 1;
		$scope.pageCapacity = 10;
		
		CategoryOne.query().$promise.then(function(categoryones){
			$scope.categoryones = categoryones;
			$scope.totalItems = categoryones.length;
			$scope.noOfPages = Math.ceil($scope.totalItems / $scope.pageCapacity);
		});
		
		$scope.$watch('search', function (newVal, oldVal) {
			$scope.filtered = filterFilter($scope.categoryones, newVal);
			$scope.totalItems = $scope.filtered.length;
			$scope.noOfPages = Math.ceil($scope.totalItems / $scope.pageCapacity);
			$scope.currentPage = 1;
		}, true);
	}]);
})();