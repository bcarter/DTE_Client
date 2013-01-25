'use strict';

/* Services */
var app=angular.module('dteCourseAdminServices', ['ngResource']);

app.factory('Course',function ($resource) {
        return $resource('/DTEAdmin/services/Course/:courseId', {}, {
        //return $resource('/app/courses/Course', {}, {
            list: {method: 'GET', params: {courseId: '', _: Math.random()}, isArray: false},
            query: {method: 'GET', params: {courseId: 'new', _: Math.random()}, isArray: false},
            update: {method: 'PUT'},
            insert: {method: 'POST'}
        });
    });

app.factory('User', function ($resource) {
        return $resource('/DTEAdmin/services/User/:userId', {}, {
        //return $resource('/app/courses/User.json', {}, {
            list: {method: 'GET', params: {userId: '', _: Math.random()}, isArray: false},
            query: {method: 'GET', params: {userId: 'new', _: Math.random()}, isArray: false},
            update: {method: 'PUT'},
            insert: {method: 'POST'}
        });
    });

app.factory('Data', function(){
    var course = {};
    var log = [];
    return {
        getCourse:function () {
            return course;
        },
        setCourse:function (value) {
            course = value;
        },
        getLog:function () {
            return log;
        },
        addLog:function (message, severity, object) {
            log.push({"message":message
                    , "severity":severity
                    , "object":object});
        },
        clearLog:function () {
            log.splice(0,log.length);
        }
    };
});