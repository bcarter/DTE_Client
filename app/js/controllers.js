'use strict';

/* Controllers */

function CourseListCtrl($scope, $http, $route, $location, Course, Data) {
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

    $scope.changeView = function (view) {
        $location.path(view); // path not hash
    };

    try {
        $scope.logs = Data.getLog();
    } catch (e) {
        alert(e);
    }

    $scope.pushLog = function(message, severity, object){
        Data.addLog(message, severity, object);
        $scope.showLogsButton = true;
    }

    $scope.clearLog = function(){
        Data.clearLog();
        $scope.showLogs = false;
        $scope.showLogsButton = false;
        $scope.messageLabel = "Show";
    }

    $scope.toggleLogs = function(){
        $scope.showLogs = !$scope.showLogs;
        $scope.messageLabel = $scope.showLogs?"Hide":"Show";
    }

    $scope.showLogs = false;
    $scope.showLogsButton = false;
    $scope.messageLabel = "Show";
}

//CourseListCtrl.$inject = ['$scope', '$http', '$route', 'Course', 'Data'];


function CourseDetailCtrl($scope, $routeParams, $location, $q, Course, Data) {
    $scope.date = new Date();

    if ($routeParams.courseId === "new") {
        $scope.course = new Course();
        $scope.course.industryId = 1;
    } else {
        Course.query({courseId: $routeParams.courseId}, function (course) {
            course.noOfDays = parseInt(course.noOfDays);
            course.length = parseInt(course.length);
            course.cmPoints = parseFloat(course.cmPoints);
            course.ceuPoints = parseFloat(course.ceuPoints);
            course.cost = parseFloat(course.cost);
            $q.all([$scope.courseTitlesP, $scope.stateCodesP, $scope.courseLanguagesP, $scope.educationCentersP]).then(function (values) {
                $scope.course = course;
                Data.setCourse($scope.course);
            });
        });
    }

    $scope.save = function () {
        if ($routeParams.courseId === "new") {
            Course.insert({}, $scope.course, function (res, getResponseHeaders) {
                //TODO Make this work
                $scope.course = new Course();
                $scope.course.industryId = 1;
            }, function (data, status, headers, config) {
                $scope.changeView("courses");
            })
        } else {
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
                    alert("Record changed by another user");
//                    $scope.remoteCourse = data;
//                    alert(data.address);
                    $scope.changeView("courseConflict");
                } else {
                    alert("error: " + data.status);
                }
            })
        }
    };

    $scope.deleteCourse = function () {
        $scope.course.activeInd = "0";
        $scope.save();
        $scope.changeView("courses");
    };
}

//CourseDetailCtrl.$inject = ['$scope', '$routeParams', $http, $q, 'Course'];


function UsersCtrl($scope, $routeParams, $q, $location, User) {

    $scope.clearForm = function () {
        $scope.user = new User();
        $scope.user.id = "";
        $scope.user.userType = "A";
    };

    $scope.getUserById = function (userId) {
        User.query({userId: userId}, function (user) {
            $scope.user = user;
        });
    };

    $scope.userList = function () {
        User.list({},
            function (data) {
                //Success
                $scope.users = data.dteUser;
            }
            , function (data) {

            }
        );
    };

    $scope.save = function () {
        if ($scope.user.id === "") {
            User.insert({}, $scope.user , function (res) {
                $scope.userList();
                $scope.clearForm();
                }, function (data, status, headers, config) {
                     alert("error: " + data.status);
                })
        } else {
            User.update({}, $scope.user, function (res) {
                $scope.userList();
                $scope.clearForm();
            }, function (data, status, headers, config) {
                switch (data.status) {
                    case 404: alert("Record does not exist");
                        break;
                    case 412: alert("Invalid Change Request");
                        break;
                    case 409: alert("Record changed by another user");
                        break;
                    defalut: alert("Error: " + data.status);
                }

                $scope.userList();
            })
        }
    };

    $scope.userList();
    $scope.clearForm();
}

//UsersCtrl.$inject = ['$scope', '$routeParams', $http, $q, 'Course'];


