(function(){
	angular.module('salespusher.directives')
    .directive('stRatio',function(){
        return {
          link:function(scope, element, attr){
            var ratio=+(attr.stRatio);
            element.css('width',ratio+'%');  
          }
        };
    });
})();