const mongoose = require("mongoose");

const CONNECTION_URI = process.env.CONNECTION_URI; // Corrected property name

mongoose.connect("mongodb+srv://Aryan:OLfa6oyWhXuvL2q2@cluster0.ivdthwu.mongodb.net/", {})
    .then(() => console.log(`Database connected successfully`))
    .catch((error) => console.log(error.message));
