(function(){
	angular.module('salespusher.directives')
	.directive('spFileUpload',[function(){
		return {
			restrict: "E",
			scope: {
				fileType: "@",
				uploadUrl: "@",
				productId: '='
			},
			templateUrl: "templates/directives/sp-file-upload.html",
			controller: function($scope,$cookies,FileUploader){
				var ctrl = this;
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
		            item.formData.push({productId: $scope.productId});
		        };
		        /* end of uploading images */
			},
		}
	}]);
})();