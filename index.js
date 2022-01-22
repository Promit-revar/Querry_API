const express=require('express');

const app=express();

const webRoutes = require('./Routes/web');
const connection=require('./config/database');
connection.connect();
const port=process.env.PORT || 8000;
app.set('view engine', 'ejs');
app.use(express.json());
app.use(webRoutes);

app.listen(port,e=>console.log(`Server Running On port ${port}`));