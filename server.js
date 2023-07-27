const express = require("express");
const mongoose = require("mongoose");
const cors =  require("cors");
require("dotenv").config();


const app = express();
app.use(express.json({limit: '200mb'}));
app.use(express.urlencoded({limit: '200mb',extended:true}));
app.use(cors())


// const router = require("./router");


// DB connection


mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });



const PORT = 3001;
// app.use(router);


app.listen(PORT, async () => {
  console.log(`server up on port : ${PORT}`);
});


