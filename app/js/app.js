'use strict';


// Declare app level module which depends on filters, and services
angular.module('dteCourseAdmin', ['dteCourseAdminFilters', 'dteCourseAdminServices','ui.directives']).
    config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/', {templateUrl: 'partials/home.html', activetab: 'index'}).
        when('/courses', {templateUrl: 'partials/course-search.html', activetab: 'search'}).
        when('/course/:courseId', {templateUrl: 'partials/course-detail.html', controller: 'CourseDetailCtrl', activetab: 'detail'}).
        when('/users', {templateUrl: 'partials/userEdit.html', controller: 'UsersCtrl', activetab: 'user'}).
        otherwise({redirectTo: '/'});
}]);
