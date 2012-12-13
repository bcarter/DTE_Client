'use strict';

/* Filters */
var app=angular.module('dteCourseAdminFilters', []);

app.filter('checkmark', function() {
    return function(input) {
        return input ? '\u2713' : '\u2718';
    };
});

app.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});

app.filter('stateCD', function() {
    return function(input, stateCd) {
        //return 1==1; //input.stateCode.stateCd=="KS";
        var out = [];
      for (var i = 0; i < input.length; i++){
          if(input[i].stateCode.stateCd==stateCd)
              out.push(input[i]);
      }      
    return out;
    }
});