
var form = require("../config/forms.json");

exports.view = function(req, res){
	res.render('existing', form);
}
