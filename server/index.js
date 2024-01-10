const express = require("express");

const app = express();

app.use(express.json());

app.get('/',(req,res)=>{
    res.send("Home");
});

app.listen(3000,()=>{
    console.log("Server running on port 3000");
});