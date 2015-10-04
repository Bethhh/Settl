var form = require("../config/forms.json");
//var models = require('../models');

exports.view = function(req, res){
	console.log(form);
	res.render('newp',form);
};