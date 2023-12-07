const mongoose = require("mongoose");

const CONNECTION_URL = process.env.CONNECTION_URL;

mongoose.connect("mongodb+srv://Aryan:OLfa6oyWhXuvL2q2@cluster0.ivdthwu.mongodb.net/", { useNewUrlParser: true, useUnifiedTopology: true  })
        .then(() => console.log(`Database connected successfully`))
        .catch((error) => console.log(error.message));