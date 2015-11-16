(function(){
	angular.module('salespusher.controllers')
	.controller('UserShowCtrl',['$scope','$timeout','$stateParams','UserById','Product','Company','UserDeal','UserServiceEvent','UserExpenseClaim',
	                            function($scope,$timeout,$stateParams,UserById,Product,Company,UserDeal,UserServiceEvent,UserExpenseClaim){		
		$scope.deals = new Array();
		$scope.displayDeals = new Array();
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
				});
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
		
		$scope.itemsByPage = 10;
		
		$scope.thisYear = new Date().getFullYear();
		
		$scope.thisMonth = new Date().getMonth();
		
		$scope.thisMonthText = "Monthly";
		
		$scope.dealsThisYear = new Array();
		$scope.getDealsByYear = function(year){
			$scope.deals.forEach(function(deal){
				var dateClosed = new Date(deal.dateClosed);
				if(dateClosed===null || dateClosed.getFullYear()===year){
					$scope.dealsThisYear.push(deal);
				}
			});
		}
		
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
			},300);
		}
		
		$scope.$watch('thisYear',function(){
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
		});
		
		

		
		$scope.dealsInProgress = new Array();
		$scope.getDealsInProgress = function(){
			$scope.deals.forEach(function(deal){
				var dateClosed = new Date(deal.dateClosed);
				if(dateClosed===null){
					$scope.getDealsInProgress.push(deal);
				}
			});
		}
		
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

	}]);
})();