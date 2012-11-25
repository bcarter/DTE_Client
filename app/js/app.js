'use strict';


// Declare app level module which depends on filters, and services
angular.module('phonecat', ['phonecatFilters', 'phonecatServices']).
    config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/', {templateUrl: 'partials/home.html'}).
        when('/courses', {templateUrl: 'partials/course-search.html', controller: CourseListCtrl}).
        when('/courses/:course_id', {templateUrl: 'partials/course-detail.html', controller: CourseDetailCtrl}).
        otherwise({redirectTo: '/'});
}]);
