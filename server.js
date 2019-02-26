var express =require('express')
var bodyparser=require("body-parser")
var app=express();
var path=require('path')
app.use(bodyparser.urlencoded({extended:true}))
//mongo db connection
app.set("views",path.resolve(__dirname,"Views"));
const MongoClient = require("mongodb").MongoClient;
var db;
MongoClient.connect('mongodb://mirza:123456@ds117495.mlab.com:17495/crud',(err,database)=>{
if(err) return console.log(err)
db=database
app.listen(3000,() =>{
    console.log("listning on port 3000")
})
})
app.get('/',function(req,res){
    // res.sendFile(__dirname+'/index.html')
    var cursor=db.collection('quotes').find().toArray((err,result)=>{
      console.log(err);
      res.render("index.ejs",{quotes:result})
    })
  })
app.post('/quotes',function(req,res){
    db.collection('quotes').save(req.body,function(err,result){
        if (err) return console.log(err);
        console.log("save data to firebase !")
        res.redirect('/')
    })
})