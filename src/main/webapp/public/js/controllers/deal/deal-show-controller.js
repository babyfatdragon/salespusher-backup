(function(){
	angular.module('salespusher.controllers')
	.controller('DealShowCtrl',['$rootScope','$scope','$stateParams','User','Product','Company','Customer','Deal','DealComment','DealEvent','DealFollower','uiCalendarConfig',
	                            function($rootScope,$scope,$stateParams,User,Product,Company,Customer,Deal,DealComment,DealEvent,DealFollower,uiCalendarConfig){
		$scope.comment = new DealComment();
		$scope.event = {}; /*used in form*/
		$scope.action = "Create";
		$scope.eventSource = {};
		$scope.events = [];
		$scope.followers = [];
		$scope.isFollow = false;
		$scope.followObj = {};
		
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
								/* pagination */
								$scope.totalItems = $scope.comments.length;
								$scope.currentPage = 1;
								$scope.pageCapacity = 5;
								$scope.noOfPages = Math.ceil($scope.totalItems / $scope.pageCapacity);
							});
							DealEvent.query({dealId:$stateParams.id}).$promise.then(function(events){
							    for(var i=0;i<events.length;i++){
							    	var event = {id:events[i].id,title:events[i].title,start:events[i].start,end:events[i].end,dealId:events[i].dealId};
							    	$scope.events.push(event);
							    }
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
										$scope.followObj.$update();
									}
									var user = $scope.getObjectById($scope.users,follower.userId);
									follower.userName = user.firstname+" "+user.lastname;
									$scope.followers.push(follower);
								});
							});
						});
					});
				});
			});
		});
		
	    /* edit on eventClick */
	    var editOnEventClick = function(calEvent, jsEvent, view){
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

		/* update on Drop */
		var updateEventOnDrop = function(event, delta, revertFunc, jsEvent, ui, view){
			DealEvent.get({dealId:$stateParams.id,id:event.id}).$promise.then(function(draggedEvent){
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
	        eventDrop: updateEventOnDrop,
	        eventResize: updateEventOnResize,
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
		$scope.$on('FORM_CANCELED',function(event,args){
			$scope.showForm = false;
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
		
	}]);
})();