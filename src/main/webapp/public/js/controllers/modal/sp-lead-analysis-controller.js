(function(){
	angular.module('salespusher.controllers').controller('LeadAnalysisCtrl',['$rootScope','$scope','$state','UserById','LeadByUser','LeadContact',
		'Product','Deal','Company','Customer','CompanyDeal','header','lead','products','deals',
	function($rootScope,$scope,$state,UserById,LeadByUser,LeadContact,Product,Deal,Company,Customer,CompanyDeal,header,lead,products,deals){
		$scope.header = header;
		$scope.lead = lead;
		$scope.products = products;
		$scope.deals = deals;
		$scope.company = {};
		$scope.companyDeals = new Array();


		// $scope.labels = new Array();
  // 		$scope.data = new Array();
		Company.get({id:$scope.lead.companyId}).$promise.then(function(company){
			$scope.company = company;
		});


		$scope.lead.products.forEach(function(interestedProduct){
			interestedProduct.labels = new Array();
			interestedProduct.chartData = new Array();
			interestedProduct.relatedProducts = new Array();
			$scope.products.forEach(function(product){
				if(product.categoryTwoId===interestedProduct.categoryTwoId){
					interestedProduct.labels.push(product.name);
					var quantity = 0;
					$scope.deals.forEach(function(deal){
						if(deal.productId===product.id && deal.dealStatus==='WON'){
							quantity+=deal.quantity;
						}
					});
					interestedProduct.chartData.push(quantity);
					if(product.id!=interestedProduct.id){
						interestedProduct.relatedProducts.push(product);
					}
				}
			});
		});

		CompanyDeal.query({companyId:$scope.lead.companyId}).$promise.then(function(deals){
			deals.forEach(function(deal){
				if(deal.dealStatus ==='WON'){
					UserById.get({id:deal.userId}).$promise.then(function(user){
						deal.userName = user.firstname+" "+user.lastname;
						Product.get({id:deal.productId}).$promise.then(function(product){
							deal.productName = product.name;
							Customer.get({id:deal.customerId}).$promise.then(function(customer){
								deal.customerName = customer.name;
							});
							$scope.companyDeals.push(deal);
						});
					});
				}
			});
		});
	}]);
})();
