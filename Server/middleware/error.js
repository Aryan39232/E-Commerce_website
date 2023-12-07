const ErrorHandler = require('../utils/errorhander')

module.exports = (err , req , res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Sever Error';

    //worng MongoDB error

    if(err.name == "CastError"){
        const message = `Resource not fond. Invalid: ${err.path}`;
        err = new ErrorHandler(message , 400);
    }

    if(err.name == 11000){
        const message = `Duplicate ${object.keys(err.keyValus)} Entered`;
        err = new ErrorHandler(message , 400);
    }


    if(err.name == "jsonWebTokenError"){
        const message = `json Web Token is Invalid`;
        err = new ErrorHandler(message , 400);
    }

    if(err.name == "TokenExpiredError"){
        const message = `json Web Token is Expired`;
        err = new ErrorHandler(message , 400);
    }

    res.status(err.statusCode).json({
        success : false,
        message : err.message,
    });
}