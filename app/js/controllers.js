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
        {head: "OTI Education Center", column: "educationCenter.name"},
        {head: "Course Title", column: "courseTitle.name"},
        {head: "Start Date", column: "startDate"},
        {head: "End Date", column: "endDate"},
        {head: "Training Location", column: "location"},
        {head: "Address", column: "address"},
        {head: "City", column: "city"},
        {head: "State", column: "stateCode.stateCd"},
        {head: "CM", column: "cmPoints"},
        {head: "CEU", column: "ceuPoints"}
    ];

    $scope.sort = {
        column: 'startDate',
        descending: false
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
    };

    $scope.filterText = "";

    $http.get('courses/courseTitle.json').success(function (data) {
        $scope.courseTitles = data;
    });

    $http.get('courses/stateCodes.json').success(function (data) {
        $scope.stateCodes = data;
    });
}

//CourseListCtrl.$inject = ['$scope', '$http', 'Course'];


function CourseDetailCtrl($scope, $routeParams, $http, $q, $location, Course) {
    $scope.date = new Date();

    var courseTitlesP = $http.get('courses/Title.json').success(function (data) {
        $scope.courseTitles = data.courseTitle;
    });

    var stateCodesP = $http.get('courses/StateCode.json').success(function (data) {
        $scope.stateCodes = data.stateCode;
    });

    var courseLanguagesP = $http.get('courses/Language.json').success(function (data) {
        $scope.courseLanguages = data.courseLanguage;
    });

    var educationCentersP = $http.get('courses/EducationCenter.json').success(function (data) {
        $scope.educationCenters = data.educationCenter;
    });

    if ($routeParams.course_id === "new") {
        $scope.course = new Course();
        $scope.course.id = "0";
        $scope.course.activeInd = "1";
        $scope.course.industryId = 1;
    } else {
 //       Course.query({course_id: $routeParams.course_id}, function (course) {
          $http.get('courses/course_1954.json').success(function (course) {
            course.noOfDays = parseInt(course.noOfDays);
            course.length = parseInt(course.length);
            course.cmPoints = parseFloat(course.cmPoints);
            course.ceuPoints = parseFloat(course.ceuPoints);
            course.cost = parseFloat(course.cost);
            $q.all([courseTitlesP, stateCodesP, courseLanguagesP, educationCentersP]).then(function (values) {
                try {
                    for (var i = 0; i < $scope.courseTitles.length; i++) {
                        if ($scope.courseTitles[i].id === course.courseTitle.id) {
                            course.courseTitle = $scope.courseTitles[i];
                            break;
                        }
                    }

                    for (var i = 0; i < $scope.stateCodes.length; i++) {
                        if ($scope.stateCodes[i].stateCd === course.stateCode.stateCd) {
                            course.stateCode = $scope.stateCodes[i];
                            break;
                        }
                    }

                    for (var i = 0; i < $scope.courseLanguages.length; i++) {
                        if ($scope.courseLanguages[i].id === course.courseLanguage.id) {
                            course.courseLanguage = $scope.courseLanguages[i];
                            break;
                        }
                    }

                    for (var i = 0; i < $scope.educationCenters.length; i++) {
                        if ($scope.educationCenters[i].id === course.educationCenter.id) {
                            course.educationCenter = $scope.educationCenters[i];
                            break;
                        }
                    }
                } catch (e) {
                }

                $scope.course = course;
            });
        });
    }

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
                    //alert(res.toString());
//                    $location.path("/course");
                } else {
                   // alert("error: " + res.ok);
                }
            }, function (res){
                alert("error: " + res);
            })
        }
        //    $scope.changeView('courses');
    };

    $scope.delete = function () {
        $scope.course.activeInd = "0";
        $scope.save();
        $scope.changeView('courses');
    };

    $scope.changeView = function (view) {
        $location.path(view); // path not hash
    };
}

//CourseDetailCtrl.$inject = ['$scope', '$routeParams', $http, $q, 'Course'];

