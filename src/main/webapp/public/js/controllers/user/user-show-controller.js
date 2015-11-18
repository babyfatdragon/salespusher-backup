(function(){
	angular.module('salespusher.controllers')
	.controller('UserShowCtrl',['$scope','$state','$timeout','$stateParams','UserById','Product','Company','UserDeal','UserServiceEvent','UserExpenseClaim','UserMonthlyRecord',
	                            function($scope,$state,$timeout,$stateParams,UserById,Product,Company,UserDeal,UserServiceEvent,UserExpenseClaim,UserMonthlyRecord){		
		$scope.itemsByPage = 10;
		
		$scope.thisYear = new Date().getFullYear();
		
		$scope.thisMonth = new Date().getMonth();
		
		$scope.thisMonthText = "Monthly";
		
		$scope.deals = new Array();
		$scope.displayDeals = new Array();
		$scope.monthlyRecords = new Array();
		$scope.DisplayMonthlyRecords = new Array();
			
		$scope.serviceEvents = UserServiceEvent.query({userId:$stateParams.id});
		$scope.expenseClaims = UserExpenseClaim.query({userId:$stateParams.id});
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
						console.log($scope.DisplayMonthlyRecords.length);

					});
				});
			});
		});
		
		$scope.$watch('deals',function(){
			$scope.filteredTotalAmount = 0;
			$scope.deals.forEach(function(deal){
				$scope.filteredTotalAmount+=deal.totalPrice;
			});
			console.log($scope.filteredTotalAmount);
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
		
		/** progress bar **/
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
		/** progress bar **/
		
		$scope.getDealsByMonth = function(month){
			$timeout(function(){
				$scope.deals.forEach(function(deal){
					var dateCreated = new Date(deal.dateCreated);
					var dateClosed = new Date(deal.dateClosed);
					
					
					if(dateClosed.getFullYear()===$scope.thisYear && (dateCreated.getMonth()+1===month || dateClosed.getMonth()+1===month)){
						$scope.monthlyDeals[month-1].push(deal);
						if(deal.dealStatus==="WON"){
							$scope.wonDeals.push(deal);
							$scope.monthlyWonDeals[month-1].push(deal);
						}
						if(deal.dealStatus==="LOST"){
							$scope.lostDeals.push(deal);
							$scope.monthlyLostDeals[month-1].push(deal);
						}
					}
				});
				
				if($scope.monthlyWonDeals[month-1]===null){
				} else{
					$scope.monthlyWonDeals[month-1].forEach(function(deal){
						$scope.monthlyAmount[month-1]+=deal.totalPrice;
						$scope.yearlySalesAmount+=deal.totalPrice;
						
					});
				}
				
				$scope.serviceEvents.forEach(function(serviceEvent){
					var endDate = new Date(serviceEvent.end);
					
					if(endDate.getFullYear()===$scope.thisYear && endDate.getMonth()+1===month){
						$scope.yearlyServices.push(serviceEvent);
						$scope.monthlyServices[month-1].push(serviceEvent);
						$scope.monthlyServicesCharge[month-1]+=serviceEvent.charge;
						$scope.yearlyServicesCharge+=serviceEvent.charge;
					}
				});
				$scope.expenseClaims.forEach(function(expenseClaim){
					var dateIncurred = new Date(expenseClaim.dateIncurred);
					if(dateIncurred.getFullYear()===$scope.thisYear && dateIncurred.getMonth()+1===month){
						$scope.monthlyExpenseClaims[month-1]+=expenseClaim.amount;
						$scope.yearlyExpenseClaims+=expenseClaim.amount;
					}
				});
			},500);
		}
		
		$scope.$watch('thisYear',function(){
			console.log($scope.thisYear);
			/** reset data **/			
			$scope.wonDeals = new Array();

			$scope.yearlySalesAmount = 0;
			
			$scope.lostDeals = new Array();
			
			$scope.monthlyDeals = new Array(12);

			$scope.monthlyWonDeals = new Array();
			
			$scope.monthlyLostDeals = new Array();

			$scope.monthlyAmount = new Array(12);
			
			$scope.monthlyServices = new Array(12);
			
			$scope.yearlyServices = new Array();
			
			$scope.monthlyServicesCharge = new Array(12);
			
			$scope.yearlyServicesCharge = 0;
			
			$scope.monthlyExpenseClaims = new Array(12);
			
			$scope.yearlyExpenseClaims = 0;
			
			for(var i=0;i<12;i++){
				$scope.monthlyDeals[i] = new Array();
				$scope.monthlyWonDeals[i] = new Array();
				$scope.monthlyLostDeals[i] = new Array();
				$scope.monthlyAmount[i] = 0;
				$scope.monthlyServices[i] = new Array();
				$scope.monthlyServicesCharge[i] = 0;
				$scope.monthlyExpenseClaims[i] = 0;
			}
			$scope.barData = [
      		    $scope.monthlyAmount,
      		    $scope.monthlyServicesCharge,
      		    $scope.monthlyExpenseClaims,
      		];
			for(var i=1;i<=12;i++){
				$scope.getDealsByMonth(i);
			}
			/** yearly,monthly target and expenses **/
			$timeout(function(){
				$scope.thisYearTarget=0;
				$scope.thisYearExpenses=0;
				for(var i=0;i<12;i++){
					var mon = $scope.getRecordByYearmonth($scope.DisplayMonthlyRecords,$scope.thisYear,i);
					if(typeof mon !="undefined"){
						$scope.thisYearTarget+=mon.salesTarget;
						$scope.thisYearExpenses+=mon.claimableExpenses;
					}
				}
				if($scope.thisYearTarget!= 0){
					$scope.thisYearTargetPercentage = Math.round(100*($scope.yearlySalesAmount+$scope.yearlyServicesCharge)/$scope.thisYearTarget);
				} else{
					$scope.thisYearTargetPercentage = 0;
				}
				if($scope.thisYearExpenses != 0){
					$scope.thisYearExpensePercentage = Math.round(100*$scope.yearlyExpenseClaims/$scope.thisYearExpenses);
				} else{
					$scope.thisYearExpensePercentage = 0;
				}
				$scope.thisMonthRecord = $scope.getRecordByYearmonth($scope.DisplayMonthlyRecords,$scope.thisYear,$scope.thisMonth);
				if(typeof $scope.thisMonthRecord != "undefined"){
					$scope.thisMonthTargetPercentage = Math.round(100*($scope.monthlyAmount[$scope.thisMonth]+$scope.monthlyServicesCharge[$scope.thisMonth])/$scope.thisMonthRecord.salesTarget);
					$scope.thisMonthExpensePercentage = Math.round(100*$scope.monthlyExpenseClaims[$scope.thisMonth]/$scope.thisMonthRecord.claimableExpenses);
				} else{
					$scope.thisMonthTargetPercentage = 0;
					$scope.thisMonthExpensePercentage = 0;
				}
					
			},800);
		});
		
		
		$scope.barLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		$scope.barSeries = ['Sales Amount', 'Services Charge','Expense Claimed'];
		
		$scope.barOnClick = function(points, evt){
		    if(typeof points[0] != "undefined"){
		    	switch(points[0].label){
			    	case 'Jan':$scope.thisMonth = 0; $scope.thisMonthText = "January"; break;
			    	case 'Feb':$scope.thisMonth = 1; $scope.thisMonthText = "February"; break;
			    	case 'Mar':$scope.thisMonth = 2; $scope.thisMonthText = "March"; break;
			    	case 'Apr':$scope.thisMonth = 3; $scope.thisMonthText = "April"; break;
			    	case 'May':$scope.thisMonth = 4; $scope.thisMonthText = "May"; break;
			    	case 'Jun':$scope.thisMonth = 5; $scope.thisMonthText = "June"; break;
			    	case 'Jul':$scope.thisMonth = 6; $scope.thisMonthText = "July"; break;
			    	case 'Aug':$scope.thisMonth = 7; $scope.thisMonthText = "August"; break;
			    	case 'Sep':$scope.thisMonth = 8; $scope.thisMonthText = "September"; break;
			    	case 'Oct':$scope.thisMonth = 9; $scope.thisMonthText = "October"; break;
			    	case 'Nov':$scope.thisMonth = 10; $scope.thisMonthText = "November"; break;
			    	case 'Dec':$scope.thisMonth = 11; $scope.thisMonthText = "December"; break;
			    	default: break;
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
/*					UserMonthlyRecord.query({userId:$stateParams.id}).$promise.then(function(monthlyRecords){
						$scope.monthlyRecords = monthlyRecords;
						$scope.DisplayMonthlyRecords = [].concat(monthlyRecords);
					});
					$scope.showMonthlyRecordForm = false;*/
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