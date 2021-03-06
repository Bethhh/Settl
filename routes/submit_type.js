var models = require('../config/models');
var result = require("../config/result.json");
var profile = new models.Profile();
profile.TypesDone = false;
profile.DatesDone = false;
profile.RentDone = false;
profile.PropertyDone = false;
profile.OtherDone = false;
profile.AddressDone = false;



exports.submitForm = function(req, res) {  
	// Your code goes here
	console.log("yay");
	
	console.log("here"+ result[req.params.name]);
	//JSON.parse(result);
	//console.log(result);
	res.json(result[req.params.name]);
}

/*.submitWholeForm = function(req, res) {  
	// Your code goes here
	//console.log(result['Types']);
	console.log(result[req.params.name]);
	//JSON.parse(result);
	//console.log(result);
	res.json(result[req.params.name]);
}*/
exports.init = function(req, res){
  console.log("in init");
  if(profile.User == undefined){
    profile.User = req.session._id;
    console.log("userId="+profile.User);
  }
  //var form_data = req.body;
  console.log(req.params.name);
  var str = req.params.name;
  var i = str.lastIndexOf("Rent");
  var pname = str.substr(0,i);
  pname.trim();
  var type = str.substr(i);

  /*if(form_data["label"]=="Profile Type"){
    profile.RentType = form_data["value"];
    console.log(profile.RentType);
  }*/
  profile.RentType = type;
  profile.ProfileName = pname;
  console.log(type);
  console.log(pname);
  req.session.pname = pname;
  res.send(200);
}

//function to save each entry of a block
exports.save = function(req, res){
  //var json = req.body;
  console.log(req.body);
  console.log("user");
  //console.log(profile.User.type);
  //console.log(profile.User['type']);
  /*if(profile.User == undefined){
  	profile.User = req.session._id;
  	console.log("userId="+profile.User);
  }*/

  var form_data = req.body;
  /*if(form_data["label"]=="Profile Type"){
  	profile.RentType = form_data["value"];
  	console.log(profile.RentType);
  }*/
  var newEntry = new models.Entry({
      "label":form_data["label"],
      "type": form_data["type"],
      "value":form_data["value"],
      "selected":form_data["selected"],
      "order": form_data["order"],
      "group": form_data["group"]
  });
  switch(form_data["group"]){
  	case "Types":
      profile.Types.push(newEntry);
      break;
    case "Property":
      profile.Property.push(newEntry);
      break;
    case "Rent":
      profile.Rent.push(newEntry);
      break;
    case "Other":
      profile.Other.push(newEntry);
      break;
    case "Dates":
      profile.Dates.push(newEntry);
      break;
    case "Address":
      profile.Address.push(newEntry);
      break;
    default:
      console.log("switch err");
      break;
        //console.log(profile.Types[0].label);
  }
  res.send(200);
}
//function to do done (finish one block?)
exports.done = function(req,res){
  console.log("I am here"+ req.params.name);
  switch(req.params.name){
  	case "Types":
      profile.TypesDone = true;
      break;
    case "Property":
      profile.PropertyDone = true;
      break;
    case "Rent":
      profile.RentDone = true;
      break;
    case "Other":
      profile.OtherDone = true;
      break;
    case "Dates":
      profile.DatesDone = true;
      break;
    case "Address":
      profile.AddressDone = true;
      break;
    default:
      console.log("switch err done");
      break;
    //console.log(profile.Types[0].label);
  }
  res.send(200);
}

//function to submit whole form
exports.submit = function(req,res){

	console.log("insubmit");
	console.log(req.session._id);
	if(profile.TypesDone && profile.DatesDone && profile.OtherDone 
	&& profile.RentDone && profile.PropertyDone && profile.AddressDone){
		profile.ProfileNameLong = profile.ProfileName + "id=" + profile._id;
    console.log(profile.ProfileNameLong);
		profile.save(afterSaving);//find match before or after
		function afterSaving(err){
        if(err){console.log(err); res.send(500);}
        models.User
			    .find({"_id": req.session._id})
	    	  .sort()
	    	  .exec(saveUserInfo);

	    	function saveUserInfo(err, users){
	    		if(err) console.log(err);
	    		
	    		if(users[0] == undefined){//not found user
	          		res.send("impossible");//impossible
	    		}else{
            console.log("isHERE" + users);
            console.log(profile._id);
	    			users[0].Profiles.push(profile._id);
            users[0].save();
	    			console.log(users[0].Profiles);
	            	//res.send();
	            	
          	console.log("success");
      			console.log(profile._id);
            console.log("isHERE" + users);

            profile = new models.Profile();

            profile.TypesDone = false;
            profile.DatesDone = false;
            profile.RentDone = false;
            profile.PropertyDone = false;
            profile.OtherDone = false;
            profile.AddressDone = false;
      			res.send();
	    	  }
	    	}

		}
	}else{
		res.send("unfinished");
	}
}