function CourseConflictCtrl($scope, $http, $parse, Data, Course) {
    try {
        $scope.course = Data.getCourse();
//        $scope.course = $http.get('/DTEAdmin/services/Course/2641');
    } catch (e) {
        alert(e);
    }

    var changedCourse = $http.get('/DTEAdmin/services/Course/' + $scope.course.id).success(function (changedCourse) {
            $scope.remoteCourse = changedCourse;
            try {
                $scope.remoteCourse.noOfDays  = +$scope.remoteCourse.noOfDays;
                $scope.remoteCourse.length  = +$scope.remoteCourse.length;
                $scope.remoteCourse.cmPoints  = +$scope.remoteCourse.cmPoints;
                $scope.remoteCourse.ceuPoints  = +$scope.remoteCourse.ceuPoints;
                $scope.remoteCourse.cost  = +$scope.remoteCourse.cost;
            } catch (e){
                alert(e);
            }

            $scope.mergedCourse = {};

            $scope.compareCourseProperty("edCenterId");
            $scope.compareCourseProperty("titleId");
            $scope.compareCourseProperty("location");
            $scope.compareCourseProperty("address");
            $scope.compareCourseProperty("city");
            $scope.compareCourseProperty("stateId");
            $scope.compareCourseProperty("startDate");
            $scope.compareCourseProperty("endDate");
            $scope.compareCourseProperty("noOfDays");
            $scope.compareCourseProperty("length");
            $scope.compareCourseProperty("cmPoints");
            $scope.compareCourseProperty("ceuPoints");
            $scope.compareCourseProperty("cost");
            $scope.compareCourseProperty("langId");
            $scope.compareCourseProperty("url");


            $scope.mergedCourse.id = $scope.remoteCourse.id;
            $scope.mergedCourse.activeInd = $scope.course.activeInd;
            $scope.mergedCourse.industryId = $scope.course.industryId;
            $scope.mergedCourse.updateUser = $scope.course.updateUser;
            $scope.mergedCourse.updateDate = $scope.remoteCourse.updateDate;
        }
    );

    $scope.compareCourseProperty = function (property, dataType) {
        try {
            var localValue = $parse("course." + property);
            var remoteValue = $parse("remoteCourse." + property);
            var mergedValue = $parse("mergedCourse." + property);
            var localStyle = $parse(property + ".localStyle");
            var remoteStyle = $parse(property + ".remoteStyle");
            var mergedStyle = $parse(property + ".mergedStyle");
            var isObject = (Object.prototype.toString.call(localValue($scope)) === '[object Object]');

            if ((isObject && localValue($scope).id == remoteValue($scope).id)
                || !isObject && localValue($scope) == remoteValue($scope)) {
                mergedValue.assign($scope, localValue($scope));
                localStyle.assign($scope, {"border": "1px solid green", "padding": "4px"});
                remoteStyle.assign($scope, {"border": "1px solid green", "padding": "4px"});
                mergedStyle.assign($scope, {"border": "1px solid green", "padding": "4px"});
            } else if ((isObject && localValue($scope).id == mergedValue($scope).id)
                || !isObject && localValue($scope) == mergedValue($scope)) {
                localStyle.assign($scope, {"border": "1px solid green", "padding": "4px"});
                remoteStyle.assign($scope, {"border": "1px solid red", "padding": "4px"});
            } else if ((isObject && remoteValue($scope).id == mergedValue($scope).id)
                || !isObject && remoteValue($scope) == mergedValue($scope)) {
                localStyle.assign($scope, {"border": "1px solid red", "padding": "4px"});
                remoteStyle.assign($scope, {"border": "1px solid green", "padding": "4px"});
            } else {
                localStyle.assign($scope, {"border": "1px solid red", "padding": "4px"});
                remoteStyle.assign($scope, {"border": "1px solid red", "padding": "4px"});
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

    $scope.save = function () {
        Course.update({}, $scope.mergedCourse, function (res) {
                //TODO Test This
                //TODO fix date sort after change
            for (var i = 0; i < $scope.courses.length; i++) {
                if ($scope.courses[i].id === $scope.mergedCourse.id) {
                    $scope.courses[i] = $scope.mergedCourse;
                    break;
                }
            }

            $scope.changeView("courses");
            }, function (data, status, headers, config) {
                if (data.status === 409) {
                    alert("Record changed by another user");
//                    $scope.remoteCourse = data;
//                    alert(data.address);
                    $scope.changeView("courseConflict");
                } else {
                    alert("error: " + data.status);
                }
            })
    };
}

//UsersCtrl.$inject = ['$scope', '$routeParams', $http, $q, 'Course'];

