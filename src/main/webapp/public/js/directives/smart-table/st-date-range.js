(function(){
	angular.module('salespusher.directives')
	.directive('stDateRange', ['$timeout', function ($timeout) {
        return {
            restrict: 'E',
            require: '^stTable',
            scope: {
            },
            templateUrl: '/templates/directives/smart-table/st-date-range.html',

            link: function (scope, element, attr, table) {
            	var isolatedBefore = scope.before;
            	var isolatedAfter = scope.after;
                var inputs = element.find('input');
                var inputBefore = angular.element(inputs[0]);
                var inputAfter = angular.element(inputs[1]);
                var predicateName = attr.predicate;
                [inputBefore, inputAfter].forEach(function (input) {
                    input.bind('blur', function () {
                        var query = {};

                        if (!scope.isBeforeOpen && !scope.isAfterOpen) {

                            if (scope.before) {
                                query.before = scope.before;
                            }

                            if (scope.after) {
                                query.after = scope.after;
                            }

                            scope.$apply(function () {
                                table.search(query, predicateName);
                            })
                        }
                    });
                });

                function open(before) {
                    return function ($event) {
                        $event.preventDefault();
                        $event.stopPropagation();

                        if (before) {
                            scope.isBeforeOpen = true;
                        } else {
                            scope.isAfterOpen = true;
                        }
                    }
                }

                scope.openBefore = open(true);
                scope.openAfter = open();
            }
        }
	}])
})();