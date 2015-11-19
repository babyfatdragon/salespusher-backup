(function(){
	angular.module('salespusher.controllers')
	.controller('HomeCtrl',['$rootScope','$scope','$timeout','$state',"$http",'filterFilter','UserById','Product',
	                        'Company','Customer','Deal','DealEvent','DealFollower','FollowingDeal','UserServiceEvent',
	                        'UserExpenseClaim','UserMonthlyRecord','DealFollowRequest',
	                        function($rootScope,$scope,$timeout,$state,$http,filterFilter,UserById,Product,
	                        		Company,Customer,Deal,DealEvent,DealFollower,FollowingDeal,UserServiceEvent,
	                        		UserExpenseClaim,UserMonthlyRecord,DealFollowRequest){
		$scope.eventSource = {};
		$scope.events = [];
		$scope.numOfDisplayedServiceEvents = 3;
		$scope.event = {};
		$scope.ownDeals = [];
		$scope.numOfDisplayedOwnDeals = 3;
		$scope.otherDeals = [];
		$scope.numOfDisplayedOtherDeals = 3;
		/** create deal **/
    	$scope.add = function(){
    		$scope.action = "Create";
    		$scope.hideAdd = true;
    		$rootScope.$broadcast('SHOW_ADD_DEAL_FORM');
    	}
    	
		$scope.$on('DEALS_UPDATED',function(events,args){
			$state.reload();
		});
    	/** create deal **/
		/** expenses, panels & chart **/
		$scope.itemsByPage = 10;
		$scope.thisYear = new Date().getFullYear();
		$scope.years = [{name:2013},{name:2014},{name:2015},{name:2016}];
		
		$scope.thisMonth = new Date().getMonth();
		
		$scope.thisMonthText = "Monthly";
		$scope.monthlyRecords = new Array();
		$scope.DisplayMonthlyRecords = new Array();
			
		$scope.serviceEvents = new Array();
		$scope.expenseClaims = new Array();
		/** expenses, panels & chart **/
		
		/** follow requests **/
		$scope.followRequests = new Array();
		$scope.follow = function(followRequest){
			var follower = new DealFollower();
			follower.dealId = followRequest.dealId;
			follower.userId = $rootScope.currentUser.id;
			DealFollower.save(follower).$promise.then(function(follower){
				followRequest.isResponded = 1;
				followRequest.$update();
			});
		}
		$scope.notFollow = function(followRequest){
			followRequest.$delete();
		}
		/** follow requests **/
		
		/** css color counter **/
		var counter = 0;
		var colors = [,"Navy","Blue","Green","Cyan","Maroon","Olive","Grey","DarkOrchid","DarkGoldenRod","BurlyWood","Aqua","Salmon","BlanchedAlmond","LemonChiffon"];
		/** set a delay for getting $rootScope.currentUser **/
		$timeout(function(){
			if($rootScope.currentUser!=null && typeof $rootScope.currentUser!='undefined'){
				Product.query().$promise.then(function(products){
					$scope.products = products;
				});
				
				Customer.query().$promise.then(function(customers){
					$scope.customers = customers;
				});
				UserExpenseClaim.query({userId:$rootScope.currentUser.id}).$promise.then(function(expenseClaims){
					$scope.expenseClaims = expenseClaims;
				});
				/** retrieve service(personal) events **/
				UserServiceEvent.query({userId:$rootScope.currentUser.id}).$promise.then(function(events){
				    events.forEach(function(evt){
				    	var event = {id:evt.id,title:evt.title,start:evt.start,end:evt.end,color:'Black',dealId:evt.dealId,userId:evt.userId,charge:evt.charge,location:evt.location};
				    	$scope.events.push(event);
				    	$scope.serviceEvents.push(event);
				    });
				});
				FollowingDeal.query({userId:$rootScope.currentUser.id}).$promise.then(function(followingDeals){
					followingDeals.forEach(function(followingDeal){
						var color = colors[counter%(colors.length)];
						counter++;
						Deal.get({id:followingDeal.dealId}).$promise.then(function(deal){
							/** retrieve deal's events **/
							DealEvent.query({dealId:deal.id}).$promise.then(function(events){
								events.forEach(function(evt){
							    	var event = {id:evt.id,title:evt.title,start:evt.start,end:evt.end,color:color,dealId:evt.dealId};
							    	$scope.events.push(event);
								});					
							});						
							followingDeal.productId = deal.productId;
							followingDeal.quantity = deal.quantity;
							followingDeal.totalPrice = deal.totalPrice;
							followingDeal.customerId = deal.customerId;
							followingDeal.companyId = deal.companyId;
							followingDeal.dealStatus = deal.dealStatus;
							followingDeal.dateCreated = deal.dateCreated;
							followingDeal.dateClosed = deal.dateClosed;
							
							Product.get({id:deal.productId}).$promise.then(function(product){
								followingDeal.productName = product.name;
								Company.get({id:deal.companyId}).$promise.then(function(company){
									followingDeal.companyName = company.name;
									Customer.get({id:deal.customerId}).$promise.then(function(customer){
										followingDeal.customerName = customer.name;
										if(followingDeal.isOwner){
											$scope.ownDeals.push(followingDeal);
										} else if(!followingDeal.isOwner){
											$scope.otherDeals.push(followingDeal);
										}
									});
								});
							});
							
						});	
					});
				});
				DealFollowRequest.query({inviteeId:$rootScope.currentUser.id}).$promise.then(function(followRequests){
					followRequests.forEach(function(followRequest){
						UserById.get({id:followRequest.userId}).$promise.then(function(user){
							followRequest.inviterName = user.firstname+" "+user.lastname; 
						});
					});
					$scope.followRequests = followRequests;
				});
				UserMonthlyRecord.query({userId:$rootScope.currentUser.id}).$promise.then(function(monthlyRecords){
					$scope.monthlyRecords = monthlyRecords;
					$scope.DisplayMonthlyRecords = [].concat($scope.monthlyRecords);
				});
			}
		},1000);
		
		/** set a delay for retrieving ownDeals and otherDeals **/
		$timeout(function(){
			/** pagination **/
			$scope.totalOwnDeals = $scope.ownDeals.length;
			$scope.ownDealsCurrentPage = 1;
			$scope.pageCapacity = 10;
			$scope.ownDealsNoOfPages = Math.ceil($scope.totalOwnDeals / $scope.pageCapacity);
			$scope.totalOtherDeals = $scope.otherDeals.length;
			$scope.otherDealsCurrentPage = 1;
			$scope.otherDealsNoOfPages = Math.ceil($scope.totalOtherDeals / $scope.pageCapacity);
			
			$scope.totalServiceEvents = $scope.serviceEvents.length;
			$scope.serviceEventsCurrentPage = 1;
			$scope.serviceEventsNoOfPages = Math.ceil($scope.totalServiceEvents / $scope.pageCapacity);
			/** end of pagination **/
		},1000);
		
		

	    /* edit on eventClick */
	    var editOnEventClick = function(calEvent, jsEvent, view){
	    	if(calEvent.userId){
		    	UserServiceEvent.get({userId:calEvent.userId,id:calEvent.id}).$promise.then(function(event){
		    		$scope.event.id = event.id;
		    		$scope.event.title = event.title;
		    		$scope.event.start = event.start;
		    		$scope.event.end = event.end;
		    		$scope.event.location = event.location;
				});
	    	} else{
	    		DealEvent.get({dealId:calEvent.dealId,id:calEvent.id}).$promise.then(function(event){
		    		$scope.event.id = event.id;
		    		$scope.event.title = event.title;
		    		$scope.event.start = event.start;
		    		$scope.event.end = event.end;
		    		$scope.event.location = event.location;
				});	
	    	}
    	};

		var viewOnDoubleClick = function(date, cell) {
			  cell.bind('dblclick', function() {
		    	  $('#events-calendar').fullCalendar('gotoDate',date);
		    	  $('#events-calendar').fullCalendar('changeView','agendaDay')
	    	  });
		}
	    /* config object */
	    $scope.uiConfig = {
	      calendar:{
	        height: 400,
	        timezone: 'local',
	        editable: true,
	        header:{
	          left: 'month agendaWeek agendaDay',
	          center: 'title',
	          right: 'today prev,next'
	        },
	        eventClick: editOnEventClick,
	        dayRender: viewOnDoubleClick
	      }
	    };
		 
	    /* event source that calls a function on every view switch */
	    $scope.eventsF = function (start, end, timezone, callback) {
	      var s = new Date(start).getTime() / 1000;
	      var e = new Date(end).getTime() / 1000;
	      var m = new Date(start).getMonth();
	      var events = [{title: 'Feed Me ' + m,start: s + (50000),end: s + (100000),allDay: false, className: ['customFeed']}];
	      callback(events);
	    };
	    $scope.eventSources = [$scope.events, $scope.eventSource, $scope.eventsF];
	    
	    /** own deals' filter configuration **/
	    $scope.displayViewAllOwnDealsButton = true;
		$scope.displayAllOwnDeals = function(){
			$scope.allOwnDealsDisplayed = true;
			$scope.numOfDisplayedOwnDeals = $scope.pageCapacity;
			$scope.displayViewAllOwnDealsButton = false;
			$scope.displayCloseAllOwnDealsButton = true;
		}
		$scope.closeAllOwnDeals = function(){
			$scope.allOwnDealsDisplayed = false;
			$scope.numOfDisplayedOwnDeals = 3;
			$scope.displayViewAllOwnDealsButton = true;
			$scope.displayCloseAllOwnDealsButton = false;
		}
		
		$scope.$watch('searchOwnDeals', function (newVal, oldVal) {
			$scope.filtered = filterFilter($scope.ownDeals, newVal);
			$scope.totalOwnDeals = $scope.filtered.length;
			$scope.OwnDealsNoOfPages = Math.ceil($scope.totalOwnDeals / $scope.pageCapacity);
			$scope.ownDealsCurrentPage = 1;
		}, true);
		
	    /** other deals' filter configuration **/
	    $scope.displayViewAllOtherDealsButton = true;
		$scope.displayAllOtherDeals = function(){
			$scope.allOtherDealsDisplayed = true;
			$scope.numOfDisplayedOtherDeals = $scope.pageCapacity;
			$scope.displayViewAllOtherDealsButton = false;
			$scope.displayCloseAllOtherDealsButton = true;
		}
		$scope.closeAllOtherDeals = function(){
			$scope.allOtherDealsDisplayed = false;
			$scope.numOfDisplayedOtherDeals = 3;
			$scope.displayViewAllOtherDealsButton = true;
			$scope.displayCloseAllOtherDealsButton = false;
		}
		
		$scope.$watch('searchOtherDeals', function (newVal, oldVal) {
			$scope.filtered = filterFilter($scope.otherDeals, newVal);
			$scope.totalOtherDeals = $scope.filtered.length;
			$scope.OtherDealsNoOfPages = Math.ceil($scope.totalOtherDeals / $scope.pageCapacity);
			$scope.otherDealsCurrentPage = 1;
		}, true);
		
		/** service events' filter configuration**/
	    $scope.displayViewAllServiceEventsButton = true;
		$scope.displayAllServiceEvents = function(){
			$scope.allServiceEventsDisplayed = true;
			$scope.numOfDisplayedServiceEvents = $scope.pageCapacity;
			$scope.displayViewAllServiceEventsButton = false;
			$scope.displayCloseAllServiceEventsButton = true;
		}
		$scope.closeAllServiceEvents = function(){
			$scope.allServiceEventsDisplayed = false;
			$scope.numOfDisplayedServiceEvents = 3;
			$scope.displayViewAllServiceEventsButton = true;
			$scope.displayCloseAllServiceEventsButton = false;
		}
		
		$scope.$watch('searchServiceEvents', function (newVal, oldVal) {
			$scope.filtered = filterFilter($scope.serviceEvents, newVal);
			$scope.totalServiceEvents = $scope.filtered.length;
			$scope.ServiceEventsNoOfPages = Math.ceil($scope.totalServiceEvents / $scope.pageCapacity);
			$scope.serviceEventsCurrentPage = 1;
		}, true);
		
		
		$scope.$watch('thisMonth',function(){
			$scope.thisMonthRecord = $scope.getRecordByYearmonth($scope.DisplayMonthlyRecords,$scope.thisYear,$scope.thisMonth);
			if(typeof $scope.thisMonthRecord != "undefined"){
				$scope.thisMonthTargetPercentage = Math.round(100*($scope.monthlyAmount[$scope.thisMonth]+$scope.monthlyServicesCharge[$scope.thisMonth])/$scope.thisMonthRecord.salesTarget);
				$scope.thisMonthExpensePercentage = Math.round(100*$scope.monthlyExpenseClaims[$scope.thisMonth]/$scope.thisMonthRecord.claimableExpenses);
			} else{
				$scope.thisMonthTargetPercentage = 0;
				$scope.thisMonthExpensePercentage = 0;
			}
		});
		
		$scope.$watch('thisYear', function(newVal,oldVal){
			/** reset data **/
			console.log($scope.thisYear);
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
			$timeout(function(){
				for(var i=1;i<=12;i++){
					$scope.getDealsByMonth(i);
				}
				/** yearly,monthly target and expenses **/
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
			},1500);

		});
		
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
			$scope.ownDeals.forEach(function(deal){
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
		$scope.change = function(){
			console.log($scope.thisYear);
		}
	}]);
})();
