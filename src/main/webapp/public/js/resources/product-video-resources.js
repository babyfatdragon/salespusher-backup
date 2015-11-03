(function(){
	angular.module('salespusher.resources')
	.factory('ProductVideo',['$resource', function ProductVideoFactory($resource){
		return $resource('/products/:productId/productVideos/:id',{productId:'@productId',id:'@id'},{});
	}]);
})();