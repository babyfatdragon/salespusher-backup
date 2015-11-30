(function(){
	angular.module('salespusher.controllers').controller('LeadQualifyCtrl',['$rootScope','$scope','$state','LeadByUser','LeadContact',
		'header','lead',
	function($rootScope,$scope,$state,LeadByUser,LeadContact,header,lead){
		$scope.header = header;
		$scope.lead = lead;
		$scope.contact = {};
		$scope.typeOptions = [{name:"PHONE CALL"},{name:"EMAIL"},{name:"FACE TO FACE"}];
		$scope.contacts = LeadContact.query({leadId:$scope.lead.id});


		$scope.editContact = function(contact){
			$scope.contactAction="Update";
			$scope.contact = contact;
			$scope.contactFormShow = true;
		};
		$scope.deleteContact = function(contact){
			$scope.contact = contact;
			$scope.contact.$delete().then(function(){
				$scope.contacts = LeadContact.query({leadId:$scope.lead.id});
			});
		}
		$scope.showContactForm = function(type){
			$scope.contactAction="Create";
			$scope.contact = new LeadContact();
			switch(type){
				case 1: $scope.contact.contactType="PHONE CALL"; break;
				case 2: $scope.contact.contactType="EMAIL"; break;
				case 3: $scope.contact.contactType="FACE TO FACE"; break;
				default: break;
			};
			$scope.contactFormShow = !$scope.contactFormShow;
		};
		$scope.save = function(){
			$scope.contact.userId = $rootScope.currentUser.id;
			$scope.contact.leadId = $scope.lead.id;
			$scope.contactFormShow = false;
			if($scope.contactAction==="Create"){
				$scope.contact.$save().then(function(){
					$scope.contacts = LeadContact.query({leadId:$scope.lead.id});
					$scope.lead.leadStatus = "CONTACTED";
					$scope.lead.$update().then(function(){
						$rootScope.$broadcast("LEADS_UPDATED");
					});
				});	
			} else if($scope.contactAction==="Update"){
				$scope.contact.$update().then(function(){
					$scope.contacts = LeadContact.query({leadId:$scope.lead.id});
				});
			}
			
		};
		$scope.cancel = function(){
			$scope.contactFormShow = false;
		};

	}]);
})();
