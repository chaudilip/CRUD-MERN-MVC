require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const session = require("express-session");
const PORT = process.env.PORT || 1234;
const mongoose  = require("mongoose");
const cors = require("cors");

mongoose.set("strictQuery",true);
mongoose.connect(process.env.DB_URI,{useNewUrlParser:true});
const db = mongoose.connection
db.on("error", (error) => {console.log(error)});
db.on("open",()=>{console.log("connected to MongoDb")});


//middleware 
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 
  };
  app.use(cors(corsOptions));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(session({
    secret:"mysecret",
    saveUninitialized:true,
    resave:false
}));

app.use((req,res,next)=>{
    res.locals.mongoose=req.session.message;
    delete req.session.message;
    next();
});

app.set("view engine","ejs");
app.use("",require("./routes/route"));

app.listen(PORT,()=>{
    console.log(`listening on ${PORT}`);
});

