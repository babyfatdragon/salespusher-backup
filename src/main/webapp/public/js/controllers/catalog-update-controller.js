(function(){
	angular.module('salespusher.controllers')
	.controller('CatalogUpdateCtrl',['$scope','$stateParams','CategoryOne',function($scope,$stateParams,CategoryOne){
		$scope.categoryone = CategoryOne.get({id:$stateParams.categoryOneId});
	}]);
})();