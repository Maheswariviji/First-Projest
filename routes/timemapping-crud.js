var express = require('express');
var router = express.Router();
bodyParser = require('body-parser'), //parses information from POST

router.use(bodyParser.urlencoded({ extended: true }))
var mongoose = require('mongoose');
var MappingSchema=mongoose.Schema({
    ID:String,
    Title:String,
    City:String,
    TName:String,
    SDate:String,
    showTime:String,
reservedSeats:Array,
Email:Array,

});

var Seat=mongoose.model('Seat',MappingSchema,'seatmapping');
router.get('/st', function (req, res,next) {
    console.log("REACHED GET FUNCTION ON SERVER");

    Seat.find({}, function (err, docs) {
         res.json(docs);
         console.log(docs);

    });
});

router.get('/st/:id', function (req, res) {
    console.log("REACHED GET ID FUNCTION ON SERVER");
  Seat.find({_id: req.params.id}, function (err, docs) {
         res.json(docs);

    });
});
router.post('/st', function(req, res){
  console.log(req.body);
    var id=req.body.ID;
    var title = req.body.Title;
var theatername=req.body.TName;
var loc = req.body.City;
    var sht=req.body.showTime;
    var resseats =req.body.reservedSeats;
    var mail=req.body.Email;
    var date=req.body.SDate;
   var info = new Seat({
    ID:id,
    Title:title,
    TName:theatername,
    City:loc,
    showTime:sht,
  reservedSeats:resseats,
Email:mail,
SDate:date,
  });

 info.save(function(err, docs){
    if ( err ) throw err;
    console.log("seat mapped Successfully on server");
    res.json(docs);
    console.log(docs);
  });

  })

router.delete('/st/:id', function(req, res){
   console.log("REACHED Delete FUNCTION ON SERVER");
      Seat.remove({_id:req.params.id}, function(err, docs){
        res.json(docs);
    });
})

router.put('/st/:id', function(req, res){
    console.log("REACHED PUT");
    console.log(req.body);
    Seat.findOneAndUpdate({_id:req.params.id}, req.body, function (err, data) {
      res.json(data);
    });
})

router.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
module.exports = router;
