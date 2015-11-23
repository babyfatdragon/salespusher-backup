(function(){
	angular.module('salespusher.controllers')
	.controller('HomeCtrl',['$rootScope','$scope','$timeout','$state',"$http",'filterFilter','UserById','Product',
	                        'Company','Customer','Deal','MonthlyDeal','DealEvent','DealFollower','FollowingDeal','UserServiceEvent','MonthlyUserServiceEvent',
	                        'MonthlyUserExpenseClaim','UserMonthlyRecord','DealFollowRequest','DealRequestByRequesteeId',
	                        function($rootScope,$scope,$timeout,$state,$http,filterFilter,UserById,Product,
	                        		Company,Customer,Deal,MonthlyDeal,DealEvent,DealFollower,FollowingDeal,UserServiceEvent,MonthlyUserServiceEvent,
	                        		MonthlyUserExpenseClaim,UserMonthlyRecord,DealFollowRequest,DealRequestByRequesteeId){
		
		$scope.itemsByPage = 10;
		$scope.thisYear = 1970;
		$scope.thisMonth = 12;
		$scope.years = [{name:2013},{name:2014},{name:2015},{name:2016}];
		/** css color counter **/
		var counter = 0;
		var colors = [,"Navy","Blue","Green","Cyan","Maroon","Olive","Grey","DarkOrchid","DarkGoldenRod","BurlyWood","Aqua","Salmon","BlanchedAlmond","LemonChiffon"];
		$scope.eventSource = {};
		$scope.events = new Array();
		$scope.numOfDisplayedServiceEvents = 3;
		$scope.event = {};
		$scope.ownDeals = new Array();
		$scope.numOfDisplayedOwnDeals = 3;
		$scope.otherDeals = new Array();;
		$scope.numOfDisplayedOtherDeals = 3;
		$scope.monthlyRecords = new Array();
		$scope.DisplayMonthlyRecords = new Array();
		$scope.serviceEvents = new Array();
		$scope.dealRequests = new Array();
		$scope.followRequests = new Array();

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
		/** follow requests **/
		$scope.follow = function(followRequest){
			var follower = new DealFollower();
			follower.dealId = followRequest.dealId;
			follower.userId = $rootScope.currentUser.id;
			DealFollower.save(follower).$promise.then(function(follower){
				followRequest.isResponded = 1;
				followRequest.$update();
	    		$state.go('dealShow',({id:followRequest.dealId}));
			});
		}
		$scope.notFollow = function(followRequest){
			followRequest.$delete();
		}

		/** set a delay for getting $rootScope.currentUser **/
		$timeout(function(){
			if($rootScope.currentUser!=null && typeof $rootScope.currentUser!='undefined'){		

				Product.query().$promise.then(function(products){
					$scope.products = products;
				});
				
				Customer.query().$promise.then(function(customers){
					$scope.customers = customers;
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
				UserMonthlyRecord.query({userId:$rootScope.currentUser.id}).$promise.then(function(monthlyRecords){
					$scope.monthlyRecords = monthlyRecords;
					$scope.DisplayMonthlyRecords = [].concat($scope.monthlyRecords);
					/* when monthly records ready, start fetch data*/
					$scope.thisYear = new Date().getFullYear();
					$scope.thisMonth = new Date().getMonth();
					$scope.thisMonthText = $scope.barLabels[$scope.thisMonth];	
				});
				DealFollowRequest.query({inviteeId:$rootScope.currentUser.id}).$promise.then(function(followRequests){
					followRequests.forEach(function(followRequest){
						UserById.get({id:followRequest.userId}).$promise.then(function(user){
							followRequest.inviterName = user.firstname+" "+user.lastname; 
						});
					});
					$scope.followRequests = followRequests;
				});
				DealRequestByRequesteeId.query({requesteeId:$rootScope.currentUser.id}).$promise.then(function(dealRequests){
					dealRequests.forEach(function(dealRequest){
						UserById.get({id:dealRequest.userId}).$promise.then(function(user){
							dealRequest.requesterName = user.firstname+" "+user.lastname; 
						});
					});
					$scope.dealRequests = dealRequests;
				});
			}
		},800);
		
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
				
		$scope.$watch('thisYear', function(newVal,oldVal){
			/** reset data **/
			if($rootScope.currentUser!=null && typeof $rootScope.currentUser!='undefined'){
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
			}
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
			MonthlyDeal.query({year:$scope.thisYear,month:month,userId:$rootScope.currentUser.id}).$promise.then(function(deals){
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
			MonthlyUserServiceEvent.query({year:$scope.thisYear,month:month,userId:$rootScope.currentUser.id}).$promise.then(function(serviceEvents){
				$scope.yearlyServices.push(serviceEvents);
				$scope.monthlyServices[month].push(serviceEvents);
				serviceEvents.forEach(function(serviceEvent){
					$scope.monthlyServicesCharge[month]+=serviceEvent.charge;
					$scope.yearlyServicesCharge+=serviceEvent.charge;
				});
			});
			MonthlyUserExpenseClaim.query({year:$scope.thisYear,month:month,userId:$rootScope.currentUser.id}).$promise.then(function(expenseClaims){
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
	}]);
})();
