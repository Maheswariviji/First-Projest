var express = require('express');
var router = express.Router();
bodyParser = require('body-parser'), //parses information from POST

router.use(bodyParser.urlencoded({ extended: true }))

var mongoose = require('mongoose');
var cSchema = mongoose.Schema({
  BookingID:String,
     BDate:Date,
     customerName:String,
    mName:String,
    tName:String,
     seatno:Array,
     Email : String,
         Phone : String,
    tLoc:String,
    sTime:String,
    noofTickets:String,
    amountPaid:String,
    cardNo:String,
    CVV:String,

    });

var Confirm = mongoose.model('Confirm', cSchema, 'confirm');

router.get('/pay', function (req, res,next) {
    console.log("REACHED GET FUNCTION ON SERVER");

    Confirm.find({}, function (err, docs) {
         res.json(docs);
         console.log(docs);

    });
});

router.get('/pay/:id', function (req, res) {
    console.log("REACHED GET ID FUNCTION ON SERVER");
     Confirm.find({_id: req.params.id}, function (err, docs) {
         res.json(docs);

    });
});

router.post('/pay', function(req, res){
    var id=req.body.BookingID;
  console.log(req.body);
   var date=req.body.BDate;
    var name = req.body.mName;
    var tname=req.body.tName;
var id=req.body.BookingID;
    var tloc = req.body.tLoc;
    var time = req.body.sTime;
    var cnt = req.body.noofTickets;
    var amt=req.body.amountPaid;
    var count=req.body.seatno;
    var mailid=req.body.Email;
    var phoneno=req.body.Phone;
    var cname=req.body.customerName;
    var no=req.body.cardNo;
    var cvv=req.body.CVV;
   var conforming = new Confirm({
     BookingID:id,
    BDate:date,
    mName:name,
    tName:tname,
   seatno:count,
    tLoc:tloc,
    sTime:time,
    noofTickets:cnt,
    amountPaid:amt,
    Email:mailid,
    Phone:phoneno,
    customerName:cname,
    cardNo:no,
    CVV:cvv,
  });

  conforming.save(function(err, docs){
    if ( err ) throw err;
    console.log("Book Saved Successfully");
    res.json(docs);
  });

  })

router.delete('/pay/:id', function(req, res){
   console.log("REACHED Delete FUNCTION ON SERVER");
      Confirm.remove({ID:req.params.id}, function(err, docs){
        res.json(docs);
    });
})

router.put('/pay/:id', function(req, res){
    console.log("REACHED PUT");
    console.log(req.body);
  Confirm.findOneAndUpdate({_id:req.params.id}, req.body, function (err, data) {
      res.json(data);
    });
})

router.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
module.exports = router;
