const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "Please Enter Your Name"],
        maxLength: [30, "Plase write you Name in 30 characters"],
        maxLength: [4, "Plase write you Name more than 5 characters"]
    },
    email: {
        type: String,
        require: [true, "Please Enter Your Email"],
        unique: true,
        validators: [validator.isEmail, "Please Enter a valid Email"]
    },
    password: {
        type: String,
        require: [true, "Please Enter Your Password"],
        maxLength: [8, "Plase write Password more than 9 characters"],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
            require: true
        },
        url: {
            type: String,
            require: true
        }
    },
    role :{
        type : String, 
        default : "user"
    },
    resetpasswordToken : {
        type : String
    },
    resetpasswordExpire : {
        type : Date
    }

});


userSchema.pre("save" , async function(next){

    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password , 10)
});

userSchema.methods.getJWTToken = function(){
    return jwt.sign({id : this._id} , process.env.JWT_SECRET , {
        expiresIn : process.env.JWT_EXPIRE,
    });
};

userSchema.methods.comparePassword = async function(enterpassord){
    return await bcrypt.compare(enterpassord , this.password)
};

userSchema.methods.getResetPasswordToken = function(){
    const resetToken = crypto.randomBytes(20).toString("hex");

    this.resetpasswordToken = crypto.createHash("sha256")
    .update(resetToken).digest("hex")
    
    this.resetpasswordExpire = Date.now() + 15*60*1000;

    return resetToken;
}

module.exports = mongoose.model("User" , userSchema);