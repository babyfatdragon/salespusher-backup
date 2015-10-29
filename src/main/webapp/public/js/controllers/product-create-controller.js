(function(){
	angular.module('salespusher.controllers').controller('ProductCreateCtrl',[
	    '$scope','CategoryOne','CategoryTwo','Product',
	    function($scope,CategoryOne,CategoryTwo,Product){
		$scope.product = new Product();
		$scope.categoryones = CategoryOne.query();
		$scope.categorytwos = [];
	}]);
})();