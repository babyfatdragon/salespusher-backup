(function(){
	angular.module('salespusher.controllers').controller('EventCardCtrl',['$scope','event',function($scope,event){
		$scope.event = event;
		$scope.close = function(result) {
			close(false,500); // close, but give 500ms for bootstrap to animate
		};	
	}]);
})();