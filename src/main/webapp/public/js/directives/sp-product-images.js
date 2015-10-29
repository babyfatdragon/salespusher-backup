(function(){
	angular.module('salespusher.directives')
	.directive('spProductImages',[function(){
		return {  
			restrict: 'E',
			scope: {
				productId: '='
			},
			templateUrl: 'templates/directives/sp-product-images.html',
			controller: ['$scope','ProductImage',function($scope,ProductImage){
				$scope.$watch("productId", function(){
					ProductImage.query({productId:$scope.productId})
					.$promise.then(function(productImages){
						$scope.productImages = productImages;
					});
				});	
				
				$scope.getFilePath = function(fileName){
					return "/resources/products/images/"+fileName;
				}
			}]
		};
	
		
	}]);
})();