var mongoose = require('mongoose');

var clistSchema = mongoose.Schema(
	{
		name: {type: String, required: true},
		email: { type: String},
		number: { type: String}
	}
);

var Contactlist = mongoose.model('Contactlist', clistSchema);

module.exports = Contactlist;
