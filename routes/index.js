// Get all of our friend data
var data = require('../config/data.json');

exports.view = function(req, res){
	console.log(data);
	res.render('index', data);
};