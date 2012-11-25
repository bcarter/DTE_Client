'use strict';

/* Services */

angular.module('phonecatServices', ['ngResource']).
    factory('Course', function($resource){
        return $resource('courses/:course_id.json', {}, {
            query: {method:'GET', params:{course_id:'courses'}, isArray:true}
        });
    });