const dotenv = require('dotenv');
dotenv.config({path : 'server/config/config.env'})

const app = require('./app')

process.on("unhandledRejection" , err => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);

    process.exit(1);
});



const PORT = process.env.PORT;

const server = app.listen(PORT , () => {
    console.log(`Server is working on Port Number - ${PORT}`);
})


process.on("unhandledRejection" , err => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);

    server.close(()=>{
        process.exit(1);
    });
});