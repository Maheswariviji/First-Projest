'use strict';

module.exports = function($scope,$route,$rootScope, $http,$location) {
  $scope.confirm = $rootScope.pay;

    $scope.newseat=[];
    $scope.oldseat=[];
      var seat=[];
      $scope.seat1=[];
    $scope.seat1= $rootScope.seatsres;

  var seatMapping = function () {

                                                                        $http.get('/st/st' ).success(function (response) {
                                                          console.log('seat mapping');
                                                         $scope.stlist = response;
                                                         $scope.st="";
                                                       });
                                                                      };
                                                                        seatMapping();
$scope.pay = function () {
  $scope.st.Title=$scope.confirm.mName;
  $scope.st.City =$scope.confirm.tLoc;
  $scope.st.TName=$scope.confirm.tName;
   $scope.st.SDate=$scope.confirm.Date;
  $scope.st.showTime=$scope.confirm.sTime;
  $scope.st.reservedSeats= $scope.seat1;
  console.log(  $scope.st.reservedSeats);
    console.log($scope.st);
    $http.post('/st/st',$scope.st).success(function (response) {
  console.log(response);
  console.log("seats posted successfully");
  alert("Booked Successfully");
    $location.path('/home');
    });
  };

};
