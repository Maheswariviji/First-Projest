'use strict';

module.exports = function($scope, MovieList, $http, $rootScope,$location) {

var refresh = function () {
        $http.get('http://www.omdbapi.com/?t=titanic&plot=short&r=json').success(function (response) {
            console.log(response);
            var movieObj={};
            for(var key in response){
            	if(key=='Title' || key== 'Language' || key== 'Poster' || key== 'Genre' || key== 'Director' || key== 'Actors'){
            		movieObj[key] = response[key];

            	}
            }
           console.log(movieObj);
        });
    };
    var refresh5 = function () {
                            $http.get('/movie/movie').success(function (response) {
                                console.log('READ IS SUCCESSFUL');
                                $scope.movieObj = response;
                                $scope.moviess = "";
                            });
                        };

                    refresh5();

    refresh();
};
