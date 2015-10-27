(function(){
	angular.module('salespusher.controllers').controller('ProductShowCtrl',['$scope','$http', '$routeParams','CategoryOne','CategoryTwo','CategoryProduct','Product',function($scope,$http,$routeParams,CategoryOne,CategoryTwo,CategoryProduct,Product){	
		$scope.categoryone = CategoryOne.get({id:$routeParams.categoryOneId});
		$scope.categorytwo = CategoryTwo.get({categoryOneId:$routeParams.categoryOneId,id:$routeParams.categoryTwoId});
		Product.get({id:$routeParams.id}).$promise.then(function(product){
			$scope.product = product;
			$scope.product.text = "test";
			$scope.product.imageUrl = "testimageurl";
			
			var slides = $scope.slides = [];
			$scope.addSlide = function() {
				var newWidth = 600 + slides.length + 1;
			    slides.push({
		    		image: '//placekitten.com/' + newWidth + '/300',
		    		text: ['More','Extra','Lots of','Surplus'][slides.length % 4] + ' ' +
			        ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
			    });
			};
			for (var i=0; i<4; i++) {
				$scope.addSlide();
			}
		});
		
	}]);
})();