var mysql = require('mysql');

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '<you sql password>',
	database: 'clist'
});

module.exports = connection;
