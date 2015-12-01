(function(){
	angular.module('salespusher.controllers').controller('LeadFormCtrl',['$rootScope','$scope','$state','LeadByUser','Customer','Company',
		'header','lead','leadAction','products','customers','companies',
	function($rootScope,$scope,$state,LeadByUser,Customer,Company,header,lead,leadAction,products,customers,companies){
		$scope.header = header;
		$scope.lead = new LeadByUser();
		$scope.lead.customer = {};
		angular.copy(lead,$scope.lead);
		$scope.leadAction = leadAction;
		$scope.products = products;
		$scope.customers = customers;
		var customersLength = customers.length;
		$scope.companies = companies;
		var companiesCopy = new Array();
		angular.copy($scope.companies,companiesCopy);
		var companiesLength = companies.length;
		console.log($scope.lead);
		$scope.save = function() {
			$scope.lead.name = $scope.lead.customer.name;
			$scope.lead.customerId = $scope.lead.customer.id;
			$scope.lead.telephone = $scope.lead.customer.telephone;
			$scope.lead.email = $scope.lead.customer.email;
			$scope.lead.companyName = $scope.lead.company.name;
			$scope.lead.companyId = $scope.lead.company.id;
			$scope.lead.userId = $rootScope.currentUser.id;
			$scope.lead.interests = new Array();
			var tempInterests = new Array();
			$scope.lead.interests = "";
			if($scope.lead.products!=null){
				$scope.lead.products.forEach(function(product){
					var p = {id:product.id,name:product.name,categoryOneId:product.categoryOneId,categoryTwoId:product.categoryTwoId,price:product.price};
					tempInterests.push(p);
				});
				$scope.lead.interests = angular.toJson(tempInterests,true);				
			};

			delete $scope.lead.products;
			console.log($scope.lead);
			if($scope.leadAction==="Create"){
				$scope.lead.leadStatus = "NEW";
				$scope.lead.$save();
			} else if($scope.leadAction==="Update"){
				$scope.lead.$update();
			}
			$rootScope.$broadcast("LEADS_UPDATED");
		}
		$scope.cancel = function(){

		}
		
		var oldSearchCompany ="";
		$scope.refreshCompany = function(sel){
	  		if (sel.search && sel.search!=oldSearchCompany) {
	  			angular.copy(sel.search,oldSearchCompany);
	  			var newCompany = new Company();
	  			newCompany.name = sel.search;
	  			newCompany.id = 0;
			  	while($scope.companies.length>companiesLength) $scope.companies.pop();
				  	if(sel.items.length==0){
					  	$scope.companies.push(newCompany);
				      	//Make the found or created entry the selected one
				  	}
	      		return $scope.companies;
		  	}
		  sel.search = ''; //optional clearing of search pattern
		}

		var oldSearch ="";
		$scope.refreshCustomer = function(sel){
	  		if (sel.search && sel.search!=oldSearch) {
	  			angular.copy(sel.search,oldSearch);
		   		  	var customer = new Customer();
				  	customer.name=sel.search;
				  	customer.id = 0;
				  	while($scope.customers.length>customersLength) $scope.customers.pop();
				  	if(sel.items.length==0){
					  	$scope.customers.push(customer);
				      	//Make the found or created entry the selected one
				  	}
		      		return $scope.customers;
		  	}
		  sel.search = ''; //optional clearing of search pattern
		}

		$scope.$watch("lead.customer", function(){
			if($scope.lead.customer!=null && $scope.lead.customer.id!=0){
				while($scope.companies.length>0) $scope.companies.pop();
				Company.get({id:$scope.lead.customer.companyId}).$promise.then(function(company){
					$scope.companies.push(company);
				});
			} else if($scope.lead.customer!=null && $scope.lead.customer.id===0){
				while($scope.companies.length>0) $scope.companies.pop();
				companiesCopy.forEach(function(company){
					$scope.companies.push(company);
				});
			}
		});

	}]);
})();
