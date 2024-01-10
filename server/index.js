const express = require("express");
const http = require('http');
const cors = require('cors');
const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(cors());

app.get('/',(req,res)=>{
    res.send({greeting: "Hello World"});
});

const port = process.env.PORT || 3000;

server.listen(port,()=>{
    console.log(`Server running on port ${port}`);
});