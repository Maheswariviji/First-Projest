var express = require('express');
var router = express.Router();
bodyParser = require('body-parser'), //parses information from POST

router.use(bodyParser.urlencoded({ extended: true }))


var mongoose = require('mongoose');

var movieinfoSchema=mongoose.Schema({
    ID:String,
    Title:String,
    TName:String,
    City:String,
    showTime:Array,
    fromDate:Date,
ToDate:Date,
reservedSeats:Array,
});

var MovieInfo=mongoose.model('MovieInfo',movieinfoSchema,'movieinfo');

router.get('/movieinfo', function (req, res,next) {
    console.log("REACHED GET FUNCTION ON SERVER");

    MovieInfo.find({}, function (err, docs) {
         res.json(docs);
         console.log(docs);

    });
});

router.get('/movieinfo/:id', function (req, res) {
    console.log("REACHED GET ID FUNCTION ON SERVER");
     MovieInfo.find({_id: req.params.id}, function (err, docs) {
         res.json(docs);

    });
});

router.post('/movieinfo', function(req, res){
  console.log(req.body);
    var id=req.body.ID;
    var title = req.body.Title;
var theatername=req.body.TName;
var loc = req.body.City;
    var sht=req.body.showTime;
    var fdate=req.body.fromDate;
   var tdate =req.body.ToDate;
var rs=req.body.reservedSeats;
   var movieinfo = new MovieInfo({
    ID:id,
    Title:title,
    TName:theatername,
    City:loc,
    showTime:sht,
  fromDate:fdate,
  ToDate:tdate,
  reservedSeats:rs,
  });

 movieinfo.save(function(err, docs){
    if ( err ) throw err;
    console.log("Book Saved Successfully");
    res.json(docs);
  });
  })
router.delete('/movieinfo/:id', function(req, res){
   console.log("REACHED Delete FUNCTION ON SERVER");
      MovieInfo.remove({_id:req.params.id}, function(err, docs){
        res.json(docs);
    });
})

router.put('/movieinfo/:id', function(req, res){
    console.log("REACHED PUT");
    console.log(req.body);
    MovieInfo.findOneAndUpdate({_id:req.params.id}, req.body, function (err, data) {
      res.json(data);
    });
})

router.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
module.exports = router;
