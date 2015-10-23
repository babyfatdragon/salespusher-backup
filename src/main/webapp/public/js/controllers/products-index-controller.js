(function(){
	angular.module('salespusher.controllers').controller('ProductsIndexCtrl',['$scope','$http', '$routeParams', 'CategoryTwo','CategoryProduct',function($scope,$http,$routeParams,CategoryTwo,CategoryProduct){	
		$scope.categorytwo = CategoryTwo.get({id: $routeParams.categoryTwoId});
		$scope.products = CategoryProduct.query({categoryTwoId: $routeParams.categoryTwoId});
	}]);
})();