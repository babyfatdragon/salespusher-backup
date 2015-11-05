(function(){
	angular.module('salespusher.directives')
	.directive('spDealForm',[function(){
		return{
			strict: 'E',
			templateUrl: '/templates/directives/sp-deal-form.html',
			controller: ['$scope', function($scope){
				$scope.$on('SHOW_DEAL_FORM',function(events,args){
					$scope.showDealForm = true;
				});
				
				$scope.cancel = function(){
					$scope.deal = {};
					$scope.showDealForm = false;
				}
			}]
		}
	}]);
})();