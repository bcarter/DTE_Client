'use strict';

/* Services */

angular.module('dteCourseAdminServices', ['ngResource']).
    factory('Course',function ($resource) {
        return $resource('/DTEAdmin/services/Course/:courseId', {}, {
        //return $resource('/app/courses/Course.json', {}, {
            list: {method: 'GET', params: {courseId: '', _: Math.random()}, isArray: false},
            query: {method: 'GET', params: {courseId: 'new', _: Math.random()}, isArray: false},
            update: {method: 'PUT'},
            insert: {method: 'POST'}
        });
    }).
    factory('User', function ($resource) {
        return $resource('/DTEAdmin/services/User', {}, {
        //return $resource('/app/courses/User.json', {}, {
            list: {method: 'GET', params: {courseId: '', _: Math.random()}, isArray: false},
            query: {method: 'GET', params: {courseId: 'new', _: Math.random()}, isArray: false},
            update: {method: 'PUT'},
            insert: {method: 'POST'}
        });
    });