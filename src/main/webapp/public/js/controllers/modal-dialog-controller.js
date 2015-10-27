(function(){
	angular.module('salespusher.controllers').controller('ModalDialogController', ['$scope', 'close','header','content', function($scope, close, header, content) {
		$scope.header = header;
		$scope.content = content;
		$scope.close = function(result) {
			close(result, 500); // close, but give 500ms for bootstrap to animate
		};

	}]);
})();
