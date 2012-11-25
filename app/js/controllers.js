'use strict';

/* Controllers */

function CourseListCtrl($scope, Course) {
    $scope.courses = Course.query();
}

//CourseListCtrl.$inject = ['$scope', 'Course'];



function CourseDetailCtrl($scope, $routeParams, Course) {
    $scope.course = Course.get({course_id: $routeParams.course_id}, function(course) {
        $scope.course_id =  $routeParams.course_id;
        $scope.location = course.location;
    });
}

//CourseDetailCtrl.$inject = ['$scope', '$routeParams', 'Course'];