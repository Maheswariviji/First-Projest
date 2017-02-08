
'use strict';

module.exports = function($scope, $http, CityService, TheatreService,$route,$rootScope,$location) {
  $scope.admin = 'admin';
$scope.showtimes=[];
  $scope.names = [];
    $rootScope.RSeats = [];
   var arr = new Array;
   var rseats= [];
   var aseats= [];
   var st = new Array;

   $('#addseats').click(function(){

           var data = document.getElementById("selectedseats").value;

document.getElementById("selectedseats").innerHTML = "";
           $('#seats').append("<option value='"+data+"'>"+data+"</option>");
       });
   $('#addseats1').click(function(){

           var data = document.getElementById("selectedseats-avail").value;

document.getElementById("selectedseats-avail").innerHTML = "";
           $('#availseats').append("<option value='"+data+"'>"+data+"</option>");
       });

  $('#addtime').click(function(){
          var data = ($('#UserSelector1').val());
          $('#restime').append("<option value='"+data+"'>"+data+"</option>");
      });

      $('#add').click(function(){
              var data = ($('#selecttime').val());
              $('#time').append("<option value='"+data+"'>"+data+"</option>");
          });

  $(document).ready(function() {
    $("div.bhoechie-tab-menu>div.list-group>a").click(function(e) {
        e.preventDefault();
        $(this).siblings('a.active').removeClass("active");
        $(this).addClass("active");
        var index = $(this).index();
        $("div.bhoechie-tab>div.bhoechie-tab-content").removeClass("active");
        $("div.bhoechie-tab>div.bhoechie-tab-content").eq(index).addClass("active");
    });
});


(function(){

    var userRepoService = function($http){

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
    module.factory('userRepoService', userRepoService);

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
   $http.get('http://www.omdbapi.com/?t='+$scope.movieObj.Title+'&y='+$scope.movieObj.Year+'&plot=full&r=json').success(function (response){
        console.log(response);
 for(var key in response)
 {
  if(key=='Title'|| key=='Year' || key== 'Language' || key== 'Poster' || key== 'Genre' || key== 'Director' || key== 'Actors' || key== 'Plot' || key== 'imdbRating')
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
  $scope.addMovie = function () {
                              console.log(movieObj);
                              $http.post('/movie/movie',movieObj).success(function (response) {
                                  console.log(response);
                                  console.log("CREATE IS SUCCESSFUL");
                                  refresh5();
                              });
                          };

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
(function(){

    var getseatInfo = function($http){

      var getshowinfo = function(showinfo){
            return $http.get('/st/st')
                        .then(function(response){
                           return response.data;
                        });
      };

      return {
          get: getshowinfo
      };

    };

    var module = angular.module('movieApp');
    module.factory('getseatInfo', getseatInfo);

}());
             $scope.removeMovie = function (id) {
                              console.log(id);
                              $http.delete('/movie/movie/' + id._id).success(function (response) {
                                  console.log(response);
                                  console.log('DELETED SUCCESSFULLY');
                                  refresh5();
                              });
                          };

                          $scope.editMovie= function (id) {
                               $http.get('/movie/movie/' + id._id).success(function (response) {
                                  $scope.movieObj = response[0];
                                  console.log($scope.movieObj);
                              });
                          };

                          $scope.updateMovie = function () {
                              console.log("REACHED UPDATE");
                              console.log($scope.movieObj._id);
                              $http.put('/movie/movie/' + $scope.movieObj._id, $scope.movieObj).success(function (response) {
                                  console.log(response);
                                  refresh5();
                              })
                          }
  var refreshnow = function () {
                            $http.get('/movieinfo/movieinfo').success(function (response) {
                                console.log('READ IS SUCCESSFUL');
                                $scope.nowlist = response;
                                $scope.now = "";
                            });
                        };

                    refreshnow();

$scope.addMovieInfo = function () {
  var length=$('#time').children('option').length;
console.log(length);
for (var i = 0; i <length; i++)
{
st[i]=$('#time option').eq(i).val();
}
$scope.showtimes=st;
document.getElementById("time").innerHTML = "";
$scope.now.showTime = $scope.showtimes;

  console.log($scope.now);
                              $http.post('/movieinfo/movieinfo',$scope.now).success(function (response) {
                                  console.log(response);
                                  console.log("CREATE IS SUCCESSFUL");
                                  refreshnow();
                              });
                          };
 $scope.removeMovieInfo = function (id) {
                              console.log(id);
                              $http.delete('/movieinfo/movieinfo/' + id._id).success(function (response) {
                                  console.log(response);
                                  console.log('DELETED SUCCESSFULLY');
                                  refreshnow();
                              });
                          };

                          $scope.editMovieInfo= function (id) {
                               $http.get('/movieinfo/movieinfo/' + id._id).success(function (response) {
                                  $scope.now = response[0];
                              });
                          };

                          $scope.updateMovieIfno = function () {
                              console.log("REACHED UPDATE");
                              console.log($scope.now._id);
                              $http.put('/movieinfo/movieinfo/' + $scope.now._id, $scope.now).success(function (response) {
                                  console.log(response);
                                  refreshnow();
                              })
                          }

// city
var refresh = function () {
        $http.get('/city/city').success(function (response) {
            console.log('READ IS SUCCESSFUL');
            $scope.contactlist = response;
            $scope.contact = "";
        });
    };

    refresh();

    $scope.addCity = function () {
        console.log($scope.contact);
        $http.post('/city/city', $scope.contact).success(function (response) {
            console.log(response);
            console.log("CREATE IS SUCCESSFUL");
            refresh();
        });
    };


    $scope.removeCity = function (id) {
        console.log(id);
        $http.delete('/city/city/' + id._id).success(function (response) {
            console.log(response);
            console.log('DELETED SUCCESSFULLY');
            refresh();
        });
    };

    $scope.editCity = function (id) {
         $http.get('/city/city/' + id._id).success(function (response) {
            $scope.contact = response[0];
        });
    };

    $scope.updateCity = function () {
        console.log("REACHED UPDATE");
        console.log($scope.contact._id);
        $http.put('/city/city/' + $scope.contact._id, $scope.contact).success(function (response) {
            console.log(response);
            refresh();
        })
    }
  // trailer collection

var tailer_refresh = function () {
        $http.get('/trailerserver/trailerserver').success(function (response) {
            console.log('READ IS SUCCESSFUL');
            $scope.Trailerlist = response;
            $scope.trailerobj = "";
        });
    };

    $scope.addTrailer = function () {
        console.log($scope.trailerobj);
        $http.post('/trailerserver/trailerserver', $scope.trailerobj).success(function (response) {
            console.log(response);
            console.log("CREATE IS SUCCESSFUL");
            tailer_refresh();
        });
    };

    $scope.removeTrailer = function (id) {
        console.log(id);
        $http.delete('/trailerserver/trailerserver/' + id._id).success(function (response) {
            console.log(response);
            console.log('DELETED SUCCESSFULLY');
            tailer_refresh();
        });
    };

    $scope.editTrailer = function (id) {
         $http.get('/trailerserver/trailerserver/' + id._id).success(function (response) {
            $scope.trailerobj = response[0];
        });
    };

    $scope.updateTrailer = function () {
        console.log("REACHED UPDATE");
        console.log($scope.trailerobj._id);
        $http.put('/trailerserver/trailerserver/' + $scope.trailerobj._id, $scope.trailerobj).success(function (response) {
            console.log(response);
            tailer_refresh();
        })
    }
    // threater
    var threater_refresh = function () {
        $http.get('/threater/threater').success(function (response) {
            console.log('READ IS SUCCESSFUL');
            $scope.Threaterlist = response;
            $scope.tobj = "";
        });
    };

    $scope.addThreater = function () {

      var length=$('#restime').children('option').length;
  console.log(length);
  for (var i = 0; i <length; i++)
  {
    arr[i]=$('#restime option').eq(i).val();
  }
$scope.names=arr;
document.getElementById("restime").innerHTML = "";
$scope.tobj.ShowTime = $scope.names;
 console.log($scope.tobj);
        $http.post('/threater/threater', $scope.tobj).success(function (response) {
            console.log(response);
            console.log("CREATE IS SUCCESSFUL");
            threater_refresh();
        });
         };
  $scope.removeThreater = function (id) {
        console.log(id);
        $http.delete('/threater/threater/' + id._id).success(function (response) {
            console.log(response);
            console.log('DELETED SUCCESSFULLY');
            threater_refresh();
        });
    };

    $scope.editThreater = function (id) {
         $http.get('/threater/threater/' + id._id).success(function (response) {
            $scope.tobj = response[0];
        });
    };

    $scope.updateThreater = function () {
        console.log("REACHED UPDATE");
       console.log($scope.tobj._id);
        $http.put('/threater/threater/' + $scope.tobj._id, $scope.tobj).success(function (response) {
            console.log(response);
           threater_refresh();
        })
    }
// Showtiming
    var refreshshow = function () {
        $http.get('/showtiming/showtiming').success(function (response) {
            console.log('READ IS SUCCESSFUL');
            $scope.Timelist = response;
            $scope.timeobj = "";
        });
    };

    $scope.addTime = function () {
        console.log($scope.timeobj);
        $http.post('/showtiming/showtiming', $scope.timeobj).success(function (response) {
            console.log(response);
            console.log("CREATE IS SUCCESSFUL");
            refreshshow();
        });
    };

    $scope.removeTime = function (id) {
        console.log(id);
        $http.delete('/showtiming/showtiming/' + id._id).success(function (response) {
            console.log(response);
            console.log('DELETED SUCCESSFULLY');
            refreshshow();
        });
    };

    $scope.editTime = function (id) {
         $http.get('/showtiming/showtiming/'+ id._id).success(function (response) {
            $scope.timeobj = response[0];
        });
    };

    $scope.updateTime = function () {
        console.log("REACHED UPDATE");
        console.log($scope.timeobj._id);
        $http.put('/showtiming/showtiming/' + $scope.timeobj._id, $scope.timeobj).success(function (response) {
            console.log(response);
           refreshshow();
        })
    }
// showtime-seat Mapping
var seatMapping = function () {
                        $http.get('/st/st').success(function (response) {
                            console.log('seat mapping');
                            $scope.stlist = response;
                            $scope.st = "";
                        });
                    };

                seatMapping();

                $scope.addseat = function () {
                  var length=$('#seats').children('option').length;
              console.log(length);
              for (var i = 0; i <length; i++)
              {
                rseats[i]=$('#seats option').eq(i).val();
              }

            $rootScope.RSeats=rseats;
     document.getElementById("seats").innerHTML = "";
 var length=$('#availseats').children('option').length;
              console.log(length);
              for (var i = 0; i <length; i++)
              {
                aseats[i]=$('#availseats option').eq(i).val();
              }
              $rootScope.ASeats=aseats;
              document.getElementById("availseats").innerHTML = "";
            $scope.st.reservedSeats = $rootScope.RSeats;
             $scope.st.availableseats = $rootScope.ASeats;
                    console.log($scope.st);
                    $http.post('/st/st', $scope.st).success(function (response) {
                        console.log(response);
                        console.log("Seats added Successfully");
                        seatMapping();
                    });
                };

                $scope.removeSeat = function (id) {
                    console.log(id);
                    $http.delete('/st/st/' + id._id).success(function (response) {
                        console.log(response);
                        console.log('seats removed successfully');
                        seatMapping();
                    });
                };

                $scope.editSeat = function (id) {
                     $http.get('/st/st/'+ id._id).success(function (response) {
                        $scope.st = response[0];
                    });
                };
};
