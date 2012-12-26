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
    return function(input, advFilterText) {
        var out = [];
        var checkDate;

//        if (typeof advFilterText.startDate === "object") {alert(advFilterText.startDate)}
      for (var i = 0; i < input.length; i++){
          checkDate = new Date(input[i].startDate);
//          alert(typeof checkDate);

          if((advFilterText.noOfDays == "" || input[i].noOfDays===advFilterText.noOfDays)
              &&(!advFilterText.cmPoints || input[i].cmPoints > 0)
              &&(!advFilterText.ceuPoints || input[i].ceuPoints > 0)
              &&(typeof advFilterText.startDate != "object" || advFilterText.startDate === null || checkDate.toUTCString() === advFilterText.startDate.toUTCString())
              &&(typeof advFilterText.endDate != "object" || advFilterText.endDate === null || (new Date(input[i].endDate)).toUTCString() === advFilterText.endDate.toUTCString())){
              out.push(input[i]);
          }
      }
    return out;
    }
});