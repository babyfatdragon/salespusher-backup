(function(){
	angular.module('salespusher.controllers').controller('ProductShowCtrl',[
    '$scope','$http', '$routeParams','CategoryOne','CategoryTwo','CategoryProduct','Product','ProductImage','ProductDocument',
    function($scope,$http,$routeParams,CategoryOne,CategoryTwo,CategoryProduct,Product,ProductImage,ProductDocument){	
		$scope.categoryone = CategoryOne.get({id:$routeParams.categoryOneId});
		$scope.categorytwo = CategoryTwo.get({categoryOneId:$routeParams.categoryOneId,id:$routeParams.categoryTwoId});
		var productImages = ProductImage.query({productId:$routeParams.id});
		var productDocuments = $scope.productDocuments = ProductDocument.query({productId:$routeParams.id});
		
		Product.get({id:$routeParams.id}).$promise.then(function(product){
			$scope.product = product;
			var slides = $scope.slides = [];
			
			$scope.addSlide = function(productImage) {
				var newWidth = 600 + slides.length + 1;
			    slides.push({
		    		image: "/resources/products/images/"+productImage.name,
			    });
			};
			
			for (var i=0; i<productImages.length; i++) {
				$scope.addSlide(productImages[i]);
			}
			console.log("DOCUMENTS: "+JSON.stringify(productDocuments,null,2));
		});
		
		$scope.getDocumentDirectory = function(fileName){
			return "/resources/products/documents/"+fileName;
		}
		
		$scope.getOriginDocumentName = function(fileName){
			return fileName.substr(fileName.indexOf("-")+1);
		}
	}]);
})();