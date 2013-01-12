'use strict';

/* Controllers */

function CourseListCtrl($scope, $http, $route, Course) {
    $scope.currentPage = 0;
    $scope.pageSize = 5;
    $scope.$route = $route;

//    var courseTitlesP = $http.get('courses/Title').success(function (data) {
    $scope.courseTitlesP = $http.get('/DTEAdmin/services/Title').success(function (data) {
        $scope.courseTitles = data.courseTitle;
    }).error(function (data, status, headers, config) {
            alert("Titles : " + status + "<br>" + data);
        });

//    $scope.courseLanguagesP = $http.get('courses/Language').success(function (data) {
    $scope.courseLanguagesP = $http.get('/DTEAdmin/services/Language').success(function (data) {
        $scope.courseLanguages = data.courseLanguage;
    });

//    var stateCodesP = $http.get('courses/StateCode').success(function (data) {
    $scope.stateCodesP = $http.get('/DTEAdmin/services/StateCode').success(function (data) {
        $scope.stateCodes = data.stateCode;
    }).error(function (data, status, headers, config) {
            alert("States : " + status + "<br>" + data);
        });

//    var educationCentersP = $http.get('courses/EducationCenter').success(function (data) {
    $scope.educationCentersP = $http.get('/DTEAdmin/services/EducationCenter').success(function (data) {
        $scope.educationCenters = [].concat(data.educationCenter);
    }).error(function (data, status, headers, config) {
            alert("Ed Centers : " + status + "<br>" + data);
        });

    $scope.courseList = function () {
        Course.list({},
            function (data) {
                //Success
                $scope.courses = data.course;
            }
            , function (data) {

            }
        );
    }

    $scope.courseList();

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

    $scope.advFilterText = {"startDate": "", "endDate": "", "noOfDays": "", "cmPoints": false, "ceuPoints": false, "courseTitle": "", "educationCenter": "", "stateCode": ""
    };
}

//CourseListCtrl.$inject = ['$scope', '$http', '$route', 'Course'];


