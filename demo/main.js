/*global angular*/
'use strict()';

var app = angular.module('demoApp', []);

app.controller('mainCtrl', ['$scope', '$http', function ($scope, $http) {
  $scope.sendThis = {
    uastring: 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.111 Safari/537.36'
  };
  $scope.parsedList = [];

  $scope.parseThis = function () {
    $http({
        url: 'http://localhost:5002/parser/',
        method: 'POST',
        data: $scope.sendThis,
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json'
        }
      })
      .then(
        function success(res) {
          console.log(res);
          res.data.userAgentString = angular.copy($scope.sendThis);
          $scope.parsedList.push(res.data);
        },
        function failure(res) {
          console.error('Unable to parse string.');
        }
      );
  }
}]);
