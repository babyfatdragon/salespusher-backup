(function(){
	angular.module('salespusher.controllers')
	.controller('DealShowCtrl',['$rootScope','$scope','$timeout','$state','$stateParams','filterFilter','User','Product','Company','Customer','Deal','DealComment','DealEvent','DealFollower','DealServiceEvent','ServiceDocument','DealExpenseClaim','uiCalendarConfig',
	                            function($rootScope,$scope,$timeout,$state,$stateParams,filterFilter,User,Product,Company,Customer,Deal,DealComment,DealEvent,DealFollower,DealServiceEvent,ServiceDocument,DealExpenseClaim,uiCalendarConfig){
		$scope.deal = {};
		$scope.comment = new DealComment();
		$scope.comments = new Array();
		$scope.event = {}; /*used in form*/
		$scope.serviceEvent = {}; /*used in form*/
		$scope.action = "Create";
		$scope.eventSource = {};
		$scope.events = [];
		$scope.serviceEventSource = {};
		$scope.serviceEvents = [];
		$scope.displayServiceEvents = [];
		$scope.serviceAction = "Create";
		$scope.followers = [];
		$scope.isFollow = false;
		$scope.followObj = {};
		$scope.expenseClaim = {}; /* used in form */
		$scope.expenseClaimAction = "Create";
		$scope.expenseClaims = [];
		$scope.displayExpenseClaims = [];
    	$scope.itemsByPage = 5;
    	$timeout(function(){
    		User.query().$promise.then(function(users){
    			$scope.users = users;
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
    									comments[i].userName = user.firstname+" "+user.lastname;
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
    							    	var event = {id:evt.id,title:evt.title,start:evt.start,end:evt.end,dealId:evt.dealId,location:evt.location};
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
    						});
    					});
    				});
    			});
    		});  		
    	},500);

    	$scope.editDeal = function(dealId){
			$scope.showDealForm = true;
    		$rootScope.$broadcast('SHOW_EDIT_DEAL_FORM',{editDeal:{id:dealId}});		
    	};
    	$scope.editExpenseClaim = function(expenseClaim){
    		$scope.expenseClaimAction = "Update";
    		$scope.expenseClaim = expenseClaim;
    		$scope.showExpenseClaimForm = true;
    	}
    	
		$scope.$on('DEALS_UPDATED',function(events,args){
			$state.reload();
		});
		
		$scope.$on('UPDATE_CANCELED',function(events,args){
			$scope.showDealForm = false;
		});	
		
		
	    /* edit on eventClick */
	    var editEventOnClick = function(calEvent, jsEvent, view){
	    	DealEvent.get({dealId:$stateParams.id,id:calEvent.id}).$promise.then(function(event){
	    		$scope.action="Update";
	    		$scope.event.id = event.id;
	    		$scope.event.title = event.title;
	    		$scope.event.startDate = event.start;
	    		$scope.event.startTime = event.start;
	    		$scope.event.endDate = event.end;
	    		$scope.event.endTime = event.end;
	    		$scope.event.location = event.location;
	    		$scope.showForm = true;
	    		console.log($scope.event);
			});
    	};
	    var editServiceEventOnClick = function(calEvent, jsEvent, view){
	    	console.log("SERVICE DOUBLE CLICK");
	    	DealServiceEvent.get({dealId:$stateParams.id,id:calEvent.id}).$promise.then(function(event){
	    		$scope.serviceAction="Update";
	    		$scope.serviceEvent.id = event.id;
	    		$scope.serviceEvent.title = event.title;
	    		$scope.serviceEvent.userId = event.userId;
	    		$scope.serviceEvent.startDate = event.start;
	    		$scope.serviceEvent.startTime = event.start;
	    		$scope.serviceEvent.endDate = event.end;
	    		$scope.serviceEvent.endTime = event.end;
	    		$scope.serviceEvent.location = event.location;
	    		$scope.serviceEvent.charge = event.charge;
	    		$scope.showServiceForm = true;
	    		console.log($scope.serviceEvent);
			});
    	};

		/* update on Drop */
		var updateEventOnDrop = function(event, delta, revertFunc, jsEvent, ui, view){
			DealEvent.get({dealId:$stateParams.id,id:event.id}).$promise.then(function(draggedEvent){
				draggedEvent.start = event.start;
				draggedEvent.end = event.end;
				draggedEvent.$update();
				console.log(event);
			});
	    };
		var updateServiceEventOnDrop = function(event, delta, revertFunc, jsEvent, ui, view){
			DealServiceEvent.get({dealId:$stateParams.id,id:event.id}).$promise.then(function(draggedEvent){
				draggedEvent.start = event.start;
				draggedEvent.end = event.end;
				draggedEvent.$update();
				console.log(event);
			});
	    };
	    /* update on Resize */
	    var updateEventOnResize = function(event, delta, revertFunc, jsEvent, ui, view ){
			DealEvent.get({dealId:$stateParams.id,id:event.id}).$promise.then(function(draggedEvent){
				draggedEvent.start = event.start;
				draggedEvent.end = event.end;
				draggedEvent.$update();
				console.log(event);
			});
		};
	    var updateServiceEventOnResize = function(event, delta, revertFunc, jsEvent, ui, view ){
	    	DealServiceEvent.get({dealId:$stateParams.id,id:event.id}).$promise.then(function(draggedEvent){
				draggedEvent.start = event.start;
				draggedEvent.end = event.end;
				draggedEvent.$update();
				console.log(event);
			});
		};

		var viewEventOnDoubleClick = function(date, cell) {
			  cell.bind('dblclick', function() {
		    	  $('#events-calendar').fullCalendar('gotoDate',date);
		    	  $('#events-calendar').fullCalendar('changeView','agendaDay');
					console.log(date);

	    	  });
		}
		
		var viewServiceEventOnDoubleClick = function(date, cell) {
			  cell.bind('dblclick', function() {
		    	  $('#serivces-calendar').fullCalendar('gotoDate',date);
		    	  $('#services-calendar').fullCalendar('changeView','agendaDay');
		    	  console.log(date);
	    	  });
		}

	    /* config object */
	    $scope.uiConfig = {
	      eventCalendar:{
	        height: 400,
	        timezone: 'local',
	        editable: true,
	        header:{
	          left: 'month agendaWeek agendaDay',
	          center: 'title',
	          right: 'today prev,next'
	        },
	        eventClick: editEventOnClick,
	        eventDrop: updateEventOnDrop,
	        eventResize: updateEventOnResize,
	        dayRender: viewEventOnDoubleClick
	      },
	      serviceCalendar:{
	        height: 400,
	        timezone: 'local',
	        editable: true,
	        header:{
	          left: 'month agendaWeek agendaDay',
	          center: 'title',
	          right: 'today prev,next'
	        },
	        eventClick: editServiceEventOnClick,
	        eventDrop: updateServiceEventOnDrop,
	        eventResize: updateServiceEventOnResize,
	        dayRender: viewServiceEventOnDoubleClick
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
	    $scope.serviceEventSources = [$scope.displayServiceEvents, $scope.serviceEventSource, $scope.eventsF];

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
		
		$scope.add = function(){
			$scope.action = "Create";
			$scope.showForm = true;
		}
		$scope.addService = function(){
			$scope.serviceAction = "Create";
			$scope.showServiceForm = true;
		}
		$scope.addExpenseClaim = function(){
			$scope.expenseClaimAction = "Create";
			$scope.showExpenseClaimForm = "true";
		}
		$scope.$on('FORM_CANCELED',function(event,args){
			$scope.showForm = false;
		});
		$scope.$on('SERVICE_FORM_CANCELED',function(event,args){
			$scope.showServiceForm = false;
		});
		$scope.$on('EXPENSE_CLAIM_FORM_CANCELED',function(event,args){
			$scope.showExpenseClaimForm = false;
		});
		
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