(function(){
	angular.module('salespusher.controllers')
	.controller('ProductUpdateCtrl',[
	'$scope','$routeParams','CategoryOne','CategoryTwo','Product',
	function($scope,$routeParams,CategoryOne,CategoryTwo,Product){
		$scope.categoryones = CategoryOne.query();
		$scope.categorytwos = [];
		$scope.product = Product.get({id:$routeParams.id});
	}]);
})();