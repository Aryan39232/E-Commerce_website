const Product = require('../models/productmodels');

exports.creatProducts = async (req , res , next) => {
    const product = await Product.create(req.body);
    res.status(201).json("Succesfully created product")
}

exports.getAllProducts = (req , res) =>{
    res.status(200).json({message : "Route is working fine"})
};
