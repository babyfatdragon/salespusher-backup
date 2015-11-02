(function(){
	angular.module('salespusher.controllers')
    .controller('CatalogManagementCtrl', ['$scope','CategoryOne', function ($scope,CategoryOne) {
    	$scope.categoryones = [];
    	CategoryOne.query().$promise.then(function(categoryones){
    		$scope.categoryones = categoryones;
    	});
    }])
    .directive('stRatio',function(){
        return {
          link:function(scope, element, attr){
            var ratio=+(attr.stRatio);
            
            element.css('width',ratio+'%');
            
          }
        };
    });
})();
