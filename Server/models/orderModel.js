const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    shippingInfo: {
        address: {
            type: String,
            require: true
        },
        city: {
            type: String,
            require: true
        },
        state: {
            type: String,
            require: true
        },
        country: {
            type: String,
            require: true
        },
        pinCode: {
            type: Number,
            require: true
        },
        PhoneNo: {
            type: Number,
            require: true
        },
    },
    orderItems: [
        {
            name : {
                type : String,
                require: true,
            },
            price : {
                type : String,
                require : true,
            },
            quantity : {
                type : String,
                require : true,
            },
            image : {
                type : String,
                require : true, 
            },
            product : {
                type : mongoose.Schema.ObjectId,
                ref : "Product",
                require : true,
            },
        },
    ],
    user :{
        type : mongoose.Schema.ObjectId,
        ref : "User",
        require : true
    },
    paymentInfo : {
        id : {
            type : String,
            require : true,
        },
        status : {
            type : String,
            require : true,
        }
    },
    paidAT : {
        type :Date ,
        require : true,
    },
    itemsPrice : {
        type : Number, 
        default : 0,
        require : true,
    },
    taxPrice : {
        type : Number, 
        require : true,
        default : 0
    },
    shippingPrice : {
        type : Number, 
        require : true,
        default : 0
    },
    totalPrice : {
        type : Number, 
        require : true,
        default : 0
    },
    orderStatus : {
        type : String, 
        require : true,
        default : "Processing"
    },
    deliveredAt:{
        type : Date,
    },
    createdAt :{
        type : Date,
        default : Date.now
    },
});

module.exports = mongoose.model("Order" , orderSchema);