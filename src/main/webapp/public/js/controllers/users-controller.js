(function(){
	angular.module('salespusher.controllers').controller('UsersCtrl',['$rootScope','$scope','$http','uiGmapGoogleMapApi','User',
	                                                                  function($rootScope, $scope, $http,uiGmapGoogleMapApi,User){
		$scope.users = User.query();
		$scope.event = {};
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
		
		$scope.submit = function(){
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
			console.log(from);
			console.log(to);
/*			$state.reload();*/
			$http.get('/dealEvents/findByEndTimeRange',{
				params:{
					from: from,
					to: to
				}
			}).success(function(events){
				console.log(events);
			});
		}
//		/"http://localhost:8080/dealEvents/findByEndTimeRange?from=2015-10-11+18:24&to=2015-10-11+22:9".
		
		$scope.getCurrentUser = function(){
			$http.get('/user').success(function(data){
				console.log("Current user information:");
				var str = JSON.stringify(data, null, 2);
				console.log(str);
			}).error(function(){
				
			});
		}

	    uiGmapGoogleMapApi.then(function(maps) {
	    	$scope.map = maps;
			$scope.map = { center: { latitude: 1.3500, longitude: 103.8000 }, zoom: 12 };
			var origin = "Solaris South Tower, 1 Fusionopolis Walk,Singapore 138628";
			var destination = "378 Alexandra Road, Singapore 159964";
			var service = new maps.DistanceMatrixService();
			service.getDistanceMatrix(
			  {
			    origins: [origin],
			    destinations: [destination],
			    travelMode: google.maps.TravelMode.DRIVING,
			    unitSystem: google.maps.UnitSystem.METRIC,
			    avoidHighways: false,
			    avoidTolls: false,
			  }, function(response,status){
				  console.log(response.rows[0].elements[0]);
			  });
	    });
	}]);
})();
