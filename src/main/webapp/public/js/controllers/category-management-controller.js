(function(){
	angular.module('salespusher.controllers')
    .controller('CategoryManagementCtrl', ['$scope','CategoryOne','AllCategoryTwo', function ($scope,CategoryOne,AllCategoryTwo) {
    	$scope.categoryones = [];
    	$scope.categorytwos = [];
	    $scope.displayCategorytwos = [];
    	$scope.categoryoneNames = [];
    	CategoryOne.query().$promise.then(function(categoryones){
    		$scope.categoryones = categoryones;
        	AllCategoryTwo.query().$promise.then(function(categorytwos){
        		for(var i=0;i<categorytwos.length;i++){
        			categorytwos[i].catalogName = $scope.getCategoryOneName(categorytwos[i].categoryOneId);
        		}
        		$scope.categorytwos = categorytwos;
        	    $scope.displayCategorytwos = [].concat(categorytwos);
        	});
    	});

    	$scope.getCategoryOneName = function(id){
    		if($scope.categoryones.length){
        		var result = $.grep($scope.categoryones, function(element){
        			return element.id === id; 
    			});
        		if(result.length){
            		return result[0].name;
        		}
    		}
    	};
    	
    	$scope.itemsByPage = 10;
    }]);
})();
