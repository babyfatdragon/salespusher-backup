(function(){
	angular.module('salespusher.controllers').controller('LeadFormCtrl',['$rootScope','$scope','$state','Customer',
		'header','lead','leadAction','products','customers','companies',
	function($rootScope,$scope,$state,Customer,header,lead,leadAction,products,customers,companies){
		$scope.header = header;
		$scope.lead = {};
		angular.copy(lead,$scope.lead);
		$scope.leadAction = leadAction;
		$scope.products = products;
		$scope.customers = customers;
		var customersLength = customers.length;
		$scope.companies = companies;

		$scope.save = function() {
		}
		$scope.cancel = function(){

		}
		
		$scope.statusOptions = [{name:"IN PROGRESS"},{name:"WON"},{name:"LOST"}];

		var oldSearch ="";
		$scope.refresh = function(sel){
			console.log("wuha");
	  		if (sel.search && sel.search!=oldSearch) {
	  			angular.copy(sel.search,oldSearch);
		   		  	var lead = new Customer();
		   		  	console.log(sel.items);
				  	lead.name=sel.search;
				  	lead.customerId = 0;
				  	lead.companyId = 0;
				  	while($scope.customers.length>customersLength) $scope.customers.pop();
				  	if(sel.items.length==0){
					  	$scope.customers.push(lead);
				      	//Make the found or created entry the selected one
			      		sel.selected= lead;	
				  	}
		      		return $scope.customers;
		  	}
		  sel.search = ''; //optional clearing of search pattern
		}

		$scope.disableRefresh = function(){

		}
	}]);
})();
