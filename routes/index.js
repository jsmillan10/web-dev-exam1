var express = require("express");
var router = express.Router();
var MongoClient = require("mongodb").MongoClient
	, assert = require("assert");

// Connection URL
var url = "mongodb://practica:practica@ds261678.mlab.com:61678/practica";
var baseUrl = "https://www.instagram.com/";
var endOfUrl= "/?__a=1";


router.get("/:user", function(req, res){
	fetch(baseUrl + req.params.user + endOfUrl)
		.then((error, response, body) => {
			if(!error && response.statusCode == "200"){
				console.log(body);
			}
		});
});


var findDocuments = function(db, query, callback) {
	// Get the documents collection
	var collection = db.collection("users");
	// Find some documents
	collection.find(query).toArray(function(err, docs) {
		assert.equal(err, null);
		console.log("Found the following records");
		console.log(docs);
		callback(docs);
	});
};
// Use connect method to connect to the server




module.exports = router;
