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

app.filter('cmGTZero', function() {
    return function(courses, advFilterText) {
        var out = [];
        var checkDate;

//        if (typeof advFilterText.startDate === "object") {alert(advFilterText.startDate)}
      for (var i = 0; i < courses.length; i++){
          checkDate = new Date(courses[i].startDate);
//          alert(typeof checkDate);

          if((advFilterText.noOfDays == "" || courses[i].noOfDays===advFilterText.noOfDays)
              &&(!advFilterText.cmPoints || courses[i].cmPoints > 0)
              &&(!advFilterText.ceuPoints || courses[i].ceuPoints > 0)
              &&(typeof advFilterText.startDate != "object" || advFilterText.startDate === null || checkDate.toUTCString() === advFilterText.startDate.toUTCString())
              &&(typeof advFilterText.endDate != "object" || advFilterText.endDate === null || (new Date(courses[i].endDate)).toUTCString() === advFilterText.endDate.toUTCString())){
              out.push(courses[i]);
          }
      }
    return out;
    }
});