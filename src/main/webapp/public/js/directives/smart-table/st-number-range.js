(function(){
	angular.module('salespusher.directives')
	.directive('stNumberRange', ['$timeout', function ($timeout) {
        return {
            restrict: 'E',
            require: '^stTable',
            scope: {
                lower: '=',
                higher: '='
            },
            templateUrl: '/templates/directives/smart-table/st-number-range.html',
            link: function (scope, element, attr, table) {
                var inputs = element.find('input');
                var inputLower = angular.element(inputs[0]);
                var inputHigher = angular.element(inputs[1]);

                var predicateName = attr.predicate;

                [inputLower, inputHigher].forEach(function (input, index) {
                    input.bind('blur', function () {
                        var query = {};

                        if (scope.lower) {
                            query.lower = scope.lower;
                        }

                        if (scope.higher) {
                            query.higher = scope.higher;
                        }

                        scope.$apply(function () {
                            table.search(query, predicateName)
                        });
                    });
                });
            }
        };
    }])
})();