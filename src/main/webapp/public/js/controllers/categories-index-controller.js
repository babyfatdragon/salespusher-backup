(function(){
	angular.module('salespusher.controllers').controller('CategoriesIndexCtrl',['$scope','$http', '$routeParams','CategoryOne', 'CategoryTwo',function($scope,$http,$routeParams,CategoryOne,CategoryTwo){	
		$scope.categorytwos = CategoryTwo.query({categoryOneId: $routeParams.categoryOneId});
		$scope.categoryone = CategoryOne.get({id: $routeParams.categoryOneId});
	}]);
})();