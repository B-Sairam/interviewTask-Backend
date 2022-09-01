const mongoose = require('mongoose');

const dbConnection = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });
        
            console.log("DB is connected");
    } catch (error) {
        console.log(error);
        process.exit();
    }
}

module.exports = dbConnection;
