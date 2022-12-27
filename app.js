const express=require('express');
const fs=require('fs');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const { stringify } = require('querystring');
const PORT=8080;
const path=require('path');

const app=express();
//COnnecting to the Mongodb with Mongoose
mongoose.connect('mongodb://localhost/NewDB', {useNewUrlParser:true});

//Setting up the schema
const ContactSchema= new mongoose.Schema({
name:String,
age:Number,
gender:String,
address: String 
})

//Creating Model of Schema

const Contact=mongoose.model('Contact',ContactSchema);

//Setting Up the Middeware
app.use(express.urlencoded())
//Setting up The View Engine
app.set('view engine','pug')
app.set('views', path.join(__dirname,'views'))

//Setting up the Static File
app.use('/static', express.static('static'))

//Endpoints
app.get('/demo',(req,res)=>{
res.render('demo.pug',{title:'Pug File',message:"Hey This is From PUG File"}); 
})

app.get('/home',(req,res)=>{
    res.send('This is my First Express App following Code With Harry');
})

app.get('/',(req,res)=>{
    const params={'title':'Form of Details','content':'Fill the Form','message':'Here is the message inside paragraph tag'}
    res.render('index',params);
})

app.post('/',(req,res)=>{
    //Lower code was used for writing data in a txt File

    const params={'message':'Your Form has been submitted successfully'}
    var myData=new Contact(req.body);
    myData.save().then(()=>{
        res.send('Data Stored in Database');
    }).catch(()=>{
        res.send("Data Could Not be Saved... Please Retry");
    })
    // res.render('index',params);
})

app.get('/about',(req,res)=>{
    res.send("We are Team of Developers")
})

app.post('/about',(req,res)=>{ 
    res.send("IN POST REQUEST <br> We are Team of Developers")
})

app.listen(PORT,()=>{
    console.log(`Server is running on Port ${PORT}`); 
})