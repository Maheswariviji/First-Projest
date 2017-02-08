'use strict';

module.exports = function ($scope, $q, $location, AuthService) {
var vm = this;

$scope.sign=function () {
  $location.path('/register');
}
    $scope.login = function () {

      // initial values
      $scope.error = false;
      $scope.disabled = true;  //not enable

      // call login from service
      AuthService.login($scope.loginForm.username, $scope.loginForm.password, $q)
        // handle success
        .then(function () {
        $location.path('/admin');
           
          $scope.disabled = false;
          $scope.loginForm = {};
        })
        // handle error
        .catch(function () {
          $scope.error = true;
          $scope.errorMessage = "Invalid username and/or password";
          $scope.disabled = false;
          $scope.loginForm = {};
        });

    };

}
