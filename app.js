const express = require("express");
const app = express('');
const postRoute = require('./routes/post');
const userRoute = require('./routes/user');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use('/',postRoute);
app.use('/post',postRoute);
app.use('/update',postRoute);
app.use('/delete',postRoute);
app.use('/user',userRoute);

// app.use('/test',postRoute);

// app.use('/',(req,res)=>{
//         res.send("running");
// })

module.exports = app;

