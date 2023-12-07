const Product = require('../models/productmodels');
const ErrorHandler  = require('../utils/errorhander')
const catchAsynError = require('../middleware/catchAsyncError');
const ApiFeatures = require('../utils/apifeatures');



exports.creatProducts = catchAsynError(async (req , res , next) => {

    req.body.user = req.user.id
    const product = await Product.create(req.body);
    res.status(201).json("Succesfully created product")
});

exports.getAllProducts = catchAsynError(async (req , res) =>{


    const resultPerPage = 5;
    const productCount = await Product.countDocuments();

    const apifeatures = new ApiFeatures(Product.find() , req.query)
    .search()
    .filter()
    .pagination(resultPerPage);

    const products = await apifeatures.query;
    res.status(200).json({success : true  ,products})
});

exports.updateProducts = catchAsynError( async (req , res , next) =>{
    let product = await Product.findById(req.param.id);

    if(!product){
        console.log("Prodct not found");
        return next(new ErrorHandler("Product Not Found" , 404));
    }

    product = await Product.findByIdAndUpdate(req.param.id , req.body , {new : true , runValidators : true , useFindAndModify : false});
    res.status(200).json({success : true ,products})
});

exports.deleteProducts =catchAsynError( async (req , res , next) =>{
    let product = await Product.findById(req.param.id);

    if(!product){
        console.log("Prodct not found");
        return next(new ErrorHandler("Product Not Found" , 404));
    }

    await product.remove();
    res.status(200).json({success : true ,message : "Product delete succussfully"})
});

exports.getProductsDetails = catchAsynError( async (req , res , next) =>{
    const product = await Product.findById(req.param.id);

    if(!product){
        console.log("Product not found")
        return next(new ErrorHandler("Product Not Found" , 404));
    }

    await product.remove();
    res.status(200).json({success : true ,product , productCount})
});
