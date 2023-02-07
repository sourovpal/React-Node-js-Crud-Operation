const mongoose= require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('strictQuery', false);

const connection = mongoose.connection;
 const connectionDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_DB_URL, { 
            useNewUrlParser: true, 
            useUnifiedTopology: true,
         });
        connection.once('open', () => {
            console.log("MongoDB database connection established successfully");
        });
    }catch(e){
        console.error('connection error =>>>>', e);
    }
}

module.exports  = {
    connectionDB,
    connection,
    Schema
}