(function(){
	angular.module('salespusher.controllers').controller('MonthlyRecordFormCtrl',['$rootScope','$scope','UserMonthlyRecord','monthlyRecord','monthlyRecordAction',
		function($rootScope,$scope,UserMonthlyRecord,monthlyRecord,monthlyRecordAction){
		$scope.monthlyRecord = {};
		angular.copy(monthlyRecord,$scope.monthlyRecord);
		$scope.monthlyRecordAction = monthlyRecordAction;
		$scope.yearmonthStatus = {
			opened: false
		};
		$scope.openYearmonth = function($event) {
			$scope.yearmonthStatus.opened = true;
		};
		$scope.submit = function(){
			if($scope.monthlyRecordAction==='Create'){
				$scope.monthlyRecord.userId = $stateParams.id;
				var ym = $scope.monthlyRecord.yearmonth;
				$scope.monthlyRecord.yearmonth = new Date(ym.getFullYear(),ym.getMonth(),1);
				UserMonthlyRecord.save($scope.monthlyRecord).$promise.then(function(){
				});
			} else if($scope.monthlyRecordAction==='Update'){
				UserMonthlyRecord.update({id:$scope.monthlyRecord.id},$scope.monthlyRecord).$promise.then(function(){
				});
			}
			$rootScope.$broadcast('USER_MONTHLY_RECORD_UPDATED');
			$scope.monthlyRecordAction='Create';
		};

		$scope.cancelMonthlyRecordForm = function(){
			$scope.monthlyRecordAction='Create';
		};

		$scope.close = function(result) {
			close(false,500); // close, but give 500ms for bootstrap to animate
		};	
	}]);
})();