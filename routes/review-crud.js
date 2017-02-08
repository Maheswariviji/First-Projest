var express = require('express');
var router = express.Router();
bodyParser = require('body-parser'), //parses information from POST

router.use(bodyParser.urlencoded({ extended: true }))

var mongoose = require('mongoose');

var reviewSchema = mongoose.Schema({
     ID: String,
 MovieTitle:String,
    Name:String,
    Mailid:String,
    Comments:String,
    ratingvalue:String,
    });

var Review = mongoose.model('Review', reviewSchema, 'review');
router.get('/cmt', function (req, res,next) {
    console.log("REACHED GET FUNCTION ON SERVER");
Review.find({}, function (err, docs) {
         res.json(docs);
         console.log(docs);

    });
});
router.get('/cmt/:id', function (req, res) {
    console.log("REACHED GET ID FUNCTION ON SERVER");
     Review.find({_id: req.params.id}, function (err, docs) {
         res.json(docs);

    });
});
router.post('/cmt', function(req, res){
  console.log(req.body);
    var id=req.body.ID;
    var movieid = req.body.MovieTitle;
    var name=req.body.Name;
    var mailid = req.body.Mailid;
    var cmts = req.body.Comments;
    var value=req.body.ratingvalue;
   var moviereview = new Review({
    ID:id,
    MovieTitle:movieid,
    Name:name,
    Mailid:mailid,
    Comments:cmts,
    ratingvalue:value,
  });

  moviereview.save(function(err, docs){
    if ( err ) throw err;
    console.log("review Saved Successfully");
    res.json(docs);
  });

  })

router.delete('/cmt/:id', function(req, res){
   console.log("REACHED Delete FUNCTION ON SERVER");
      Review.remove({_id:req.params.id}, function(err, docs){
        res.json(docs);
    });
})

router.put('/cmt/:id', function(req, res){
    console.log("REACHED PUT");
    console.log(req.body);
    Review.findOneAndUpdate({_id:req.params.id}, req.body, function (err, data) {
      res.json(data);
    });
})

router.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
module.exports = router;
