'use strict';

var app = require('angular').module('movieApp');

app.controller('BookingController', require('./bookingController'));
app.controller('CancellationController', require('./cancellationController'));
app.controller('ReviewController', require('./reviewController'));
app.controller('HomeController', require('./homeController'));
app.controller('AdminController', require('./adminController'));
app.controller('LoginController', require('./loginController'));
app.controller('LogoutController', require('./logoutController'));
app.controller('RegisterController', require('./registerController'));
app.controller('ConfirmController',require('./confirmController'));
app.controller('PayController',require('./payController'));
