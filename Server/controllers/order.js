const Order = require("../models/orderModel");
const Product = require('../models/productmodels');
const ErrorHandler  = require('../utils/errorhander')
const catchAsynError = require('../middleware/catchAsyncError');

exports.newOrder = catchAsynError( async (req , res , next) => {
    const {shippingInfo , orderItems , paymentInfo , itemsPrice , taxPrice , shippingPrice , totalPrice} = req.body;

    const order = await Order.create({
        shippingInfo , orderItems , paymentInfo , itemsPrice , taxPrice , shippingPrice , totalPrice , paidAt : Date.now() , user : req.user._id,
    });

    res.status(201).json({success : true , order,})
});

exports.getSingleOrder = catchAsynError( async (req, res , next) => {
    const order = await Order.findById(req.param.id).populate("user" , "name email" );

    if(!order){
        return next(new ErrorHandler("order not found with this Id" , 404));
    }

    res.status(200).json({
        success : true,
        order,
    })
});

exports.myOrder = catchAsynError( async (req, res , next) => {
    const orders = await Order.find({user :req.user._id })


    res.status(200).json({
        success : true,
        orders,
    });
});


exports.getAllOrder = catchAsynError( async (req, res , next) => {
    const orders = await Order.find();

    let totalAmout = 0;

    orders.forEach(order => {
        totalAmout += order.totalPrice;
    });

    res.status(200).json({
        success : true,
        totalAmout,
        orders,
    });
});

exports.updateOrder = catchAsynError( async (req, res , next) => {
    const order = await Order.findById(req.param.id);

    if(!order){
        return next(new ErrorHandler("order not found with this Id" , 404));
    }
    
    if(order.orderStatus === "Delivered"){
        return next(new ErrorHandler("You have already deliverd this Order" , 400))
    }

    order.orderItems.forEach(async (o) =>{
        await updateStock(o.Product , o.quantity);
    });


    order.orderStatus = req.body.status;

    if(req.body.status === "Deliverd"){
        order.deliveredAt = Data.now()
    }

    await order.sace({validateBeforeSave : false});

    res.status(200).json({
        success : true
    });
});


async function updateStock(id , quantity){
    const product = await Product.findById(id);

    product.Stock -= quantity;

    await product.save({validateBeforeSave : false});
};


exports.deleteOrder = catchAsynError( async (req, res , next) => {
    const order = await Order.findById(req.param.id);

    if(!order){
        return next(new ErrorHandler("order not found with this Id" , 404));
    }
    await order.remove();


    res.status(200).json({
        success : true,
        totalAmout,
        orders,
    });
});