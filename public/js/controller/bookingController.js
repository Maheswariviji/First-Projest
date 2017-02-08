'use strict';

module.exports = function($scope,$route,$rootScope, $http,$location) {
  $scope.movie = $rootScope.moviebking;
var countdiv=[];
$rootScope.seatsres=[];
 $scope.goCats = false;
 var noofSeats,sel,total,seatNum ,i,sdate,selectdate;
 $(document).ready(function(){
    $(".dropdown-toggle").dropdown();
});
  $(function () {
 var numMin =  '11';
     var numMax = '111';
var adjustedHigh = (parseFloat(numMax) - parseFloat(numMin)) + 1;
 var numRand = Math.floor(Math.random() * adjustedHigh) + parseFloat(numMin);
 if ((IsNumeric(numMin)  && (IsNumeric(numMax)) && (parseFloat(numMin) <= parseFloat(numMax )) && (numMin != '') && (numMax != ''))) {
         $("#randomnumber").val('B'+numRand);
     }
});

function IsNumeric(n){
    return !isNaN(n);
}
  (function(){

      var userSelector = function($http){

        var getUsers = function(username){
              return $http.get('/city/city')
                          .then(function(response){
                             return response.data;
                          });
        };

        return {
            get: getUsers
        };

      };

      var module = angular.module('movieApp');
      module.factory('userSelector', userSelector);

  }());
   // Dropdownlist showtime

  (function(){

      var movietime = function($http){

        var getUsers = function(username){
              return $http.get('/showtiming/showtiming')
                          .then(function(response){
                             return response.data;
                          });
        };

        return {
            get: getUsers
        };

      };

      var module = angular.module('movieApp');
      module.factory('movietime', movietime);

  }());
  //dropdownlist threater
  (function(){

      var threaterloc = function($http){

        var getUsers = function(username){
              return $http.get('/threater/threater')
                          .then(function(response){
                             return response.data;
                          });
        };

        return {
            get: getUsers
        };

      };

      var module = angular.module('movieApp');
      module.factory('threaterloc', threaterloc);

  }());
  var movieObj={};
  $scope.getData = function(){
    console.log('Hi Welcome');
     $http.get('http://www.omdbapi.com/?t='+$scope.movieObj.Title+'&y='+$scope.movieObj.Year+'&plot=short&r=json').success(function (response){
          console.log(response);
   for(var key in response)
   {
    if(key=='Title'|| key=='Year' || key== 'Language' || key== 'Poster' || key== 'Genre' || key== 'Director' || key== 'Actors')
        {
        movieObj[key] = response[key];
        }

      console.log(movieObj);

        }
             refresh5();
    });
  }

  var refresh5 = function () {
                              $http.get('/movie/movie').success(function (response) {
                                  console.log('READ IS SUCCESSFUL');
                                  $scope.movieObj = response;
                                  $scope.moviess = "";
                              });
                          };

                    refresh5();

                      (function(){

                          var getMovieInfo = function($http){

                            var getshowinfo = function(showinfo){
                                  return $http.get('/movieinfo/movieinfo')
                                              .then(function(response){
                                                 return response.data;
                                              });
                            };

                            return {
                                get: getshowinfo
                            };

                          };

                          var module = angular.module('movieApp');
                          module.factory('getMovieInfo', getMovieInfo);

                      }());
      var refresh = function () {
                                                      $http.get('/city/city').success(function (response) {
                                                          console.log('READ IS SUCCESSFUL');
                                                          $scope.contactlist = response;
                                                          $scope.contact = "";
                  });
                };
  refresh();
                                                          var threater_refresh = function () {
                                                              $http.get('/threater/threater').success(function (response) {
                                                                  console.log('READ IS SUCCESSFUL');
                                                                  $scope.Threaterlist = response;
                                                                  $scope.tobj = "";
                                                              });
                                                          };

                                                          threater_refresh();
                                                  var refreshshow = function () {
                                                      $http.get('/showtiming/showtiming').success(function (response) {
                                                          console.log('READ IS SUCCESSFUL');
                                                          $scope.Timelist = response;
                                                          $scope.timeobj = "";
                                                      });
                                                  };
                                                  refreshshow();

                                                  var refreshbk = function () {
                                                        $http.get('/bk/bk').success(function (response) {
                                                            console.log('READ IS SUCCESSFUL');
                                                            $scope.bklist = response;
                                                            $scope.bking = "";
                                                        });
                                                    };


                                                    refreshbk();

                                                    var refreshnow = function () {
                            $http.get('/movieinfo/movieinfo').success(function (response) {
                                console.log('READ IS SUCCESSFUL');
                                $scope.nowlist = response;
                                $scope.now = "";
                            });
                        };

                        var refreshnow = function () {
                                                $http.get('/movieinfo/movieinfo').success(function (response) {
                                                    console.log('getting movie details');
                                                    $scope.nowlist = response;
                                                    $scope.now = "";
                                                });
                                            };

                                            refreshnow();

 // ----seat arrangement------

 $scope.rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
        $scope.cols = [1, 2, 3, 4, 5, 6, 7, 8 ,9 ,10 ];

        // Set reserved and selected $rootScope.Rseat_no
var selected = [];
var reserved=[];
  $scope.getStatus = function(seatPos) {
  if(reserved.indexOf(seatPos) > -1) {
                return 'reserved';
            } else if(selected.indexOf(seatPos) > -1) {
                return 'selected';
            }

        }

        // clear selected
        $scope.clearSelected = function() {
            selected = [];
        }
        var seatMapping = function () {

                                                                           $http.get('/st/st' ).success(function (response) {
                                                             console.log('seat mapping');
                                                            $scope.stlist = response;
                                                            $scope.st="";
                                                          });
                                                                         };
                                                                           seatMapping();

$scope.show =function()
{
console.log($scope.bking.tLoc);
console.log($scope.bking.tName);
//console.log($scope.bking.BDate);
  selectdate = document.getElementById("date").value;
  console.log(selectdate);
console.log($scope.bking.sTime);
 try
 {
  for(i=0;i<=$scope.stlist.length;i++)
        {
          if($scope.stlist.length==0)
          {
            $scope.goCats = true;
          }
        else
          {
  if($scope.stlist[i].Title===$scope.movie.Title && $scope.stlist[i].City===$scope.bking.tLoc  && $scope.stlist[i].TName===$scope.bking.tName  && $scope.stlist[i].showTime===$scope.bking.sTime && $scope.stlist[i].SDate==selectdate)
            {
              console.log($scope.stlist[i].Title);
               console.log($scope.stlist[i].City);
             console.log($scope.stlist[i].TName);
             console.log($scope.stlist[i].SDate);
             console.log($scope.stlist[i].showTime);
           $scope.goCats = true;
           reserved=$scope.stlist[i].reservedSeats;
         console.log(reserved);

       }
        else
        {
           $scope.goCats = true;
        }
        }
  }
     }
      catch(e){}

};
$scope.seatClicked = function(seatPos) {
 console.log("Selected Seat: " + seatPos);
    var index = selected.indexOf(seatPos);
    if(index != -1) {
        // seat already selected, remove
        selected.splice(index, 1)
    } else {
        // new seat, push
        selected.push(seatPos);
console.log(selected);

document.getElementById("st").innerHTML=selected;
        seatNum=document.getElementById("st").innerHTML;

       noofSeats=selected.length;
         sel = document.getElementById("seats").value;
  document.getElementById("totalst").innerHTML =sel;
   if(sel==noofSeats)
         {
           total=noofSeats*200;
            document.getElementById("amt").innerHTML = total;
            $scope.goCats = false;

}
reserved.push(seatPos);
console.log(reserved);
  $rootScope.seatsres=reserved;

 }

};
  $scope.addbk = function () {
 sdate = document.getElementById("date").value;
  console.log(sdate);
 $scope.bking.BDate =sdate
          $scope.amt=total;
         $scope.bking.mName= $scope.movie.Title;
  $scope.bking.seatno=seatNum;
  console.log($scope.bking.seatno);
        $scope.bking.amountPaid=  $scope.amt;
  console.log($scope.bking);
             $http.post('/bk/bk', $scope.bking).success(function (response) {
  console.log(response);
        console.log("CREATE IS SUCCESSFUL");
$rootScope.bookingconfirm=$scope.bking;
 $location.path('/confirm');
        $route.reload();
                    refreshbk();
                });
            };
          };
