var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());

var Connection = require('./clistsql');

Connection.connect();

app.get('/clist', function(req, res) {
	Connection.query('select * from mylists', function(err, doc) {
		if(err)
			console.log(err);
		res.json(doc);
	});
});

 
// curl -X POST -H "Content-Type: application/json" -d '{"name": "Jason", "email": "jason@mail.comom", "number":"(333333"}' localhost:3000/clis 
app.post('/clist', function(req, res) {
	var list = req.body;
	var sql = "insert into mylists set ?";
	Connection.query(sql, list, function(err, doc) {
		if(err)
			console.log(err);
		console.log("add success: " + doc.insertId);
		res.json(doc);
	});
});

//curl -X DELETE localhost:3000/clist/Mary
app.delete('/clist/:name', function(req,res) {
	var name = req.params.name;
	var sql = "delete from mylists where name = ?";
	Connection.query(sql, name, function(err, doc) {
		if(err)
			console.log(err);
		res.json(doc);
	});
});

// curl -X PUT -d '{"email":"john@mail.com","number":"333.3333"}' -H "Content-Type: application/json" localhost:3000/clist/John 
app.put('/clist/:name', function(req, res) {
	var name = req.params.name;
	var sql = "update mylists set email=?, number=? where name=?";
	Connection.query(sql, [req.body.email, req.body.number, name], function(err, doc) { 
		if(err)
			console.log(err);
		res.json(doc);
	});
});


app.listen(3000);
console.log("running on port 3000");