function CourseDetailCtrl($scope, $routeParams, $http, $q, $location, $parse, Course) {
    $scope.date = new Date();

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
            Course.insert({}, $scope.course, function (res, getResponseHeaders) {
//                var returnHeaders = "";
//                var responseHeaders = getResponseHeaders();
//                for (var key in responseHeaders) {
//                    if (responseHeaders.hasOwnProperty(key)) {
//                        returnHeaders += key + ":" + getResponseHeaders(key) + " | ";
//                    }
//                }
//                alert(returnHeaders);
//                $scope.changeView("course/" + res.id);
                //TODO Test This
                $scope.courses.push(res);
                $scope.changeView("course/new");
            }, function (data, status, headers, config) {
//                var returnHeaders = "";
//                var responseHeaders = getResponseHeaders();
//                for (var key in responseHeaders) {
//                    if (responseHeaders.hasOwnProperty(key)) {
//                        returnHeaders += key + ":" + getResponseHeaders(key) + " | ";
//                    }
//                }
//                alert(returnHeaders);
//                $scope.changeView("course/" + res.id);
                $scope.changeView("courses");
            })
        }
        else {
            Course.update({}, $scope.course, function (res) {
                //TODO Test This
                //TODO fix date sort after change
                for (var i = 0; i < $scope.courses.length; i++) {
                    if ($scope.courses[i].id === $scope.course.id) {
                        $scope.courses[i] = $scope.course;
                        break;
                    }
                }

                $scope.changeView("courses");
            }, function (data, status, headers, config) {
                if (data.status === 409) {
                    alert("Record changed by another user: " + data);
                    $scope.remoteCourse = data;
                    alert(data.address);
//                    $scope.changeView("courseConflict");
                } else {
                    alert("error: " + data.status + data);
                }
            })
        }
    };

    $scope.deleteCourse = function () {
        $scope.course.activeInd = "0";
        $scope.save();
        $scope.changeView("courses");
    };

    $scope.changeView = function (view) {
        $location.path(view); // path not hash
    };

    var changedCourse = $http.get('/DTEAdmin/services/Course/2469').success(function (changedCourse) {
            $scope.remoteCourse = changedCourse;
            $scope.mergedCourse = {};

            $scope.compareCourseProperty("educationCenter");
            $scope.compareCourseProperty("courseTitle");
            $scope.compareCourseProperty("location");
            $scope.compareCourseProperty("address");
            $scope.compareCourseProperty("city");
            $scope.compareCourseProperty("stateCode");
            $scope.compareCourseProperty("startDate");
            $scope.compareCourseProperty("endDate");
            $scope.compareCourseProperty("noOfDays");
            $scope.compareCourseProperty("length");
            $scope.compareCourseProperty("cmPoints");
            $scope.compareCourseProperty("ceuPoints");
            $scope.compareCourseProperty("cost");
            $scope.compareCourseProperty("courseLanguage");
            $scope.compareCourseProperty("url");


            if (+$scope.remoteCourse.id === $scope.course.id) {
                $scope.mergedCourse.id = $scope.remoteCourse.id;
            }

            if ($scope.remoteCourse.activeInd === $scope.course.activeInd) {
                $scope.mergedCourse.activeInd = $scope.course.activeInd;
            }

            if (+$scope.remoteCourse.industryId === $scope.course.industryId) {
                $scope.mergedCourse.industryId = $scope.course.industryId;
            }

            if ($scope.remoteCourse.updateUser === $scope.course.updateUser) {
                $scope.mergedCourse.updateUser = $scope.course.updateUser;
            }
        }
    );

    $scope.compareCourseProperty = function (property) {
        try {
            var localValue = $parse("course." + property);
            var remoteValue = $parse("remoteCourse." + property);
            var mergedValue = $parse("mergedCourse." + property);
            var localStyle = $parse(property + ".localStyle");
            var remoteStyle = $parse(property + ".remoteStyle");
            var mergedStyle = $parse(property + ".mergedStyle");
            var isObject = (Object.prototype.toString.call( localValue($scope)) === '[object Object]');

            if ((isObject && localValue($scope).id == remoteValue($scope).id)
                ||!isObject && localValue($scope) == remoteValue($scope)) {
                mergedValue.assign($scope, localValue($scope));
                localStyle.assign($scope, {"background-color": "green"});
                remoteStyle.assign($scope, {"background-color": "green"});
                mergedStyle.assign($scope, {"background-color": "green"});
            } else if ((isObject && localValue($scope).id == mergedValue($scope).id)
                ||!isObject && localValue($scope) == mergedValue($scope)) {
                localStyle.assign($scope, {"background-color": "green"});
                remoteStyle.assign($scope, {"background-color": "red"});
            } else if ((isObject && remoteValue($scope).id == mergedValue($scope).id)
                ||!isObject && remoteValue($scope) == mergedValue($scope)) {
                localStyle.assign($scope, {"background-color": "red"});
                remoteStyle.assign($scope, {"background-color": "green"});
            } else {
                localStyle.assign($scope, {"background-color": "red"});
                remoteStyle.assign($scope, {"background-color": "red"});
            }

        } catch (e) {
            alert(e)
        }

    }

    $scope.copyCourseProperty = function (property, direction) {
        try {
            var localValue = $parse("course." + property);
            var remoteValue = $parse("remoteCourse." + property);
            var mergedValue = $parse("mergedCourse." + property);

            if (direction === ">") {
                mergedValue.assign($scope, localValue($scope));
            } else {
                mergedValue.assign($scope, remoteValue($scope));
            }

            $scope.compareCourseProperty(property);
        } catch (e) {
            alert(e)
        }

    }
}

//CourseDetailCtrl.$inject = ['$scope', '$routeParams', $http, $q, 'Course'];


function UsersCtrl($scope, $routeParams, $http, $q, $location, User) {

    $scope.user = new User();
    $scope.user.userType = "S";

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

