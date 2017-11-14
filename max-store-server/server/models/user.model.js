var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name : {type:String,required:true},
    email : {type:String,lowercase:true,required:true},
    password : {type:String,required:true},
    contact : {type:String,required:true},
    address : {type:String,default:""},
    city : {type:String,default:""}
})

var userModel = mongoose.model("users",userSchema);

module.exports = userModel;
