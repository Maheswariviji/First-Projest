
var logger = require('morgan');
var express = require('express');
var app = express();
var bodyParser=require('body-parser');
var path = require('path');
var cookieParser = require('cookie-parser');//auth
var expressValidator = require('express-validator');//auth
var flash = require('connect-flash');//auth
var session = require('express-session');//auth
var passport = require('passport');//auth
var localStrategy = require('passport-local').Strategy;

// user schema/model
var User = require('./models/user.js');

//Database
var mongo = require('mongodb');
var mongoose = require('mongoose');

var dbHost = 'mongodb://localhost:27017/test';
mongoose.connect(dbHost);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
  console.log("Connected to DB");
});

var auth =  require('./routes/auth');
var movieCrud = require('./routes/movie-crud');
var cityCrud = require('./routes/city-crud');
var movieInfo=require('./routes/movieInfo');
var trailerCrud=require('./routes/trailer-crud');
var threaterCrud=require('./routes/threater-crud');
var timing=require('./routes/showtime');
var booking=require('./routes/booking-crud');
var reviews=require('./routes/review-crud');
var confirmCrud=require('./routes/confim-crud');
var seatmappingCrud=require('./routes/timemapping-crud');


// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

// configure passport
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use('/movie', movieCrud);
app.use('/city', cityCrud);
//app.use('/theatre', theatreCrud);
app.use('/user/', auth);
app.use('/trailerserver',trailerCrud);
app.use('/threater',threaterCrud);
app.use('/showtiming',timing);
app.use('/movieinfo',movieInfo);
app.use('/bk',booking);
app.use('/cmt',reviews);
app.use('/pay',confirmCrud);
app.use('/st',seatmappingCrud);



app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../client', 'index.html'));
});

// Only load this middleware in dev mode (important).
if (app.get('env') === 'development') {
  var webpackMiddleware = require("webpack-dev-middleware");
  var webpack = require('webpack');

  var config = require('./webpack.config');

  app.use(webpackMiddleware(webpack(config), {
    publicPath: "/build",

    headers: { "X-Custom-Webpack-Header": "yes" },

    stats: {
      colors: true
    }
  }));

}

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res) {
  res.status(err.status || 500);
  res.end(JSON.stringify({
    message: err.message,
    error: {}
  }));
});

var server = app.listen(8000, function () {
  console.log('listening on port 8000');
});
