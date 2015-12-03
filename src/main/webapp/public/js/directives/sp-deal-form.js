(function(){
	angular.module('salespusher.directives')
	.directive('spDealForm',[function(){
		return{
			strict: 'E',
			templateUrl: '/templates/directives/sp-deal-form.html',
			controller: ['$rootScope','$scope','$state','Product','Company','Customer','Deal','DealFollower',
			             function($rootScope,$scope,$state,Product,Company,Customer,Deal,DealFollower){
				
				$scope.$on('SHOW_ADD_DEAL_FORM',function(events,args){
					$scope.show = true;
					$scope.action = "Create";
					$scope.deal = new Deal();
				});
				$scope.$on('SHOW_EDIT_DEAL_FORM',function(events,args){
					$scope.editId = args.editDeal.id;
					$scope.show = true;
					$scope.action = "Update";
					Deal.get({id:$scope.editId}).$promise.then(function(deal){
						$scope.deal = deal;
					});
				});
				$scope.save = function() {
					Customer.get({id:$scope.deal.customerId}).$promise.then(function(customer){
						if($scope.action==="Create"){
							$scope.deal.companyId = customer.companyId;
							$scope.deal.userId = $rootScope.currentUser.id;
							$scope.deal.dealStatus = "IN PROGRESS";
							Deal.save($scope.deal).$promise.then(function(deal){
								$scope.deal = {};
								/**add owner to follower **/
								var follower = new DealFollower();
								follower.dealId = deal.id;
								follower.userId = deal.userId;
								follower.isOwner = 1;
								DealFollower.save(follower);
					    		$rootScope.$broadcast('DEALS_UPDATED');
					    		$state.go('dealShow',({id:deal.id}));
							});		
						} 
						else if($scope.action==="Update"){
/*							if($scope.deal.dealStatus!='IN PROGRESS'){
								$scope.deal.dateClosed = new Date();
							}*/
							Deal.update($scope.deal).$promise.then(function(){
								$scope.show = false;
								$scope.deal = {};
					    		$rootScope.$broadcast('DEALS_UPDATED');
							});		
						}
					});
				}
				$scope.cancel = function(){
					$scope.show = false;
					$scope.hideAdd = false;
		    		$rootScope.$broadcast('UPDATE_CANCELED');
				}
				
				$scope.statusOptions = [{name:"IN PROGRESS"},{name:"WON"},{name:"LOST"}];
			}]
		}
	}]);
})();