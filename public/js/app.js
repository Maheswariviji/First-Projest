'use strict';


var angular = require('angular');
require('angular-route');
window.$ = window.jQuery = require('jquery');
require('bootstrap');
require('angularjs-dropdown-multiselect');
require('../css/app.scss');

var app = angular.module('movieApp', [ 'ngRoute', 'angularjs-dropdown-multiselect']);


require('./controller');
require('./service');

app.config(function($routeProvider) {

  $routeProvider.when('/', {
    templateUrl: 'views/home.html',
    controller: 'HomeController',
  })

  .when('/login', {
      templateUrl: 'views/login.html',
      controller: 'LoginController',
      access: {restricted: false}
    })
    .when('/logout', {
      controller: 'LogoutController',
      access: {restricted: true}
    })
    .when('/register', {
      templateUrl: 'views/register.html',
      controller: 'RegisterController',
      access: {restricted: false}
    })
  .when('/admin', {
    templateUrl: 'views/admin.html',
    controller: 'AdminController',
    access: {restricted: true}

  }).when('/reviews', {
    templateUrl: 'views/reviews.html',
    controller: 'ReviewController',
  })
  .when('/trailer', {
    templateUrl: 'views/trailer.html',
controller: 'TrailerController',
  })
  .when('/movies', {
    templateUrl: 'views/movies.html',
    controller: 'MovieController',
  })
  .when('/booking', {
    templateUrl: 'views/booking.html',
    controller: 'BookingController',
  })
   .when('/cancellation', {
      templateUrl: 'views/cancellation.html',
      controller: 'CancellationController',
    })
    .when('/confirm', {
       templateUrl: 'views/confirm.html',
       controller: 'ConfirmController',
     })
    .when('/search', {
    templateUrl: 'views/search.html',
    controller: 'SearchController',
  })
     .when('/sample', {
    templateUrl: 'views/sample.html',
    controller: 'SampleController',
  })
  .when('/pay', {
 templateUrl: 'views/pay.html',
 controller: 'PayController',
})
     .when('/excess design', {
    templateUrl: 'views/excess design.html',
    // controller: 'SearchController',
  })
  .otherwise({
    redirectTo: '/',
  });
});

app.run(function ($rootScope, $location, $route, AuthService) {
  $rootScope.$on('$routeChangeStart',
    function (event, next, current) {
      AuthService.getUserStatus()
      .then(function(){
        if (next.access.restricted && !AuthService.isLoggedIn()){
          $location.path('/login');
          $route.reload();
        }
      });
  });
});

// app.filter('unique', function() {
//     return function(input, key) {
//         var unique = {};
//         var uniqueList = [];
//         for(var i = 0; i < input.length; i++){
//             if(typeof unique[input[i][key]] == "undefined"){
//                 unique[input[i][key]] = "";
//                 uniqueList.push(input[i]);
//             }
//         }
//         return uniqueList;
//     };
// });


// ============factory for movie title=======
 //  app.factory("myFactory",function($http){
 //    var saveddata={};
 // function set(moviess){
 //  saveddata=moviess;
 // }
 // function get(moviess){
 //  return saveddata
 // }
 // return{
 //  set:set,
 //  get:get
 // }
 //  })

// .directive('starRating',
//   function() {
//     return {
//       restrict : 'A',
//       template : '<ul class="rating">'
//            + '  <li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)">'
//            + '\u2605'
//            + '</li>'
//            + '</ul>',
//       scope : {
//         ratingValue : '=',
//         max : '=',
//         onRatingSelected : '&'
//       },
//       link : function(scope, elem, attrs) {
//         var updateStars = function() {
//           scope.stars = [];
//           for ( var i = 0; i < scope.max; i++) {
//             scope.stars.push({
//               filled : i < scope.ratingValue
//             });
//           }
//         };

//         scope.toggle = function(index) {
//           scope.ratingValue = index + 1;
//           scope.onRatingSelected({
//             rating : index + 1
//           });
//         };

//         scope.$watch('ratingValue',
//           function(oldVal, newVal) {
//             if (newVal) {
//               updateStars();
//             }
//           }
//         );
//       }
//     };
//   }
// );
