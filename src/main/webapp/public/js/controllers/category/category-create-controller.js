(function(){
	angular.module('salespusher.controllers').controller('CategoryCreateCtrl', ['$scope','CategoryOne','CategoryTwo',function($scope,CategoryOne,CategoryTwo){
		$scope.categoryones = CategoryOne.query();
		$scope.categorytwo = new CategoryTwo();		
	}]);
})();
