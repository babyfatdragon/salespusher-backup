(function(){
	angular.module('salespusher.controllers')
	.controller('categoryUpdateCtrl',['$scope','$stateParams','CategoryOne','AllCategoryTwo',function($scope,$stateParams,CategoryOne,AllCategoryTwo){
		$scope.categoryones = CategoryOne.query();
		$scope.categorytwo = {};
		AllCategoryTwo.get({id:$stateParams.id}).$promise.then(function(categorytwo){
			$scope.categorytwo = categorytwo;
		});
	}]);
})();