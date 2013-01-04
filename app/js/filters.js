'use strict';

/* Filters */
var app=angular.module('dteCourseAdminFilters', []);

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

      for (var i = 0; i < courses.length; i++){
          checkDate = new Date(courses[i].startDate);

          if((advFilterText.noOfDays == "" || courses[i].noOfDays===advFilterText.noOfDays)
              &&(!advFilterText.cmPoints || courses[i].cmPoints > 0)
              &&(!advFilterText.ceuPoints || courses[i].ceuPoints > 0)
              &&(typeof advFilterText.startDate != "object" || advFilterText.startDate === null || checkDate.toUTCString() === advFilterText.startDate.toUTCString())
              &&(typeof advFilterText.endDate != "object" || advFilterText.endDate === null || (new Date(courses[i].endDate)).toUTCString() === advFilterText.endDate.toUTCString())
              &&( advFilterText.courseTitle === "" || (courses[i].courseTitle.name === advFilterText.courseTitle))
              &&( advFilterText.educationCenter === "" || (courses[i].educationCenter.name === advFilterText.educationCenter))
              &&( advFilterText.stateCode === "" || (courses[i].stateCode.description === advFilterText.stateCode))){
              out.push(courses[i]);
          }
      }
    return out;
    }
});
