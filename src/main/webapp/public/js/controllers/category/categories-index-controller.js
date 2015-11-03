(function(){
	angular.module('salespusher.controllers').controller('CategoriesIndexCtrl',['$scope','$stateParams','filterFilter','CategoryOne','CategoryTwo',function($scope,$stateParams,filterFilter,CategoryOne,CategoryTwo){
		$scope.categorytwos = [];
		$scope.filtered = [];
		/* pagination */
		$scope.currentPage = 1;
		$scope.pageCapacity = 10;
		CategoryTwo.query({categoryOneId:$stateParams.categoryOneId}).$promise.then(function(categorytwos){
			$scope.categorytwos = categorytwos;
			$scope.totalItems = categorytwos.length;
			$scope.noOfPages = Math.ceil($scope.totalItems / $scope.pageCapacity);			
		});
		$scope.categoryone = CategoryOne.get({id: $stateParams.categoryOneId});

		$scope.$watch('search', function (newVal, oldVal) {
			$scope.filtered = filterFilter($scope.categorytwos, newVal);
			$scope.totalItems = $scope.filtered.length;
			$scope.noOfPages = Math.ceil($scope.totalItems / $scope.pageCapacity);
			$scope.currentPage = 1;
		}, true);

	}]);
})();