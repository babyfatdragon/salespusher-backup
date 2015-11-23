(function(){
	angular.module('salespusher.controllers')
	.controller('UserShowCtrl',['$scope','$state','$timeout','$stateParams','UserById','Product','Company','UserDeal','MonthlyDeal',
	                            'UserServiceEvent','MonthlyUserServiceEvent','MonthlyUserExpenseClaim','UserMonthlyRecord',
	                            function($scope,$state,$timeout,$stateParams,UserById,Product,Company,UserDeal,MonthlyDeal,
	                            		UserServiceEvent,MonthlyUserServiceEvent,MonthlyUserExpenseClaim,UserMonthlyRecord){		
		$scope.itemsByPage = 10;
		$scope.thisYear = 1970;
		$scope.thisMonth = 12;
		
		$scope.deals = new Array();
		$scope.displayDeals = new Array();
		$scope.monthlyRecords = new Array();
		$scope.DisplayMonthlyRecords = new Array();
			
		$scope.barLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		$scope.barSeries = ['Sales Amount', 'Services Charge','Expense Claimed'];
		$scope.barData = [
		    [0,0,0,0,0,0,0,0,0,0,0,0],
		    [0,0,0,0,0,0,0,0,0,0,0,0],
		    [0,0,0,0,0,0,0,0,0,0,0,0],
	    ];
		$scope.barOnClick = function(points, evt){
		    if(typeof points[0] != "undefined"){
		    	switch(points[0].label){
			    	case 'Jan':$scope.thisMonth = 0; $scope.thisMonthText = $scope.barLabels[0]; break;
			    	case 'Feb':$scope.thisMonth = 1; $scope.thisMonthText = $scope.barLabels[1]; break;
			    	case 'Mar':$scope.thisMonth = 2; $scope.thisMonthText = $scope.barLabels[2]; break;
			    	case 'Apr':$scope.thisMonth = 3; $scope.thisMonthText = $scope.barLabels[3]; break;
			    	case 'May':$scope.thisMonth = 4; $scope.thisMonthText = $scope.barLabels[4]; break;
			    	case 'Jun':$scope.thisMonth = 5; $scope.thisMonthText = $scope.barLabels[5]; break;
			    	case 'Jul':$scope.thisMonth = 6; $scope.thisMonthText = $scope.barLabels[6]; break;
			    	case 'Aug':$scope.thisMonth = 7; $scope.thisMonthText = $scope.barLabels[7]; break;
			    	case 'Sep':$scope.thisMonth = 8; $scope.thisMonthText = $scope.barLabels[8]; break;
			    	case 'Oct':$scope.thisMonth = 9; $scope.thisMonthText = $scope.barLabels[9]; break;
			    	case 'Nov':$scope.thisMonth = 10; $scope.thisMonthText = $scope.barLabels[10]; break;
			    	case 'Dec':$scope.thisMonth = 11; $scope.thisMonthText = $scope.barLabels[11]; break;
			    	default: break;
		    	}
		    }
		}

		$scope.serviceEvents = UserServiceEvent.query({userId:$stateParams.id});

		Company.query().$promise.then(function(companies){
			$scope.companies = companies;
			Product.query().$promise.then(function(products){
				$scope.products = products;
				UserById.get({id:$stateParams.id}).$promise.then(function(user){
					$scope.user = user;
					UserDeal.query({userId:$stateParams.id}).$promise.then(function(deals){
						for(var i=0;i<deals.length;i++){
							var product = $scope.getObjectById($scope.products,deals[i].productId);
							deals[i].productName = product.name;
							var company = $scope.getObjectById($scope.companies,deals[i].companyId);
							deals[i].companyName = company.name;
						}
						$scope.deals = deals;
						$scope.displayDeals = [].concat(deals);
					});
					UserMonthlyRecord.query({userId:$stateParams.id}).$promise.then(function(monthlyRecords){
						$scope.monthlyRecords = monthlyRecords;
						$scope.DisplayMonthlyRecords = [].concat(monthlyRecords);
						/* when monthly records ready, start fetch data*/
						$scope.thisYear = new Date().getFullYear();
						$scope.thisMonth = new Date().getMonth();
						$scope.thisMonthText = $scope.barLabels[$scope.thisMonth];	
					});
				});
			});
		});
		
		$scope.$watch('deals',function(){
			$scope.filteredTotalAmount = 0;
			$scope.deals.forEach(function(deal){
				$scope.filteredTotalAmount+=deal.totalPrice;
			});
		});
		
		$scope.getObjectById = function(models,id){
    		if(models.length){
        		var result = $.grep(models, function(element){
        			return element.id === id; 
    			});
        		if(result.length){
            		return result[0];
        		}
    		}
		}
		$scope.$watch('thisYear', function(newVal,oldVal){
			/** reset data **/
			$scope.yearlySalesAmount = 0;
			$scope.yearlyServicesCharge = 0;
			$scope.yearlyExpenseClaims = 0;
			$scope.thisYearTarget=0;
			$scope.thisYearExpenses=0;

			$scope.wonDeals = new Array();
			$scope.lostDeals = new Array();
			$scope.yearlyServices = new Array();
			$scope.monthlyDeals = new Array(12);
			$scope.monthlyWonDeals = new Array(12);
			$scope.monthlyLostDeals = new Array(12);
			$scope.monthlyAmount = new Array(12);
			$scope.monthlyServices = new Array(12);
			$scope.monthlyServicesCharge = new Array(12);
			$scope.monthlyExpenseClaims = new Array(12);
			for(var month=0;month<12;month++){
				$scope.getDealsByMonth(month);
			}
			$scope.barData = [
			    $scope.monthlyAmount,
			    $scope.monthlyServicesCharge,
			    $scope.monthlyExpenseClaims,
			];
			$scope.thisMonthRecord = $scope.getRecordByYearmonth($scope.DisplayMonthlyRecords,$scope.thisYear,$scope.thisMonth);
		});

		$scope.$watch('thisMonth',function(){
			$scope.thisMonthRecord = $scope.getRecordByYearmonth($scope.DisplayMonthlyRecords,$scope.thisYear,$scope.thisMonth);
		});
		
		$scope.getDealsByMonth = function(month){
			$scope.monthlyDeals[month] = new Array();			
			$scope.monthlyWonDeals[month] = new Array();
			$scope.monthlyLostDeals[month] = new Array();
			$scope.monthlyAmount[month]= 0;
			$scope.monthlyServices[month] = new Array();
			$scope.monthlyServicesCharge[month] = 0;
			$scope.monthlyExpenseClaims[month] = 0;

			var mon = $scope.getRecordByYearmonth($scope.DisplayMonthlyRecords,$scope.thisYear,month);
			if(typeof mon != 'undefined'){
				$scope.thisYearTarget+=mon.salesTarget;
				$scope.thisYearExpenses+=mon.claimableExpenses;
			}
			MonthlyDeal.query({year:$scope.thisYear,month:month,userId:$stateParams.id}).$promise.then(function(deals){
				$scope.monthlyDeals[month].push(deals);
				deals.forEach(function(deal){
					if(deal.dealStatus==='WON'){
						$scope.wonDeals.push(deal);
						$scope.monthlyWonDeals[month].push(deal);
						$scope.monthlyAmount[month]+=deal.totalPrice;
						$scope.yearlySalesAmount+=deal.totalPrice;
					}
					if(deal.dealStatus==='LOST'){
						$scope.lostDeals.push(deal);
						$scope.monthlyLostDeals[month].push(deal);
					}

				});						
			});
			MonthlyUserServiceEvent.query({year:$scope.thisYear,month:month,userId:$stateParams.id}).$promise.then(function(serviceEvents){
				$scope.yearlyServices.push(serviceEvents);
				$scope.monthlyServices[month].push(serviceEvents);
				serviceEvents.forEach(function(serviceEvent){
					$scope.monthlyServicesCharge[month]+=serviceEvent.charge;
					$scope.yearlyServicesCharge+=serviceEvent.charge;
				});
			});
			MonthlyUserExpenseClaim.query({year:$scope.thisYear,month:month,userId:$stateParams.id}).$promise.then(function(expenseClaims){
				expenseClaims.forEach(function(expenseClaim){
					$scope.monthlyExpenseClaims[month]+=expenseClaim.amount;
					$scope.yearlyExpenseClaims+=expenseClaim.amount;
				});
			});
		}

		$scope.getRecordByYearmonth = function(models,year,month){
	   		if(models.length){
        		var result = $.grep(models, function(element){
        			return (new Date(element.yearmonth).getFullYear() === year && new Date(element.yearmonth).getMonth() === month); 
    			});
        		if(result.length){
            		return result[0];
        		}
    		}
		}
		/** monthly records related **/
		$scope.recordItemsByPage = 3;

		$scope.action='Create';
		$scope.showMonthlyRecordForm = false;
		$scope.monthlyRecord = {};
		$scope.yearmonthStatus = {
			opened: false
		};
		$scope.addMonthlyRecord = function(){
			$scope.showMonthlyRecordForm = true;
		}
		$scope.openYearmonth = function($event) {
			$scope.yearmonthStatus.opened = true;
		};
		$scope.submit = function(){
			if($scope.action==='Create'){
				$scope.monthlyRecord.userId = $stateParams.id;
				var ym = $scope.monthlyRecord.yearmonth;
				$scope.monthlyRecord.yearmonth = new Date(ym.getFullYear(),ym.getMonth(),1);
				UserMonthlyRecord.save($scope.monthlyRecord).$promise.then(function(){
					$state.reload();
				});
			} else if($scope.action==='Update'){
				UserMonthlyRecord.update({id:$scope.monthlyRecord.id},$scope.monthlyRecord).$promise.then(function(){
					$state.reload();
				});
			}
			$scope.action='Create';
		}
		$scope.editMonthlyRecord = function(monthlyRecord){
			$scope.action='Update';
			$scope.monthlyRecord = monthlyRecord;
			$scope.showMonthlyRecordForm = true;
		}
		$scope.cancelMonthlyRecordForm = function(){
			$scope.action='Create';
			$scope.monthlyRecord = {};
			$scope.showMonthlyRecordForm = false;
		};
		/** monthly records related **/	
	}]);
})();