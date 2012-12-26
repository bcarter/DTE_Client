'use strict';


// Declare app level module which depends on filters, and services
angular.module('dteCourseAdmin', ['dteCourseAdminFilters', 'dteCourseAdminServices','ui.directives']).
    config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/', {templateUrl: 'partials/home.html'}).
        when('/courses', {templateUrl: 'partials/course-search.html'}).
        when('/course/:course_id', {templateUrl: 'partials/course-detail.html', controller: CourseDetailCtrl}).
        when('/users', {templateUrl: 'partials/userEdit.html', controller: UsersCtrl}).
        otherwise({redirectTo: '/'});
}]);
