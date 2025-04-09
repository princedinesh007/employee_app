const express = require("express");
const app = express();
require('dotenv').config();
const mongoose=require('mongoose');
const Router=require('./Routes/userRoutes');

const PORT=process.env.PORT;
const dbUrl=process.env.DBURL;


app.use(express.json());
app.use(Router);


mongoose.connect(dbUrl).then(()=>{
    console.log("DB Connected")
}).catch((error)=>{
    console.log("Sorry Your DB is not connected",error)
})


app.listen(PORT, (err) => {
    if (err) {
      console.error("Server failed to start:", err);
    } else {
      console.log(`Server started successfully on port ${PORT}`);
    }
  });
