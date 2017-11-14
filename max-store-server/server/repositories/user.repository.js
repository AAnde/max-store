var userModel = require(__base+"/server/models/user.model");

module.exports = {
    createUser : function(userData){
        var user_model = new userModel(userData);
        return user_model.save();
    },

    updateUser : function(queryData,updateData){
        return userModel.findOneAndUpdate(queryData,updateData).exec();
    },

    getUser : function(queryData){
       return userModel.findOne(queryData).exec();
    }

}