const mongoose = require("mongoose");

const CONNECTION_URI = process.env.CONNECTION_URI

mongoose.connect(CONNECTION_URI, {})
    .then(() => console.log(`Database connected successfully`))
    .catch((error) => console.log(error.message));
