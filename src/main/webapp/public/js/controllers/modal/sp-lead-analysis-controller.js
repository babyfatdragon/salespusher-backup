(function(){
	angular.module('salespusher.controllers').controller('LeadAnalysisCtrl',['$rootScope','$scope','$state','UserById','LeadByUser','LeadContact',
		'Product','Deal','DealFollower','Company','Customer','CompanyDeal','header','lead','products','deals',
	function($rootScope,$scope,$state,UserById,LeadByUser,LeadContact,Product,Deal,DealFollower,Company,Customer,CompanyDeal,header,lead,products,deals){
		$scope.header = header;
		$scope.lead = lead;
		$scope.products = products;
		$scope.deals = deals;
		$scope.tempDeals = new Array();
		$scope.company = {};
		$scope.companyDeals = new Array();

		$scope.accessoriesSuggestions = {6:2,7:8,9:10,10:9,11:1};
		$scope.accessoriesSuggestions["6"] = 2;

		Company.get({id:$scope.lead.companyId}).$promise.then(function(company){
			$scope.company = company;
		});

		$scope.lead.products.forEach(function(interestedProduct){
			interestedProduct.labels = new Array();
			interestedProduct.chartData = new Array();
			interestedProduct.relatedProducts = new Array();
			interestedProduct.suggestedProducts = new Array();
			$scope.products.forEach(function(product){
				if(product.categoryTwoId===$scope.accessoriesSuggestions[interestedProduct.categoryTwoId]){
					interestedProduct.suggestedProducts.push(product);
				}
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

		$scope.addToCart = function(product){
			var deal = new Deal();
			if(typeof product != 'undefined'){
				deal.productId = product.id;
			} else{
			}
			deal.tempId = (Math.random()+1).toString(36).substring(7);
			deal.quantity = 1;
			deal.totalPrice = product.price;
			deal.customerId = lead.customerId;
			deal.companyId = lead.companyId;
			deal.userId = $rootScope.currentUser.id;
			deal.dealStatus = "IN PROGRESS";
			$scope.tempDeals.push(deal);			
		}

		$scope.removeTempDeal = function(deal){
			for(var i=0;i<$scope.tempDeals.length;i++){
				if($scope.tempDeals[i].tempId===deal.tempId){
					$scope.tempDeals.splice(i,1);
					break;
				}
			}
		}

		$scope.createDeal = function(){
			$scope.tempDeals[0].isParent = 1;
			Deal.save($scope.tempDeals[0]).$promise.then(function(mainDeal){
				var follower = new DealFollower();
				follower.dealId = mainDeal.id;
				follower.userId = mainDeal.userId;
				follower.isOwner = 1;
				DealFollower.save(follower);

				$scope.tempDeals.splice(0,1);
				$scope.tempDeals.forEach(function(deal){
					deal.isParent = 0;
					deal.parentId = mainDeal.id;
					createSubDeal(deal);
				});

			});
		}
		var createSubDeal = function(tempDeal){
			Deal.save(tempDeal).$promise.then(function(deal){
				var follower = new DealFollower();
				follower.dealId = deal.id;
				follower.userId = deal.userId;
				follower.isOwner = 1;
				DealFollower.save(follower);
			});
		}
	}]);
})();
