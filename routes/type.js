var form = require("../config/form.json");

exports.addFriend = function(req, res) {  
	// Your code goes here

	//console.log(form["Types"]);	
	
	res.json(form["Types"]);
}