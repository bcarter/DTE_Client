'use strict';

/* Services */

angular.module('dteCourseAdminServices', ['ngResource']).
    factory('Course', function($resource){
       return $resource('/DTEAdmin/services/Course/:course_id', {}, {
            list: {method:'GET', params:{course_id:'',_:Math.random()}, isArray:false},
            query: {method:'GET', params:{course_id:'new',_:Math.random()}, isArray:false},
            update: {method:'PUT'},
            insert: {method:'POST'}
        });
    });