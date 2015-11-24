(function(){
	angular.module('salespusher.controllers')
	.controller('DealShowCtrl',['$rootScope','$scope','$timeout','$state','$stateParams','filterFilter','User','Product',
	                            'Company','Customer','Deal','DealComment','DealEvent','DealFollower','DealServiceEvent','ServiceDocument',
	                            'DealExpenseClaim','uiCalendarConfig','DealFollowRequest','DealRequestByDealId','ModalService',
	                            function($rootScope,$scope,$timeout,$state,$stateParams,filterFilter,User,Product,
	                            		Company,Customer,Deal,DealComment,DealEvent,DealFollower,DealServiceEvent,ServiceDocument,
	                            		DealExpenseClaim,uiCalendarConfig,DealFollowRequest,DealRequestByDealId,ModalService){
    	$scope.itemsByPage = 5;
		$scope.action = "Create";
		$scope.serviceAction = "Create";
		$scope.expenseClaimAction = "Create";
		$scope.isFollow = false;
		$scope.deal = {};	
		$scope.event = {}; 
		$scope.serviceEvent = {};
		$scope.eventSource = {};
		$scope.serviceEventSource = {};
		$scope.followObj = {};
		$scope.expenseClaim = {};
		$scope.comments = new Array();
		$scope.events = new Array();
		$scope.serviceEvents = new Array();
		$scope.displayServiceEvents = new Array();
		$scope.followers = new Array();
		$scope.dealRequests = new Array();
		$scope.displayDealRequests = new Array();
		$scope.expenseClaims = new Array();
		$scope.displayExpenseClaims = new Array();
    	/** follow request **/
    	$scope.followRequest = {};
    	$scope.followRequest.inviteeIds = new Array();
    	$scope.usersCopy = new Array();
		$scope.comment = new DealComment();

    	$scope.emptyInvitees = function(){
    		$scope.followRequest.inviteeIds = [];
    	};
    	$scope.invite = function(){
    		console.log($scope.followRequest.inviteeIds);
    		$scope.followRequest.inviteeIds.forEach(function(inviteeId){
    			var invitee = new DealFollowRequest();
    			invitee.dealId=$scope.deal.id;
    			invitee.userId=$rootScope.currentUser.id;
    			invitee.inviteeId=inviteeId;
    			invitee.isResponded = 0;
    			DealFollowRequest.save(invitee).$promise.then(function(){
    			});
    		});
    		$scope.followRequest.inviteeIds = [];
    	};

    	/** follow request **/
    	$timeout(function(){
    		User.query().$promise.then(function(users){
    			$scope.users = users;
    			angular.copy(users,$scope.usersCopy);
    			Product.query().$promise.then(function(products){
    				$scope.products = products;
    				Company.query().$promise.then(function(companies){
    					$scope.companies = companies;
    					Customer.query().$promise.then(function(customers){
    						$scope.customers = customers;
    						Deal.get({id:$stateParams.id}).$promise.then(function(deal){
    							var product = $scope.getObjectById($scope.products,deal.productId);
    							deal.productName = product.name;
    							deal.categoryOneId = product.categoryOneId;
    							deal.categoryTwoId = product.categoryTwoId;
    							var customer = $scope.getObjectById($scope.customers,deal.customerId);
    							deal.customerName = customer.name;
    							var company = $scope.getObjectById($scope.companies,customer.companyId);
    							deal.companyName = company.name;
    							var user = $scope.getObjectById($scope.users,deal.userId);
    							deal.userName = user.firstname+" "+user.lastname;
    							$scope.deal = deal;
    							/** retrieve comments **/
    							DealComment.query({dealId:$stateParams.id}).$promise.then(function(comments){
    								for(var i=0;i<comments.length;i++){
    									var user = $scope.getObjectById($scope.users,comments[i].userId);
    									if(user!=null) comments[i].userName = user.firstname+" "+user.lastname;
    								}
    								$scope.comments = comments;
    								/** pagination **/
    								$scope.totalItems = comments.length;
    								$scope.currentPage = 1;
    								$scope.pageCapacity = 5;
    								$scope.noOfPages = Math.ceil($scope.totalItems / $scope.pageCapacity);
    							});
    							DealEvent.query({dealId:$stateParams.id}).$promise.then(function(events){
    								events.forEach(function(evt){
    							    	var event = {id:evt.id,title:evt.title,start:evt.start,end:evt.end,dealId:evt.dealId,location:evt.location,isUserCreated:true};
    							    	$scope.events.push(event);					
    						    	});

    							});
    							DealServiceEvent.query({dealId:$stateParams.id}).$promise.then(function(events){
    								events.forEach(function(evt){
    									var user = $scope.getObjectById($scope.users,evt.userId);
    									evt.userName = user.firstname+" "+user.lastname;
    									var event = {id:evt.id,title:evt.title,start:evt.start,end:evt.end,dealId:evt.dealId,userId:evt.userId,userName:evt.userName,location:evt.location,charge:evt.charge};
    									ServiceDocument.query({serviceId:event.id}).$promise.then(function(serviceDocuments){
    										event.serviceDocuments = serviceDocuments;
    										/** for smart table **/
    										$scope.serviceEvents.push(event);
    										/** for calendar display **/
    								    	$scope.displayServiceEvents.push(event);
    									});
    								});
    							});
    							DealFollower.query({dealId:$stateParams.id}).$promise.then(function(followers){
    								followers.forEach(function(follower){
    									if(follower.userId===$rootScope.currentUser.id){
    										$scope.isFollow = true;
    										/** if current user is following, retrieve followObj and clear unread **/
    										/** make a copy of follower, otherwise $update operation will override the userName attribute **/
    										$scope.followObj = angular.copy(follower);
    										$scope.followObj.unreadComments = 0;
    										$scope.followObj.unreadEvents = 0;
    										$scope.followObj.unreadFiles = 0;
    										$scope.followObj.$update();
    									}
    									var user = $scope.getObjectById($scope.users,follower.userId);
    									follower.userName = user.firstname+" "+user.lastname;
    									$scope.followers.push(follower);
    									
    									if(user!=null){
    										for(var i=0;i<$scope.usersCopy.length;i++){
    											if($scope.usersCopy[i].id===user.id){
    												$scope.usersCopy.splice(i, 1);
    												break;
    											}
    										}
    									}
    								});
    							});
    							DealExpenseClaim.query({dealId:$stateParams.id}).$promise.then(function(expenseClaims){
    								expenseClaims.forEach(function(expenseClaim){
        								var user = $scope.getObjectById($scope.users,expenseClaim.userId);
        								expenseClaim.userName = user.firstname+" "+user.lastname;
        								$scope.expenseClaims.push(expenseClaim);
        								$scope.displayExpenseClaims.push(expenseClaim);
    								});
    							});
    							DealRequestByDealId.query({dealId:$stateParams.id}).$promise.then(function(dealRequests){
    								dealRequests.forEach(function(dealRequest){
        								var user = $scope.getObjectById($scope.users,dealRequest.requesteeId);
        								if(user!=null) dealRequest.requesteeName = user.firstname+" "+user.lastname;
        								var user = $scope.getObjectById($scope.users,dealRequest.userId);
        								if(user!=null) dealRequest.requesterName = user.firstname+" "+user.lastname;
        								if(dealRequest.isComplete){
        									dealRequest.isCompleteText = "YES";
        								} else{
        									dealRequest.isCompleteText = "NO";
        								}
            							if($rootScope.currentUser.id===dealRequest.userId){
            								dealRequest.usage = "Request";
            							}
            							if($rootScope.currentUser.id===dealRequest.requesteeId){
            								dealRequest.usage = "Response";
            							}
        								$scope.dealRequests.push(dealRequest);
        								$scope.displayDealRequests.push(dealRequest);
    								});
    							});
    						});
    					});
    				});
    			});
    		});  		
    	},500);
		
	    /* edit on eventClick */
	    var editEventOnClick = function(calEvent, jsEvent, view){
    		$scope.action="Update";
	    	if(typeof calEvent.charge!='undefined'){
		    		$scope.eventType = 'Service';
		    	DealServiceEvent.get({dealId:$stateParams.id,id:calEvent.id}).$promise.then(function(event){
		    		$scope.event.id = event.id;
		    		$scope.event.title = event.title;
		    		$scope.event.userId = event.userId;
		    		$scope.event.startDate = event.start;
		    		$scope.event.startTime = event.start;
		    		$scope.event.endDate = event.end;
		    		$scope.event.endTime = event.end;
		    		$scope.event.location = event.location;
		    		$scope.event.charge = event.charge;
		    		$scope.showServiceForm = true;
				});
	    	} else{
		    		$scope.eventType = 'Event';
	   			DealEvent.get({dealId:$stateParams.id,id:calEvent.id}).$promise.then(function(event){
		    		$scope.event.id = event.id;
		    		$scope.event.title = event.title;
		    		$scope.event.startDate = event.start;
		    		$scope.event.startTime = event.start;
		    		$scope.event.endDate = event.end;
		    		$scope.event.endTime = event.end;
		    		$scope.event.location = event.location;
			    	$scope.showForm = true;
				});
	    	}
			ModalService.showModal({
		    	templateUrl: "templates/directives/sp-event-form.html",
		    	controller: "EventFormCtrl",
		    	inputs: {
		    		header: 'Edit Event',
	    			event: $scope.event,
				 	deal: $scope.deal,
	    		 	action: $scope.action,
		    		eventType: $scope.eventType,
		    	}
		    })
			.then(function(modal) {
				modal.element.modal();
				modal.close.then(function(result) {
					$scope.showForm = false;
				});
	    	});
    	};
		/* update on Drop */
		var updateEventOnDrop = function(event, delta, revertFunc, jsEvent, ui, view){
			if(typeof event.charge!='undefined'){
				DealServiceEvent.get({dealId:$stateParams.id,id:event.id}).$promise.then(function(draggedEvent){
					draggedEvent.start = event.start;
					draggedEvent.end = event.end;
					draggedEvent.$update();
					console.log(event);
				});
			} else{
				DealEvent.get({dealId:$stateParams.id,id:event.id}).$promise.then(function(draggedEvent){
					draggedEvent.start = event.start;
					draggedEvent.end = event.end;
					draggedEvent.$update();
					console.log(event);
				});
			}

	    };
	    /* update on Resize */
	    var updateEventOnResize = function(event, delta, revertFunc, jsEvent, ui, view ){
			if(typeof event.charge!='undefined'){
		    	DealServiceEvent.get({dealId:$stateParams.id,id:event.id}).$promise.then(function(draggedEvent){
					draggedEvent.start = event.start;
					draggedEvent.end = event.end;
					draggedEvent.$update();
					console.log(event);
				});
			} else{
				DealEvent.get({dealId:$stateParams.id,id:event.id}).$promise.then(function(draggedEvent){
					draggedEvent.start = event.start;
					draggedEvent.end = event.end;
					draggedEvent.$update();
					console.log(event);
				});
			}

		};
		var viewEventOnDoubleClick = function(date, cell) {
			  cell.bind('dblclick', function() {
		    	  $('#events-calendar').fullCalendar('gotoDate',date);
		    	  $('#events-calendar').fullCalendar('changeView','agendaDay');
					console.log(date);
	    	  });
		}
		
	    /* event source that calls a function on every view switch */
	    $scope.eventsF = function (start, end, timezone, callback) {
	      var s = new Date(start).getTime() / 1000;
	      var e = new Date(end).getTime() / 1000;
	      var m = new Date(start).getMonth();
	      var events = [{title: 'Feed Me ' + m,start: s + (50000),end: s + (100000),allDay: false, className: ['customFeed']}];
	      //callback(events);
	    };
	    $scope.eventSource = {
	    	events: $scope.events,
	    	eventDataTransform: $scope.eventsF,
	    	color: 'green'
	    };
	    $scope.serviceEventSource = {
	    	events: $scope.displayServiceEvents,
	    	eventDataTransform: $scope.eventsF,
	    };
	    $scope.eventSources = [$scope.eventSource,$scope.serviceEventSource];
	    $scope.serviceEventSources = [$scope.serviceEventSource];

	    /* config object */
	    $scope.uiConfig = {
	      eventCalendar:{
	        height: 400,
	        timezone: 'local',
	        editable: true,
            customButtons: {
		        serviceButton: {
		            text: 'Show Services',
		            click: function() {
		            	$('#events-calendar').fullCalendar('removeEvents');
		            	$('#events-calendar').fullCalendar('addEventSource',$scope.displayServiceEvents);
		            }
		        },
		        eventButton: {
		            text: 'Show Events',
		            click: function() {
		            	$('#events-calendar').fullCalendar('removeEvents');
		            	$('#events-calendar').fullCalendar('addEventSource',$scope.events);
		            }
		        },
		        allButton: {
		            text: 'Show All',
		            click: function() {
		            	console.log("jkl");
		            	$('#events-calendar').fullCalendar('removeEvents');
		            	$('#events-calendar').fullCalendar('addEventSource',$scope.events);
		            	$('#events-calendar').fullCalendar('addEventSource',$scope.displayServiceEvents);
		            	console.log($scope.eventSources);
		            }
		        },
		    },
	        header:{
	          left: 'month agendaWeek agendaDay today',
	          center: 'title',
	          right: 'eventButton serviceButton allButton prev,next'
	        },
	        eventClick: editEventOnClick,
	        eventDrop: updateEventOnDrop,
	        eventResize: updateEventOnResize,
	        dayRender: viewEventOnDoubleClick
	      }
	    };
		 
		$scope.add = function(){
			$scope.action = "Create";
			$scope.eventType = 'Event';
			$scope.showForm = true;
			ModalService.showModal({
		    	templateUrl: "templates/directives/sp-event-form.html",
		    	controller: "EventFormCtrl",
		    	inputs: {
		    		header: 'Create New Event',
	    			event: $scope.event,
    			 	deal: $scope.deal,
	    		 	action: $scope.action,
		    		eventType: $scope.eventType
		    	}
		    })
			.then(function(modal) {
				modal.element.modal();
				modal.close.then(function(result) {
					$scope.showForm = false;
				});
	    	});
		}
		$scope.addService = function(){
			$scope.action = "Create";
			$scope.eventType = 'Service';
			ModalService.showModal({
		    	templateUrl: "templates/directives/sp-event-form.html",
		    	controller: "EventFormCtrl",
		    	inputs: {
		    		header: 'Create New Service',
	    			event: $scope.event,
    			 	deal: $scope.deal,
	    		 	action: $scope.action,
		    		eventType: $scope.eventType
		    	}
		    })
			.then(function(modal) {
				modal.element.modal();
				modal.close.then(function(result) {
					$scope.showForm = false;
				});
	    	});
		}

    	$scope.editServiceEvent = function(serviceEventId){
    			$scope.action= "Update";
	    		$scope.eventType = "Service";
	    	DealServiceEvent.get({dealId:$stateParams.id,id:serviceEventId}).$promise.then(function(event){
	    		$scope.event.id = event.id;
	    		$scope.event.title = event.title;
	    		$scope.event.userId = event.userId;
	    		$scope.event.startDate = event.start;
	    		$scope.event.startTime = event.start;
	    		$scope.event.endDate = event.end;
	    		$scope.event.endTime = event.end;
	    		$scope.event.location = event.location;
	    		$scope.event.charge = event.charge;
				ModalService.showModal({
			    	templateUrl: "templates/directives/sp-event-form.html",
			    	controller: "EventFormCtrl",
			    	inputs: {
			    		header: 'Edit Event',
		    			event: $scope.event,
					 	deal: $scope.deal,
		    		 	action: $scope.action,
			    		eventType: $scope.eventType,
			    	}
			    })
				.then(function(modal) {
					modal.element.modal();
					modal.close.then(function(result) {
					});
		    	});
			});
    	}
		$scope.addExpenseClaim = function(){
			$scope.expenseClaimAction = "Create";
			$scope.showExpenseClaimForm = "true";
		}
		$scope.addDealRequest = function(){
			$scope.dealRequest = {};
			$scope.dealRequest.usage="Request";
			$scope.dealRequestAction = "Create";
			$scope.showDealRequestForm = true;
		}
		$scope.editDeal = function(dealId){
			$scope.showDealForm = true;
    		$rootScope.$broadcast('SHOW_EDIT_DEAL_FORM',{editDeal:{id:dealId}});		
    	};
    	$scope.editExpenseClaim = function(expenseClaim){
    		$scope.expenseClaimAction = "Update";
    		$scope.expenseClaim = expenseClaim;
    		$scope.showExpenseClaimForm = true;
    	}
    	$scope.editDealRequest = function(dealRequest){
    		$scope.dealRequestAction = "Update";
    		$scope.dealRequest = dealRequest;
    		$scope.showDealRequestForm = true;
    	}
		$scope.follow = function(){
			var follower = new DealFollower();
			follower.dealId = $scope.deal.id;
			follower.userId = $rootScope.currentUser.id;
			DealFollower.save(follower).$promise.then(function(follower){
				$scope.followObj = follower;
				$scope.isFollow = true;
			});
		}
		$scope.unfollow = function(){
			if($scope.followObj!=null){
				$scope.followObj.$remove().then(function(){
					$scope.isFollow = false;
				});
			}
		}
    	
    	$scope.markAsComplete = function(dealRequest){
    		$scope.dealRequest = dealRequest;
    		$scope.dealRequest.isComplete = 1;
    		$scope.dealRequest.$update().then(function(){
    			$scope.dealRequests = new Array();
    			$scope.displayDealRequests = new Array();
    			DealRequestByDealId.query({dealId:$stateParams.id}).$promise.then(function(dealRequests){
					dealRequests.forEach(function(dealRequest){
						var user = $scope.getObjectById($scope.users,dealRequest.requesteeId);
						dealRequest.requesteeName = user.firstname+" "+user.lastname;
						if(dealRequest.isComplete){
							dealRequest.isCompleteText = "YES";
						} else{
							dealRequest.isCompleteText = "NO";
						}
						$scope.dealRequests.push(dealRequest);
						$scope.displayDealRequests.push(dealRequest);
					});
				});
    		});
    	}
    	
		$scope.$on('DEALS_UPDATED',function(events,args){
			$state.reload();
		});
		
		$scope.$on('UPDATE_CANCELED',function(events,args){
			$scope.showDealForm = false;
		});	

		$scope.$on('COMMENTS_UPDATED',function(events,args){
			/** retrieve comments **/
			DealComment.query({dealId:$stateParams.id}).$promise.then(function(comments){
				for(var i=0;i<comments.length;i++){
					var user = $scope.getObjectById($scope.users,comments[i].userId);
					comments[i].userName = user.firstname+" "+user.lastname;
				}
				$scope.comments = comments;
			});
		});	
		
		$scope.$on('FORM_CANCELED',function(event,args){
			$scope.showForm = false;
		});
		$scope.$on('SERVICE_FORM_CANCELED',function(event,args){
			$scope.showServiceForm = false;
		});
		$scope.$on('EXPENSE_CLAIM_FORM_CANCELED',function(event,args){
			$scope.showExpenseClaimForm = false;
		});
		$scope.$on('DEAL_REQUEST_FORM_CANCELED',function(event,args){
			$scope.showDealRequestForm = false;
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
		$scope.getUserByUsername = function(username){
    		if($scope.users.length){
        		var result = $.grep($scope.users, function(element){
        			return element.username === usernmae;
    			});
        		if(result.length){
            		return result[0];
        		}
    		}
		}
		
		$scope.getServiceDocumentDirectory = function(fileName){
			return "/resources/services/documents/"+fileName;
		}
		
		$scope.getOriginDocumentName = function(fileName){
			return fileName.substr(fileName.indexOf("-")+1);
		}
		
		$scope.$watch('searchComments', function (newVal, oldVal) {
			$scope.filtered = filterFilter($scope.comments, newVal);
			$scope.totalItems = $scope.filtered.length;
			$scope.noOfPages = Math.ceil($scope.totalItems / $scope.pageCapacity);
			$scope.currentPage = 1;
		}, true);
	}]);
})();