const mongoose=require('mongoose');
const env = require('dotenv');
env.config();
const DB_DATABASE = process.env.DB_DATABASE;
//const DB_HOST = process.env.DB_HOST;
const DB_USERNAME = process.env.DB_USERNAME
const DB_PASSWORD = process.env.DB_PASSWORD
const url=`mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@task1.oeby7.mongodb.net/${DB_DATABASE}?retryWrites=true&w=majority`;

//console.log(url);

module.exports={
    connect:function(){
    mongoose.connect(url)
       .then(()=>{console.log('connected...')})
       .catch(err=>console.error("Connection failed...",err));
    
}
}