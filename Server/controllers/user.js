const ErrorHandler  = require('../utils/errorhander')
const catchAsynError = require('../middleware/catchAsyncError');
const user = require('../models/userModel');
const sendToken = require('../utils/jwttoken');

exports.registerUser = catchAsynError(async (req , res , next) => {
    const {name , email , password} = req.body;

    const user = await User.create({name , email , password , 
        avatar : {public_id : "This is my public id" , url : "This is url of avatar"}
    })

    sendToken(user , 201, res);
});

exports.loginUser = catchAsynError(async (req , res , next) => {
    const {email , password} = req.body;

    if(!email || !password){
        return next(new ErrorHandler("Please Enter password or Email"))
    }

    const user =await User.findOne({email}).select("+password");

    if(!user){
        return next(new ErrorHandler("Invalid email or password" , 401));
    }

    const isPassswordMatch = user.comparePassword(password)

    if(!isPassswordMatch){
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    sendToken(user , 200 , res);
})
