(function(){
	angular.module('salespusher.directives')
	.directive('spFileUpload',[function(){
		return {
			restrict: "E",
			scope: {
				fileType: "@",
				uploadUrl: "@",
				productId: '=',
				dealId: '=',
				serviceId: '=',
			},
			templateUrl: "templates/directives/sp-file-upload.html",
			controller: ['$rootScope','$scope','$cookies','DealFollower','FileUploader',function($rootScope,$scope,$cookies,DealFollower,FileUploader){
		  		/* uploading images*/
				
		        var uploader = $scope.uploader = new FileUploader({
		        	url: $scope.uploadUrl,
		            headers:{
		                'X-XSRF-TOKEN': $cookies.get('XSRF-TOKEN')
		            },
		            filters: $scope.fileType==="Image" ? 
            		[{
            			name: 'imageFilter',
            			fn: function(item, options) {
            				var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
            				return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            			}
            		},
            		{
            			name: 'imageFileSizeFilter',
            			fn: function(item,options) {
            				return item.size<1024*1024*10;
            			}
            		}
            		]:[{
            			name: 'docFilter',
            			fn: function(item, options) {
            				var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
            				return '|pdf|doc|docx|'.indexOf(type) !== -1;
            			}
            		},
            		{
            			name: 'docFileSizeFilter',
            			fn: function(item,options) {
            				return item.size<1024*1024*40;
            			}
            		}]	
		        });
		        
		        uploader.onBeforeUploadItem = function(item) {
		        	if($scope.productId){
			            item.formData.push({productId: $scope.productId});
		        	} else if($scope.dealId){
		        		item.formData.push({dealId: $scope.dealId});
		        	} else if($scope.serviceId){
			            item.formData.push({serviceId: $scope.serviceId});
		        	}
		        };
		        
		        uploader.onCompleteAll = function(){
					/** update unread flags for other followers **/
					DealFollower.query({dealId:$scope.dealId}).$promise.then(function(followers){
						followers.forEach(function(follower){
							if(follower.userId===$rootScope.currentUser.id){
								//self, do nothing
							} else{
								follower.unreadFiles+=1;
								follower.$update().then(function(){
									console.log("updated!!! "+follower.unreadFiles);
								});
							}
						});
					});
		        }
		        
		        /* end of uploading images */
			}],
		}
	}]);
})();