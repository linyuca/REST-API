var express = require('express');
var mongoose = require('mongoose');
app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());

var Contactlist = require('./clistmong');

mongoose.connect('mongodb://localhost/contactlist', function(err, doc) {
	if(err) throw (err);
	console.log("Connect success !!!");
});

app.get('/clist', function(req, res) {
	Contactlist.find( function(err, doc) {
		if(err) console.log(err);
		res.json(doc);
	});
});

//curl -X POST -H "Content-Type: application/json" -d '{"name": "Jason", "email":"jason@mail.coml.com", "number":"123-123-1234"}' localhost:3000/clist
app.post('/clist', function(req, res) {
	var newlist = req.body;
	Contactlist.create(newlist, function(err, doc) {
		if(err) console.log(err);
		res.json(doc);
	});
});

//curl -X PUT -H "Content-Type: application/json" -d '{"name": "Mary", "email":"marry@mail.coml.com", "number":"333-123-1234"}' localhost:3000/clist/5859e0e406c9110b5fe4c961
app.put('/clist/:_id', function(req, res) {
	var id = {_id: req.params._id};
	var newlist = req.body;
	Contactlist.findOneAndUpdate(id, newlist, {}, function(err, doc) {
		if(err) console.log(err);
		res.json(doc);
	});
});

//curl -X DELETE localhost:3000/clist/585de2d09aee080bc0cfcca5
app.delete('/clist/:_id', function(req, res) {
	var id = {_id: req.params._id};
	Contactlist.remove(id, function(err, doc) {
		if(err) console.log(err);
		res.json(doc);
	});
});

app.listen('3000');
console.log("running on port 3000");
