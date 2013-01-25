'use strict';

/* Directives */


var app = angular.module('dteCourseAdminDirectives', []);

app.directive("conflictItem", function(){
  return {
      restrict: "E",
      scope: {
          objectName: "@objectName"
      },
      compile: function(element, attrs)
      {
//          var type = attrs.objectName || 'text';
          var required = attrs.hasOwnProperty('required') ? "required='required'" : "";
//          var htmlText = '<div class="control-group">' +
//              '<label class="control-label" for="' + attrs.objectName + '">' + attrs.label + '</label>' +
//              '<div class="controls">' +
//              '<input type="' + type + '" class="input-xlarge" id="' + attrs.formId + '" name="' + attrs.formId + '" ' + required + '>' +
//              '</div>' +
//              '</div>';

          var htmlText = '<div class="row-fluid" style="margin:4px 0">' +
              '<div class="span2">' + attrs.label + '*</div>' +
              '<div class="span3" ng-style="' + attrs.objectName + '.localStyle" ng-click="copyCourseProperty(\'' + attrs.objectName + '\', \'>\')">{{course.' + attrs.objectName + '}}</div>' +
              '<div class="span3" ng-style="' + attrs.objectName + '.mergedStyle"><input class="input-block-level" id="' + attrs.objectName + 'Input" type="text" ' +
              'ng-model="mergedCourse.' + attrs.objectName + '" ng-required="true" tabindex="3"></div>' +
              '    <div class="span3" ng-style="' + attrs.objectName + '.remoteStyle" ng-click="copyCourseProperty(\'' + attrs.objectName + '\', \'<\')">{{remoteCourse.' + attrs.objectName + '}}</div>' +
              '</div>';

          element.replaceWith(htmlText);
      }
//            template: '<div>'+attrs.objectName+'</div>'
//      template: "<div class=\"row-fluid\" style=\"margin:4px 0\"><div class=\"span2\">{{objectName}}:</div><div class=\"span3\" ng-style=\"location.localStyle\" ng-click=\"copyCourseProperty('location', '>')\">{{course.location}}</div><div class=\"span3\" ng-style=\"location.mergedStyle\"><input class=\"input-block-level\" id=\"locationInput\" type=\"text\" ng-model=\"mergedCourse.location\" ng-required=\"true\" tabindex=\"3\"></div><div class=\"span3\" ng-style=\"location.remoteStyle\" ng-click=\"copyCourseProperty('location', '<')\">{{remoteCourse.location}}</div></div>"
  }
});

app.directive("pricingTable", function($compile) {
    return {
        restrict: 'E',
        scope: {
            objectName: "=objectName"
        },
        template:
            '<table border="1">' +
                '<thead>' +
                '<tr>' +
                '<th>Mon{{remoteCourse.'+objectName+'}}</th>' +
                '<th>Tue</th>' +
                '<th>Wed</th>' +
                '<th>Thu</th>' +
                '<th>Fri</th>' +
                '<th>Sat</th>' +
                '<th>Sun</th>' +
                '</tr>' +
                '</thead>' +
                '<tbody>' +
                '</tr>' +
                '</tbody>' +
                '</table>',
        replace: true,
        link: function (scope, element, attrs) {}
    };
});

