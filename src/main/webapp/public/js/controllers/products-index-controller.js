(function(){
	angular.module('salespusher.controllers').controller('ProductsIndexCtrl',['$scope','$stateParams','filterFilter','CategoryOne','CategoryTwo','CategoryProduct',function($scope,$stateParams,filterFilter,CategoryOne,CategoryTwo,CategoryProduct){	
		$scope.products = [];
		$scope.filtered = [];
		/* pagination */
		$scope.currentPage = 1;
		$scope.pageCapacity = 10;
		
		$scope.categoryone = CategoryOne.get({id:$stateParams.categoryOneId});
		$scope.categorytwo = CategoryTwo.get({categoryOneId:$stateParams.categoryOneId,id:$stateParams.categoryTwoId});
		CategoryProduct.query({categoryTwoId: $stateParams.categoryTwoId}).$promise.then(function(products){
			$scope.products = products;
			$scope.totalItems = products.length;
			$scope.noOfPages = Math.ceil($scope.totalItems / $scope.pageCapacity);
		});
		$scope.$watch('search', function (newVal, oldVal) {
			$scope.filtered = filterFilter($scope.products, newVal);
			$scope.totalItems = $scope.filtered.length;
			$scope.noOfPages = Math.ceil($scope.totalItems / $scope.pageCapacity);
			$scope.currentPage = 1;
		}, true);
	}]);
})();