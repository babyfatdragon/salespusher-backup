(function(){
	angular.module('salespusher.controllers').controller('ProductsIndexCtrl',['$scope','$http', '$routeParams','CategoryOne','CategoryTwo','CategoryProduct',function($scope,$http,$routeParams,CategoryOne,CategoryTwo,CategoryProduct){	
		$scope.categoryone = CategoryOne.get({id:$routeParams.categoryOneId});
		$scope.categorytwo = CategoryTwo.get({categoryOneId:$routeParams.categoryOneId,id:$routeParams.categoryTwoId});
		$scope.products = CategoryProduct.query({categoryTwoId: $routeParams.categoryTwoId});
	}]);
})();