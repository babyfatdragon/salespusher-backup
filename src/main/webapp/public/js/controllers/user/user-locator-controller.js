(function(){
	angular.module('salespusher.controllers').controller('UserLocatorCtrl',['$rootScope','$scope','$timeout','$http','uiGmapGoogleMapApi','User','Company',
	                                                                  function($rootScope, $scope,$timeout,$http,uiGmapGoogleMapApi,User,Company){

		$scope.usersCopy = new Array();

		$scope.companies = Company.query();
		$scope.event = {};
		$scope.serviceEvents = new Array();
		$scope.displayServiceEvents = new Array();
		$scope.markers = new Array();
		$scope.startSearching = 0;
		/** for form usage **/
		$scope.event.startDate = new Date();
		$scope.event.startTime = new Date();
		$scope.event.endDate = new Date();
		$scope.event.endTime = new Date();
		$scope.startDateStatus = {
			opened: false
		};
		$scope.endDateStatus = {
			opened: false
		};
		$scope.openStart = function($event) {
			$scope.startDateStatus.opened = true;
		};
		$scope.openEnd = function($event) {
			$scope.endDateStatus.opened = true;
		};
		$scope.hstep = 1;
		$scope.mstep = 15;

		$scope.options = {
			hstep: [1, 2, 3],
			mstep: [1, 5, 10, 15, 25, 30]
		};
		/** end of for form usage **/
		
		$scope.submit = function(){
			angular.copy($scope.users, $scope.usersCopy);
			//$scope.usersCopy = $scope.users;
			var fromYear = $scope.event.startDate.getFullYear();
			var fromMonth = $scope.event.startDate.getMonth() + 1;
			if(fromMonth<10){
				fromMonth = "0"+fromMonth;
			}
			var fromDate = $scope.event.startDate.getDate();
			if(fromDate<10){
				fromDate = "0"+fromDate;
			}
			var fromHour = $scope.event.startTime.getHours();
			if(fromHour<10){
				fromHour = "0"+fromHour;
			}
			var fromMinute = $scope.event.startTime.getMinutes();
			if(fromMinute<10){
				fromMinute = "0"+fromMinute;
			}
			var from = fromYear+"-"+fromMonth+"-"+fromDate+" "+fromHour+":"+fromMinute;
			
			var toYear = $scope.event.endDate.getFullYear();
			var toMonth = $scope.event.endDate.getMonth() + 1;
			if(toMonth<10){
				toMonth = "0"+toMonth;
			}
			var toDate = $scope.event.endDate.getDate();
			if(toDate<10){
				toDate = "0"+toDate;
			}
			var toHour = $scope.event.endTime.getHours();
			if(toHour<10){
				toHour = "0"+toHour;
			}
			var toMinute = $scope.event.endTime.getMinutes();
			if(toMinute<10){
				toMinute = "0"+toMinute;
			}
			var to = toYear+"-"+toMonth+"-"+toDate+" "+toHour+":"+toMinute;
/*			$state.reload();*/
			$http.get('/serviceEvents/findByEndTimeRange',{
				params:{
					from: from,
					to: to
				}
			}).success(function(events){
				$scope.serviceEvents = events;
				$scope.startSearching++;
				
				/** google-maps **/
			    uiGmapGoogleMapApi.then(function(maps) {
			    	//$scope.map = maps;
					$scope.map = { center: { latitude: 1.3500, longitude: 103.8000 }, zoom: 12};
					var origin = "Solaris South Tower, 1 Fusionopolis Walk,Singapore 138628";
					var origins = new Array();
					var destination = $scope.event.targetCompany.address;
					var geoCoder =new google.maps.Geocoder();
					var distanceMatrixservice = new maps.DistanceMatrixService();
					var codeAddress = function(address,serviceEvent,isDestination) {
					    geoCoder.geocode( { 'address': address}, function(results, status) {
					      if (status == google.maps.GeocoderStatus.OK) {
					    	  var iconUrl,markerTitle,markerId;
					    	  if(isDestination){
						    	  iconUrl = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
						    	  markerTitle = destination;
						    	  markerId = 0; 
					    	  } else{
					    		  iconUrl = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
						    	  markerTitle = serviceEvent.userName+"\n"+serviceEvent.startTime+"-"+serviceEvent.endTime+"\n"+serviceEvent.location;
					    	      markerId = serviceEvent.id; 
					    	  }
					    	  
				    	      var marker =  {
					    	      id: markerId,
					    	      coords: {
					    	        latitude: results[0].geometry.location.lat()+0.0005*Math.random(),
					    	        longitude: results[0].geometry.location.lng()+0.0005*Math.random()
					    	      },
					    	      options: {
					    	    	  draggable: true,
					    	    	  animation: google.maps.Animation.DROP,
					    	    	  title: markerTitle,
					    	    	  icon: iconUrl
					    	      },
					    	      events: {
					    	      }
					    	    };
							$scope.markers.push(marker);
							} else {
					        alert("Geocode was not successful for the following reason: " + status);
					      }
					    });
					}
					codeAddress(destination,null,true);
					
					/** reset markers **/
					$scope.markers = [];
					$scope.serviceEvents.forEach(function(serviceEvent){
						var user = $scope.getObjectById($scope.users,serviceEvent.userId);
					    /** eliminate user whose event starts within the time range from users **/
						for(var i=0;i<$scope.usersCopy.length;i++){
							if($scope.usersCopy[i].id===user.id){
								$scope.usersCopy.splice(i, 1);
								break;
							}
						}
					    /** eliminate user whose event starts within the time range from users **/
						serviceEvent.userName = user.firstname + " " + user.lastname;
						serviceEvent.userEmail = user.email;
						serviceEvent.userTelephone = user.telephone;
						var start = new Date(serviceEvent.start);
						var end = new Date(serviceEvent.end);
						var startHour = start.getHours();
						if(startHour<10) startHour = "0"+startHour;
						var startMinute = start.getMinutes();
						if(startMinute<10) startMinute = "0"+startMinute;
						var endHour = end.getHours();
						if(endHour<10) endHour = "0"+endHour;
						var endMinute = end.getMinutes();
						if(endMinute<10) endMinute = "0"+endMinute;
						serviceEvent.startTime = startHour+":"+startMinute;
						serviceEvent.endTime = endHour+":"+endMinute;
						origins.push(serviceEvent.location);
						codeAddress(serviceEvent.location,serviceEvent,false);
					});
				
					distanceMatrixservice.getDistanceMatrix(
					  {
					    origins: origins,
					    destinations: [destination],
					    travelMode: google.maps.TravelMode.DRIVING,
					    unitSystem: google.maps.UnitSystem.METRIC,
					    avoidHighways: false,
					    avoidTolls: false,
					  }, function(response,status){
						  console.log(response);
						  var i = 0;
						  $scope.serviceEvents.forEach(function(serviceEvent){
							  serviceEvent.distance = response.rows[i].elements[0].distance;
							  serviceEvent.duration = response.rows[i].elements[0].duration;
							  i++;
						  });
						  $scope.displayServiceEvents = $scope.serviceEvents;
					  });
			    });
				/** end of google-maps **/
			    /** eliminate user whose event starts within the time range from users **/
			    $http.get('/serviceEvents/findByStartTimeRange',{
					params:{
						from: from,
						to: to
					}
				}).success(function(events){
					if(events.length){
						console.log("BKSY");
						events.forEach(function(event){
							var user = $scope.getObjectById($scope.users,event.userId);
							if(user!=null){
								for(var i=0;i<$scope.usersCopy.length;i++){
									if($scope.usersCopy[i].id===user.id){
										$scope.usersCopy.splice(i, 1);
										break;
									}
								}
							}
						});	
					}	
					console.log($scope.usersCopy);
					$scope.displayUsersCopy = $scope.usersCopy;
				});
			    /** eliminate user whose event starts within the time range from users **/
			});
		}
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
		
		$scope.getCurrentUser = function(){
			$http.get('/user').success(function(data){
				console.log("Current user information:");
				var str = JSON.stringify(data, null, 2);
				console.log(str);
			}).error(function(){
				
			});
		}
	}]);
})();
