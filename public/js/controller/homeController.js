'use strict';

module.exports = function($scope, MovieList, $http, $rootScope,$location) {
 MovieList.addMovie("kabali");
$scope.home = 'home';
  $scope.cart = [];
  $scope.Hidden=false;
  $scope.Hidden = $scope.Hidden ? false : true;
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

    var loadInformations = function(){
    	 $http.get('/city/getCity').success(function (response) {
            console.log('load city entered');
            console.log(response);
            var dropdown = document.getElementById("city");
			if (dropdown) {
				for (var key in response) {
				  if (response.hasOwnProperty(key)) {
				    addOption(dropdown, response[key].name);
				  }
				}
			}

			function addOption(selectbox, value) {
			    var optn = document.createElement("OPTION");
			    optn.text = value;
			    optn.value = value;
			    selectbox.options.add(optn);
			}
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

    refresh();
    loadInformations();

    $(document).ready(function(e){
    $('.search-panel .dropdown-menu').find('a').click(function(e) {
        e.preventDefault();
        var param = $(this).attr("href").replace("#","");
        var concept = $(this).text();
        $('.search-panel span#search_concept').text(concept);
        $('.input-group #search_param').val(param);
    });
});

$scope.Booking = function(moviess){
        console.log(moviess);

                                  $rootScope.moviebking=moviess;
                                  $location.path('/booking');
$route.reload();
 }

  $scope.Review = function (moviess){

      console.log(moviess);

                                  $rootScope.moviereview=moviess;
                                  $location.path('/reviews');
$route.reload();
                          };

};
