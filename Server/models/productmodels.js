const mongoose = require("mongoose")

const productsSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "please Enter Product Name"],
        trim: true
    },
    description: {
        type: String,
        require: [true, "please Enter Product description"]
    },
    price: {
        type: Number,
        require: [true, "Please Enter product price"],
        maxLength: [8, "Price cannot exceed 8 figure"]
    },
    ratings: {
        type: Number,
        default: 0
    },
    images: [{
        public_id: {
            type: String,
            require: true
        },
        url: {
            type: String,
            require: true
        }
    }],
    category : {
        type : String,
        require : [true , "Please Enter Product Category"]
    },
    Stock : {
        type : Number,
        require : [true , "Please Enter Product Stock"],
        maxLength : [4 , "Stock cannot exceed 4 figure"],
        default : 1
    },
    numOfReviews : {
        type : Number,
        default : 0
    },
    reviews : [{
        user :{
            type : mongoose.Schema.ObjectId,
            ref : "User",
            require : true
        },
        name : {
            type: String,
            require: true
        },
        rating :{
            type: Number,
            require: true
        },
        Comment :{
            type: String,
            require: true
        }
    }],

    user :{
        type : mongoose.Schema.ObjectId,
        ref : "User",
        require : true
    },
    createedAt : {
        type : Date,
        default : Date.now
    }
});

module.exports = mongoose.model("Product" , productsSchema);