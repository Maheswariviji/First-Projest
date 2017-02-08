var express = require('express');
var router = express.Router();
bodyParser = require('body-parser'), //parses information from POST

router.use(bodyParser.urlencoded({ extended: true }))

var mongoose = require('mongoose');


var timeSchema = mongoose.Schema({
     ID: String,
    Timings:String,
    });

var Time = mongoose.model('Time', timeSchema, 'time');



router.get('/showtiming', function (req, res,next) {
    console.log("REACHED GET FUNCTION ON SERVER");

    Time.find({}, function (err, docs) {
         res.json(docs);
         console.log(docs);

    });
});

router.get('/showtiming/:id', function (req, res) {
    console.log("REACHED GET ID FUNCTION ON SERVER");
     Time.find({_id: req.params.id}, function (err, docs) {
         res.json(docs);

    });
});

router.post('/showtiming', function(req, res){
  console.log(req.body);
    var id=req.body.ID;
    var time = req.body.Timings;

   var showTime=new Time({
    ID:id,
    Timings:time,
  });

  showTime.save(function(err, docs){
    if ( err ) throw err;
    console.log("Book Saved Successfully");
    res.json(docs);
  });

  })

router.delete('/showtiming/:id', function(req, res){
   console.log("REACHED Delete FUNCTION ON SERVER");
      Time.remove({_id:req.params.id}, function(err, docs){
        res.json(docs);
    });
})

router.put('/showtiming/:id', function(req, res){
    console.log("REACHED PUT");
    console.log(req.body);
  Time.findOneAndUpdate({_id:req.params.id}, req.body, function (err, data) {
      res.json(data);
    });
})

router.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


module.exports = router;
