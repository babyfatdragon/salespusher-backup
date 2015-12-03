(function(){
	angular.module('salespusher.controllers').controller('DealFormCtrl',['$rootScope','$scope','$state','Product','Company','Customer','Deal','DealFollower',
		'header','deal','dealAction','products','customers',
	function($rootScope,$scope,$state,Product,Company,Customer,Deal,DealFollower,header,deal,dealAction,products,customers){
		$scope.header = header;
		$scope.deal = {};
		angular.copy(deal,$scope.deal);
		$scope.dealAction = dealAction;
		$scope.products = products;
		$scope.customers = customers;


		$scope.startDateStatus = {
			opened: false
		};
		$scope.endDateStatus = {
				opened: false
		};
		$scope.openStart = function($event) {
			$scope.startDateStatus.opened = true;
		};
		$scope.openEnd = function($event) {
			$scope.endDateStatus.opened = true;
		};

		$scope.save = function() {
			Customer.get({id:$scope.deal.customerId}).$promise.then(function(customer){
				if($scope.dealAction==="Create"){
					$scope.deal.companyId = customer.companyId;
					$scope.deal.userId = $rootScope.currentUser.id;
					$scope.deal.parentId = null;
					$scope.deal.isParent = 1;
					$scope.deal.dealStatus = "IN PROGRESS";
					Deal.save($scope.deal).$promise.then(function(deal){
						$scope.deal = {};
						/**add owner to follower **/
						var follower = new DealFollower();
						follower.dealId = deal.id;
						follower.userId = deal.userId;
						follower.isOwner = 1;
						DealFollower.save(follower);
			    		$state.go('dealShow',({id:deal.id}));
					});		
				} 
				else if($scope.dealAction==="Update"){
					// if($scope.deal.dealStatus!='IN PROGRESS'){
					// 	$scope.deal.dateClosed = new Date();
					// }
					Deal.update($scope.deal).$promise.then(function(){
						$scope.show = false;
						$scope.deal = {};
					});		
				}
			});
			$rootScope.$broadcast('DEAL_UPDATED',{updatedDeal:$scope.deal});
		}
		$scope.cancel = function(){
			$scope.show = false;
			$scope.hideAdd = false;
		}
		
		$scope.statusOptions = [{name:"IN PROGRESS"},{name:"WON"},{name:"LOST"}];
	}]);
})();
