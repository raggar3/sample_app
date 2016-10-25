angular.module('t-app.directive', ['ionic'])

.directive('dExpandCollapse', function () {
    return {
        restrict: 'EA',
        templateUrl: 'templates/directive_template/dir_food_menu.html',
        link: function (scope, element, attrs) {
        	$(document).on('click', '._onclick_food_category', function (e, forced) {
			    console.log($(this));
			    var $clicked = $(this);
			    $(this).next().toggle("slow");
			});
			
        }
    }
})
/*
.directive('starRating', function () {
    return {
        restrict: 'EA',
        templateUrl: 'templates/directive_template/star_rating_directive.html',
        link: function (scope, element, attrs) {
            $(document).on('click', '.rating_test', function (e, forced) {
                console.log($(this));
            });
            
        }
    }
})
*/


.directive('starRating', function () {
    return {
        restrict: 'A',
        templateUrl: function(elem, attr){
                return 'templates/directive_template/star_rating_'+attr.type+'.html';
        },
        scope: {
            ratingValue: '=',
            max: '=',
            readonly: '=?',
            onRatingSelected: '&'
        },
        link: function (scope, elem, attrs) {

            var updateStars = function () {
                scope.stars = [];
                for (var i = 0; i < scope.max; i++) {
                    scope.stars.push({
                        filled: i < scope.ratingValue
                    });
                }
            };

            scope.toggle = function (index) {
                scope.ratingValue = index + 1;
                scope.onRatingSelected({
                    rating: index + 1
                });
            };

            scope.$watch('ratingValue', function (oldVal, newVal) {
                if (newVal) {
                    updateStars();
                }
            });
        }
    }
});