const mongoose = require('mongoose');
const dotEnv = require('dotenv')
dotEnv.config()

const connectDB = async () =>{
    try {
        const dataConnect = await mongoose.connect(process.env.MONGOOSE_URL);
        console.log('DB connect sucess '+ dataConnect.connection.host);
    } catch (error) {
        console.log(error);
    }
}


module.exports = connectDB;