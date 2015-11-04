(function(){
	angular.module('salespusher.controllers').controller('ProductShowCtrl',[
    '$scope','$http', '$stateParams','CategoryOne','CategoryTwo','CategoryProduct','Product','ProductImage','ProductDocument',
    function($scope,$http,$stateParams,CategoryOne,CategoryTwo,CategoryProduct,Product,ProductImage,ProductDocument){	
		$scope.categoryone = CategoryOne.get({id:$stateParams.categoryOneId});
		$scope.categorytwo = CategoryTwo.get({categoryOneId:$stateParams.categoryOneId,id:$stateParams.categoryTwoId});
		var productImages = ProductImage.query({productId:$stateParams.id});
		var productDocuments = $scope.productDocuments = ProductDocument.query({productId:$stateParams.id});
		$scope.videoUrl = 'https://www.youtube.com/watch?v=D5oF99TM9nA';
		Product.get({id:$stateParams.id}).$promise.then(function(product){
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
		});
		
		$scope.getDocumentDirectory = function(fileName){
			return "/resources/products/documents/"+fileName;
		}
		
		$scope.getOriginDocumentName = function(fileName){
			return fileName.substr(fileName.indexOf("-")+1);
		}
		
		/*let dropdown open by default*/
		$scope.videos = {
				open:true
		}
		$scope.download = {
				open:true
		} 
	}]);
})();