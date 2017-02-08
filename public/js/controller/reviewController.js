'use strict';

module.exports = function($scope,$route,$rootScope,$http,$location) {
  $scope.movieRw = $rootScope.moviereview;
var cnt=0;
  $scope.ratecount=0;
 var mname;
 $rootScope.s=$scope.movieRw.Title;
  $(function () {

     var numMin =  '55';
     var numMax = '555';

     var adjustedHigh = (parseFloat(numMax) - parseFloat(numMin)) + 1;
 var numRand = Math.floor(Math.random() * adjustedHigh) + parseFloat(numMin);
 if ((IsNumeric(numMin)  && (IsNumeric(numMax)) && (parseFloat(numMin) <= parseFloat(numMax )) && (numMin != '') && (numMax != ''))) {
         $("#randomnumber").val('R'+numRand);
     }
});
function IsNumeric(n){
    return !isNaN(n);
}
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

var reviewrefresh = function () {
                            $http.get('/cmt/cmt').success(function (response) {
                                console.log('READ IS SUCCESSFUL');
                                $scope.reviewObj = response;
                                $scope.reviewmovie = "";
                            });
                        };

                    reviewrefresh();
                    var rating = function() {
                            $http.get('/avg/avg').success(function (response) {
                                console.log('Rating IS SUCCESSFUL');
                                $scope.rateObj = response;
                                $scope.robj = "";
                              });
                        };

                    rating();
    $("#modal").click(function(){
  $scope.reviewmovie.MovieTitle= $scope.movieRw.Title;
                            $http.post('/cmt/cmt',$scope.reviewmovie).success(function (response) {
                                                            console.log(response);
                                                            mname=$scope.reviewmovie.MovieTitle;
                                                            console.log("REVIEW  IS ADDED  SUCCESSFUL");
                            $http.get('/cmt/cmt').success(function (response) {
                                                                 console.log(response);
 var count=0;
                               var i;
                               try
                              {
                                  for(i=0;i<=response.length;i++)
                                  {
                                    if(response[i].MovieTitle== mname)
                                    {
                                      cnt++;
                                    count+=parseInt(response[i].ratingvalue);
                                  }

                                  }

                                }
                               catch(e){}

                                if(count>0)
                                {
                                  $scope.ratecount=Math.round(count*100/(cnt*5));
                                  console.log($scope.ratecount);

                                }

                            });
                              });
                                 $("#myModal").modal();

                             });
  $scope.addavg = function () {
                            console.log("REACHED UPDATE");
                            var i;
                            for(i=0;i<=$scope.movieObj.length;i++)
                                  {
                                    if($scope.movieObj[i].Title== $scope.movieRw.Title){
                    console.log($scope.movieObj[i]._id);

                              $scope.movieObj[i].avg=$scope.ratecount;
                              console.log($scope.movieObj[i]);
                              $http.put('/movie/movie/' + $scope.movieObj[i]._id, $scope.movieObj[i]).success(function (response) {
                                  console.log(response);
                                  refresh5();
                                  $location.path('/home');
                              });
                            }
}
  };
};
