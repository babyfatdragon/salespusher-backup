(function(){
	angular.module('salespusher.controllers')
    .controller('CategoryManagementCtrl', ['$scope','CategoryOne','AllCategoryTwo', function ($scope,CategoryOne,AllCategoryTwo) {
    	$scope.categoryones = [];
    	$scope.categorytwos = [];
    	$scope.categoryoneNames = [];
    	CategoryOne.query().$promise.then(function(categoryones){
    		$scope.categoryones = categoryones;
    	});
    	AllCategoryTwo.query().$promise.then(function(categorytwos){
    		$scope.categorytwos = categorytwos;
    	});
    	
    	$scope.getCategoryOneName = function(id){
    		if($scope.categoryones.length){
        		var result = $.grep($scope.categoryones, function(element){
        			return element.id === id; 
    			});
        		return result[0].name;
    		}
    	};
    }]);
})();
