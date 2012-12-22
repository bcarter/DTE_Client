'use strict';

/* Services */

angular.module('dteCourseAdminServices', ['ngResource']).
    factory('Course', function($resource){
        // return $resource('courses/course_1954.json', {}, {
        return $resource('/app/courses/Course.json', {}, {
            list: {method:'GET', params:{course_id:'',_:Math.random()}, isArray:false},
            query: {method:'GET', params:{course_id:'new',_:Math.random()}, isArray:false},
            update: {method:'PUT'},
            insert: {method:'POST'}
        });
    }).
    factory('User', function($resource){
        // return $resource('courses/course_1954.json', {}, {
        return $resource('/app/courses/User.json', {}, {
            list: {method:'GET', params:{course_id:'',_:Math.random()}, isArray:false},
            query: {method:'GET', params:{course_id:'new',_:Math.random()}, isArray:false},
            update: {method:'PUT'},
            insert: {method:'POST'}
        });
    });