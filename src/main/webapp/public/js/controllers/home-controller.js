(function(){
	angular.module('salespusher.controllers').controller('HomeCtrl',['$scope',"$http", function($scope,$http){
		$http.get('/resource/').success(function(data){
			$scope.greeting = data;
		});
	}]);
})();
