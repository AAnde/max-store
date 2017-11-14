var userRepository = require(__base + '/server/repositories/user.repository');
var utility = require(__base + "/server/utils/utility");
var messages = require(__base + "/server/config/messages");

module.exports = {
    createUser: function (req, res) {
        try {
            var queryData = {
                email: (req.body.email != undefined) ? req.body.email.toLowerCase() : undefined
            }
            userRepository.getUser(queryData).then(function (success) {
                if (success == null || success == "") {
                    userRepository.createUser(req.body).then(function (successResponse) {
                        if (successResponse != null) {
                            utility.buildResponse(messages.CODE_STATUS_OK, true, messages.MSG_STATUS_SAVED, successResponse, res);
                        }
                    }).catch(function (error) {
                        utility.buildResponse(messages.CODE_BAD_REQUEST, false, error.message, null, res);
                    })
                }
                else {
                    utility.buildResponse(messages.CODE_STATUS_OK, false, messages.MSG_EMAIL_EXISTS, null, res);
                }
            })
        } catch (error) {
            utility.buildResponse(messages.CODE_STATUS_SERVERERROR, false, messages.MSG_STATUS_SERVERERROR, null, res);
        }
    },

    updateUser: function (req, res) {
        try {
            var queryData = {
                _id: req.body.id
            };
            delete req.body["id"];
            req.body.email = (req.body.email != undefined) ? req.body.email.toLowerCase() : undefined
            var updateData = req.body;
            userRepository.updateUser(queryData, updateData).then(function (successResponse) {
                if (successResponse) {
                    utility.buildResponse(messages.CODE_STATUS_OK, true, messages.MSG_DATA_UPDATED, successResponse, res);
                }
                else {
                    utility.buildResponse(messages.CODE_STATUS_OK, false, messages.MSG_OPERATION_FAILED, successResponse, res);
                }
            }).catch(function (error) {
                utility.buildResponse(messages.CODE_BAD_REQUEST, false, error.message, null, res);
            })
        } catch (error) {
            utility.buildResponse(messages.CODE_STATUS_SERVERERROR, false, messages.MSG_STATUS_SERVERERROR, null, res);
        }
    },

    login: function (req, res) {
        try {
            var queryData = {
                email: (req.body.email != undefined) ? req.body.email.toLowerCase() : undefined,
                password: req.body.password
            }
            userRepository.getUser(queryData).then(function (successResponse) {
                if (successResponse) {
                    utility.buildResponse(messages.CODE_STATUS_OK, true, messages.MSG_DATA_FOUND, successResponse, res);
                } else {
                    utility.buildResponse(messages.CODE_STATUS_OK, false, messages.MSG_INVALID_CREDENTIALS, successResponse, res);
                }
            }).catch(function (error) {
                utility.buildResponse(messages.CODE_BAD_REQUEST, false, error.message, null, res);
            })
        } catch (err) {
            utility.buildResponse(messages.CODE_STATUS_SERVERERROR, false, messages.MSG_STATUS_SERVERERROR, null, res);
        }
    },

    resetPassword :  function(req,res){
        try {
            var queryData = {
                _id: req.body.id
            };
            if(req.body.password == undefined || req.body.password == "" || req.body.password == null){
                utility.buildResponse(messages.CODE_BAD_REQUEST, false, messages.MSG_PASSWORD_EMPTY, null, res);
                return;
            }
            delete req.body["id"];
            var updateData = {
                password : req.body.password
            };
            userRepository.updateUser(queryData, updateData).then(function (successResponse) {
                if (successResponse) {
                    utility.buildResponse(messages.CODE_STATUS_OK, true, messages.MSG_DATA_UPDATED, successResponse, res);
                }
                else {
                    utility.buildResponse(messages.CODE_STATUS_OK, false, messages.MSG_OPERATION_FAILED, successResponse, res);
                }
            }).catch(function (error) {
                utility.buildResponse(messages.CODE_BAD_REQUEST, false, error.message, null, res);
            })
        } catch (error) {
            utility.buildResponse(messages.CODE_STATUS_SERVERERROR, false, messages.MSG_STATUS_SERVERERROR, null, res);
        }
    }
}