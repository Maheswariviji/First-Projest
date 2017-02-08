'use strict';

module.exports = function($scope,$route,$rootScope, $http,$location) {
  $scope.bing=$rootScope.bookingconfirm;
  console.log($scope.bing);
  var phone,mail,name;

  var refreshbk = function () {
        $http.get('/pay/pay').success(function (response) {
            console.log('confirmation IS SUCCESSFUL');
            $scope.cnflist = response;
            $scope.cnf = "";
        });
    };

    refreshbk();
     var seatMapping = function () {
     $http.get('/st/st' ).success(function (response) {
                                                             console.log('seat mapping');
                                                            $scope.stlist = response;
                                                            $scope.st="";
                                                          });
                                                                         };
                                                                           seatMapping();

  $scope.confirm = function () {
$scope.cnf.mName=$scope.bing.mName;
$scope.cnf.Date =$scope.bing.BDate;
$scope.cnf.tName=$scope.bing.tName;
$scope.cnf.BookingID=$scope.bing.BookingID;
$scope.cnf.tLoc=$scope.bing.tLoc;
$scope.cnf.sTime=$scope.bing.sTime;
$scope.cnf.noofTickets=$scope.bing.noofTickets;
$scope.cnf.seatno=$scope.bing.seatno;
console.log($scope.cnf.seatno);
$scope.cnf.amountPaid=$scope.bing.amountPaid;
console.log($scope.cnf);
   $http.post('/pay/pay', $scope.cnf).success(function (response) {
          console.log(response);
          console.log($scope.cnf);
console.log("Confirmed IS SUCCESSFUL");

$rootScope.pay=$scope.cnf;
$location.path('/pay');
  });
  };
  };
