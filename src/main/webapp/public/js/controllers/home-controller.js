(function(){
	angular.module('salespusher.controllers')
	.controller('HomeCtrl',['$rootScope','$scope','$timeout','$state',"$http",'filterFilter','ModalService','UserById','Product',
                'Company','Customer','Deal','MonthlyDeal','DealEvent','DealFollower','FollowingDeal','UserServiceEvent','MonthlyUserServiceEvent',
                'DealRequestByRequesteeId','LeadByUser',
                function($rootScope,$scope,$timeout,$state,$http,filterFilter,ModalService,UserById,Product,
                		Company,Customer,Deal,MonthlyDeal,DealEvent,DealFollower,FollowingDeal,UserServiceEvent,MonthlyUserServiceEvent,
                		DealRequestByRequesteeId,LeadByUser){
		$scope.itemsByPage = 10;
		/** css color counter **/
		var counter = 0;
		var colors = [,"Navy","Blue","Green","Cyan","Maroon","Olive","Grey","DarkOrchid","DarkGoldenRod","BurlyWood","Aqua","Salmon","BlanchedAlmond","LemonChiffon"];
		$scope.eventSource = {};
		$scope.events = new Array();
		$scope.numOfDisplayedServiceEvents = 3;
		$scope.event = {};
		$scope.ownDeals = new Array();
		$scope.numOfDisplayedOwnDeals = 3;
		$scope.otherDeals = new Array();
		$scope.numOfDisplayedOtherDeals = 3;
		$scope.serviceEvents = new Array();
		$scope.dealRequests = new Array();
		$scope.followRequests = new Array();
		$scope.leads = new Array();
		$scope.newLeads = new Array();
		$scope.contactedLeads = new Array();
		$scope.qualifiedLeads = new Array();
		$scope.unqualifiedLeads = new Array();
		$scope.newLeadLimitTo = 5;
		$scope.contactedLeadLimitTo = 5;
		$scope.loadNewLeads = function(){
			$scope.newLeadLimitTo+=5;
		};
		$scope.loadContactedLeads = function(){
			$scope.contactedLeadLimitTo+=5;
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
			ModalService.showModal({
		    	templateUrl: "templates/directives/sp-event-card.html",
		    	controller: "EventCardCtrl",
		    	inputs: {
				 	event: $scope.event
		    	}
		    })
			.then(function(modal) {
				modal.element.modal();
				modal.close.then(function(result) {
				});
	    	});	
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
    		$scope.dealAction = "Create";
    		$scope.deal = {};
			ModalService.showModal({
		    	templateUrl: "templates/directives/sp-deal-form.html",
		    	controller: "DealFormCtrl",
		    	inputs: {
		    		header: 'Edit Deal',
				 	deal: $scope.deal,
				 	dealAction: $scope.dealAction,
				 	products: $scope.products,
				 	customers: $scope.customers
		    	}
		    })
			.then(function(modal) {
				modal.element.modal();
				modal.close.then(function(result) {
				});
	    	});	
    	};

    	$scope.addLead = function(){
			$scope.leadAction = "Create";
			$scope.lead = {};
			ModalService.showModal({
		    	templateUrl: "templates/directives/sp-lead-form.html",
		    	controller: "LeadFormCtrl",
		    	inputs: {
		    		header: 'Add Lead',
				 	lead: $scope.lead,
				 	leadAction: $scope.leadAction,
				 	products: $scope.products,
				 	customers: $scope.customers,
				 	companies: $scope.companies
		    	}
		    })
			.then(function(modal) {
				modal.element.modal();
				modal.close.then(function(result) {
				});
	    	});	
		}     	
		$scope.$on('DEALS_UPDATED',function(events,args){
			$state.reload();
		});
    	/** create deal **/

		$scope.$on('DEALS_UPDATED',function(events,args){
			$state.reload();
		});

		$scope.$on('LEADS_UPDATED',function(events,args){
			$state.reload();
		});

		/** set a delay for getting $rootScope.currentUser **/
		$timeout(function(){
			if($rootScope.currentUser!=null && typeof $rootScope.currentUser!='undefined'){
				Deal.query().$promise.then(function(deals){
							$scope.deals = deals;
				});
	
				Product.query().$promise.then(function(products){
					$scope.products = products;
				});
				
				Customer.query().$promise.then(function(customers){
					$scope.customers = customers;
				});
				Company.query().$promise.then(function(companies){
					$scope.companies = companies;
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
							followingDeal.isParent = deal.isParent;
							followingDeal.parentId = deal.parentId;
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
				LeadByUser.query({userId:$rootScope.currentUser.id}).$promise.then(function(leads){
					leads.forEach(function(lead){
						if(lead.interests!=""){
							lead.products = angular.fromJson(lead.interests);
						} else{
							lead.products = new Array();
						}
						$scope.leads.push(lead);
						if(lead.leadStatus==="NEW"){
							$scope.newLeads.push(lead);
						} else if(lead.leadStatus==="CONTACTED"){
							$scope.contactedLeads.push(lead);
						} else if(lead.leadStatus==="QUALIFIED"){
							$scope.qualifiedLeads.push(lead);
						} else if(lead.leadStatus==="UNQUALIFIED"){
							$scope.unqualifiedLeads.push(lead);
						}
					});
				});
			}
		},250);
		
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

		$scope.showOverview = function(){
			ModalService.showModal({
		    	templateUrl: "templates/directives/sp-staff-overview.html",
		    	controller: "StaffOverviewCtrl",
		    	inputs: {
		    	}
		    })
			.then(function(modal) {
				modal.element.modal();
				modal.close.then(function(result) {
				});
	    	});	
		}
	}]);
})();
