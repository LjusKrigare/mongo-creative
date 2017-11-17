var express = require('express');
var mongodb = require('mongodb');
var router = express.Router();

var MongoClient = mongodb.MongoClient;

var dbUrl = 'mongodb://localhost:/birthdayList';

var collection

MongoClient.connect(dbUrl, function (err, db) {
  if (err) {
    console.log('Unable to connect to mongoDB server', err);
  } else 
{
    console.log('Connection established to', dbUrl);
     collection = db.collection('birthday');
	
  }
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/birthday', function(req, res) {
  console.log("In Birthday");
  collection.find().toArray(function(err, result) {
    if(err) {
      console.log(err);
   }else if (result.length)
   {
      console.log("Query Worked");
      console.log(result);
      res.send(result);
    } else {
      console.log("Nothing Found");
    }
});
});

router.post('/birthday', function(req, res) {
   console.log("In Birthday Post");
    console.log(req.body);
    collection.insert(req.body, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log('Inserted documents into the "birthday" collection. The documents inserted with "_id" are:', result);
        res.end('{"success" : "Updated Successfully", "status" : 200}');
      }
    });
});

router.delete('/birthday', function(req,res,next)
{
        console.log("In Delete");
       collection .remove({}, function(err)
        {
         if (err) return console.error(err)
        res.sendStatus(200);

        });
});


module.exports = router;


