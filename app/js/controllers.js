'use strict';

/* Controllers */

function CourseListCtrl($scope, $http, Course) {
    $scope.currentPage = 0;
    $scope.pageSize = 5;

    Course.list({},
        function (data) {
            //Success
            $scope.courses = data.course;
        }
        , function (data) {

        }
    );

    $scope.head = [
        {head:"OTI Education Center", column:"educationCenter.name"},
        {head:"Course Title", column:"courseTitle.name"},
        {head:"Start Date", column:"startDate"},
        {head:"End Date", column:"endDate"},
        {head:"Training Location", column:"location"},
        {head:"Address", column:"address"},
        {head:"City", column:"city"},
        {head:"State", column:"stateCode.stateCd"},
        {head:"CM", column:"cmPoints"},
        {head:"CEU", column:"ceuPoints"}
    ];

    $scope.sort = {
        column:'startDate',
        descending:false
    };

    $scope.selectedCls = function (column) {
        return column == $scope.sort.column && 'sort-' + $scope.sort.descending;
    };

    $scope.changeSorting = function (column) {
        var sort = $scope.sort;
        if (sort.column == column) {
            sort.descending = !sort.descending;
        } else {
            sort.column = column;
            sort.descending = false;
        }
    };

    $scope.numberOfPages = function () {
        return Math.ceil($scope.filtered.length / $scope.pageSize);
    }

    $scope.filterText = "";

    $http.get('courses/courseTitle.json').success(function (data) {
        $scope.courseTitles = data;
    });

    $http.get('courses/stateCodes.json').success(function (data) {
        $scope.stateCodes = data;
    });
}

//CourseListCtrl.$inject = ['$scope', '$http', 'Course'];


function CourseDetailCtrl($scope, $routeParams, $http, Course) {
    $scope.date = new Date();
    if ($routeParams.course_id === "new") {
        $scope.course = new Course();
        $scope.course.id = "0";
        $scope.course.activeInd = "1";
        $scope.course.industryId = 1;

    } else {


        /*
         $http.get('courses/course_1954.json').success(function (data) {
         $scope.course = data;
         $scope.course_id = $scope.course.course_id;
         $scope.location = $scope.course.location;
         $scope.course.endDate = new Date();

         for (var i = 0; i < $scope.courseLanguages.length; i++) {
         if ($scope.courseLanguages[i].id === $scope.course.courseLanguage.id) {
         $scope.course.courseLanguage = $scope.courseLanguages[i];
         break;
         }
         }
         });
         */

        $scope.course = Course.query({course_id:$routeParams.course_id}, function (course) {
            $scope.course_id = $routeParams.course_id;
            $scope.location = course.location;
            $scope.course.endDate = new Date();

            $http.get('courses/courseLanguages.json').success(function (data) {
                $scope.courseLanguages = data;

                for (var i = 0; i < $scope.courseLanguages.length; i++) {
                    if ($scope.courseLanguages[i].id === $scope.course.courseLanguage.id) {
                        $scope.course.courseLanguage = $scope.courseLanguages[i];
                        break;
                    }
                }
            });
        });

    }

    $http.get('courses/courseTitle.json').success(function (data) {
        $scope.courseTitles = data;
    });

    $http.get('courses/stateCodes.json').success(function (data) {
        $scope.stateCodes = data;
    });

    $scope.save = function () {
        if ($routeParams.course_id === "new") {
            Course.insert({}, $scope.course, function (res) {
                if (res.ok === 1) {
                    $location.path("/course");
                } else (console.log(res))
            })
        }
        else {
            Course.update({}, $scope.course, function (res) {
                if (res.ok === 1) {
                    $location.path("/course");
                } else (console.log(res))
            })
        }
    }

    $scope.delete = function () {
        $scope.course.activeInd = "0";
        $scope.save();
        $scope.route = "/courses";
    }
}

//CourseDetailCtrl.$inject = ['$scope', '$routeParams', $http, 'Course'];

