const express=require('express')
const morgan = require('morgan');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');

// var mongoClient=require('mongodb').MongoClient;
// var URL="mongodb+srv://iqbaldemo:TvNG1mXLv04HfoNn@cluster0.3gnad.mongodb.net/demu?retryWrites=true&w=majority";

const app = express()
app.set('view engine', 'ejs')
app.use(bodyParser.json())
const router=require('./routes');

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())
app.use('/contacts', router);

app.get('/', (req, res)=>{

    res.send('I am running!!');

})

const PORT=process.env.PORT || 8080
var config={ useUnifiedTopology: true }
mongoose.connect('mongodb+srv://iqbaldemo:TvNG1mXLv04HfoNn@cluster0.3gnad.mongodb.net/demo?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
 .then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Server Run On PORT ${PORT}`)
    })
 })
















// var config={ useUnifiedTopology: true }

// mongoClient.connect(URL, config,  function(error, MyMongoClient){
//   if(error){
//     console.log("Connection Failed!!");
//   }else{
//     console.log("Connected Successfully!!");
//     // insertData(MyMongoClient);
//   }
// });

// function insertData(MyMongoClient){

//   var MyDatabase=MyMongoClient.db("demo");
//   var myCollection=MyDatabase.collection("list");
//   var mydata={ name: "Md. Iqbal Hossain", Roll: "171-15-8657", class: "Eight" };
//   myCollection.insertOne(mydata, function(error){
//      if(error){
//        console.log("Insertion Failed!!");
//      }else{
//        console.log("Inserted Successfully!!");
//      }
//   });
// }