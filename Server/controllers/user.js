const ErrorHandler  = require('../utils/errorhander')
const catchAsynError = require('../middleware/catchAsyncError');
const User = require('../models/userModel');
const sendToken = require('../utils/jwttoken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');

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

    const isPassswordMatch = User.comparePassword(password)

    if(!isPassswordMatch){
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    sendToken(user , 200 , res);
});

exports.logout = catchAsynError( async (req, res , next) => {

    res.cookie("token" , null,{
        expires: new Date(Date.now()),
        httpOnly : true,
    })
    res.status(200).json({
        success : true,
        message : "Logged Out Successfully"
    })
});


exports.forgotPassword = catchAsynError(async (req , res , next) =>{
    const user = await User.findOne({email : req.body.email});

    if(!user){
        return next(new ErrorHandler("User not found" , 404));
    }

    const ressetToken = user.getRestPasswordToken();

    await user.save({validateBeforeSave : false});


    const restPasswordUrl = `${req.protocol}://${req.get("host")}/api.v1/password/reset/${resetToken}`

    const message = `Your password reset token is :- \n\n ${restPasswordUrl} \n\nIF you have not requested this email
    then, Please ignore it`;

    try {
        await sendEmail({
            email:user.email,
            subject :"E-Commerce_website Passwrd",
            message,
        });

        res.status(200).json({success:true , message:`Email sent to ${user.email} successfully`});
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({validateBeforeSave : false});

        return next(new ErrorHandler(error.message , 500));
    }
});


exports.resetPassword = catchAsynError(async (req , res , next) =>{
    const resetpasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex")

    const user = await User.findOne({
        resetpasswordToken,
        resetPasswordExpire : { $gt: Date.now()}
    });

    if(!user){
        return next(new ErrorHandler("Reset Password Token is invalid or has been expired" , 400));
    }

    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler("password and confirmPassword is not match " , 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user , 200 , res);
});