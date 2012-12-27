'use strict';

/* Controllers */

function CourseListCtrl($scope, $http, Course) {
    $scope.currentPage = 0;
    $scope.pageSize = 5;

//    var courseTitlesP = $http.get('courses/Title.json').success(function (data) {
    $scope.courseTitlesP = $http.get('/DTEAdmin/services/Title').success(function (data) {
        $scope.courseTitles = data.courseTitle;
    }).error(function (data, status, headers, config) {
            alert("Titles : " + status + "<br>" + data);
        });

//    $scope.courseLanguagesP = $http.get('courses/Language.json').success(function (data) {
    $scope.courseLanguagesP = $http.get('/DTEAdmin/services/Language').success(function (data) {
        $scope.courseLanguages = data.courseLanguage;
    });

//    var stateCodesP = $http.get('courses/StateCode.json').success(function (data) {
    $scope.stateCodesP = $http.get('/DTEAdmin/services/StateCode').success(function (data) {
        $scope.stateCodes = data.stateCode;
    }).error(function (data, status, headers, config) {
            alert("States : " + status + "<br>" + data);
        });

//    var educationCentersP = $http.get('courses/EducationCenter.json').success(function (data) {
    $scope.educationCentersP = $http.get('/DTEAdmin/services/EducationCenter').success(function (data) {
        $scope.educationCenters = [].concat(data.educationCenter);
    }).error(function (data, status, headers, config) {
            alert("Ed Centers : " + status + "<br>" + data);
        });

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
        {head: "No. of Days", column: "noOfDays"},
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

    $scope.numberOfPages = function (filtered) {
        return Math.ceil(filtered.length / $scope.pageSize);
    };

    $scope.filterText = "";

    $scope.advFilterText = {"startDate":""
        ,"endDate":""
        ,"noOfDays":""
        ,"cmPoints":false
        ,"ceuPoints":false};
}

//CourseListCtrl.$inject = ['$scope', '$http', 'Course'];


function CourseDetailCtrl($scope, $routeParams, $http, $q, $location, Course) {
    $scope.date = new Date();

//    var courseTitlesP = $http.get('courses/Title.json').success(function (data) {
//        $scope.courseTitles = data.courseTitle;
//    });
//
//    var stateCodesP = $http.get('courses/StateCode.json').success(function (data) {
//        $scope.stateCodes = data.stateCode;
//    });
//
//    var courseLanguagesP = $http.get('courses/Language.json').success(function (data) {
//        $scope.courseLanguages = data.courseLanguage;
//    });
//
//    var educationCentersP = $http.get('courses/EducationCenter.json').success(function (data) {
//        $scope.educationCenters = data.educationCenter;
//    });

    if ($routeParams.courseId === "new") {
        $scope.course = new Course();
        $scope.course.id = "0";
        $scope.course.activeInd = "1";
        $scope.course.industryId = 1;
    } else {
        Course.query({courseId: $routeParams.courseId}, function (course) {
//        $http.get('courses/course_1954.json').success(function (course) {
            course.noOfDays = parseInt(course.noOfDays);
            course.length = parseInt(course.length);
            course.cmPoints = parseFloat(course.cmPoints);
            course.ceuPoints = parseFloat(course.ceuPoints);
            course.cost = parseFloat(course.cost);
            $q.all([$scope.courseTitlesP, $scope.stateCodesP, $scope.courseLanguagesP, $scope.educationCentersP]).then(function (values) {
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
        if ($routeParams.courseId === "new") {
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
            }, function (res) {
                alert("error: " + res);
            })
        }
            $scope.changeView('courses');
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


function UsersCtrl($scope, $routeParams, $http, $q, $location, User) {

    $scope.user = new User();
    $scope.user.userType="S";

    User.list({},
        function (data) {
            //Success
            $scope.users = data.dteUser;
        }
        , function (data) {

        }
    );

    $scope.save = function () {
        User.insert({}, $scope.user, function (res) {
            if (res.ok === 1) {
            } else {
                console.log(res);
            }
            $location.path("/users");
        }, function (res) {
            alert("error: " + res);
            $location.path("/users");
        })
        //    $scope.changeView('courses');
    };

    $scope.changeView = function (view) {
        $location.path(view); // path not hash
    };
}

//UsersCtrl.$inject = ['$scope', '$routeParams', $http, $q, 'Course'];

