var form = require("../config/forms.json");

exports.viewForm = function(req, res) {  
	// Your code goes here

	
	//res.render('types', form);
	res.render('newProfle',form);
}