var resObject = {}
module.exports = {
    buildResponse : function(status,isSuccess,message,data,res){
        resObject.success = isSuccess;
        resObject.message = message;
        resObject.data = data;
        res.status(status).json(resObject);
    }
}