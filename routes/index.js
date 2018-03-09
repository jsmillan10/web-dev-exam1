var express = require("express");
var router = express.Router();
var MongoClient = require("mongodb").MongoClient
	, assert = require("assert");

// Connection URL
var url = "mongodb://practica:practica@ds261678.mlab.com:61678/practica";

router.post("/fightResults", function(req, res){
	MongoClient.connect(url, function(err, db) {
		assert.equal(null, err);
		console.log("Connected successfully to server");
		var collection = db.collection("history");
		collection.insert({
			fighter1: req.body.fighter1,
			fighter2: req.body.fighter2,
			winner: req.body.winner
		}, (err, result) => {
			assert.equal(null, err);
			res.status("200");
		});
		db.close();
	  });	  
});

router.post("/max", function(req, res){
	MongoClient.connect(url, function(err, db) {
		assert.equal(null, err);
		console.log("Connected successfully to server");
		var collection = db.collection("max");
		collection.insert({
			user: req.body.user,
			likes: req.body.likes,
			picture: req.body.picture
		}, (err, result) => {
			assert.equal(null, err);
			res.status("200");
		});
		db.close();
	  });	  
});

router.get("/max", function(req, res){
	MongoClient.connect(url, function(err, db) {
		assert.equal(null, err);
		console.log("Connected successfully to server");
		var collection = db.collection("max");
		collection.find().sort({age:-1}).limit(1).toArray(function(err, docs){
			assert.equal(err, null);
			res.json(docs);
		});
	});
});

router.get("/stats", function(req, res){
	MongoClient.connect(url, function(err, db) {
		assert.equal(null, err);
		console.log("Connected successfully to server");
		var collection = db.collection("history");
		collection.find({}).toArray(function(err, docs){
			assert.equal(err, null);
			res.json(docs);
		});
	});
});
module.exports = router;
