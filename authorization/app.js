const express = require('express')
const jwt = require('jsonwebtoken')
require("dotenv").config()
const app = express()
app.use(express.json())


function verifyToken(req, res, next) {
    const token = req.headers.authorization.split(' ')[1]
   // console.log(token)
    req.token=token
    next()
}

app.get('/login',(req,res)=>{
    res.send("Please Login using ThunderClient!")
})
app.post('/login',(req,res)=>{
    const user = {
        uname:"vicky",
        pwd:"1432"
    }
    if(req.body.uname === user.uname && req.body.pwd === user.pwd){
        jwt.sign({user},process.env.JWT_PVT_KEY,{expiresIn:20},(err,token)=>{
            console.log(token)
            res.status(200).json({token})          
        })
    }
    else{
        res.status(401).send({message:"Invalid Credentials"})
    }
})
app.post('/profile',verifyToken,(req,res)=>{
    jwt.verify(req.token,process.env.JWT_PVT_KEY,(err, data)=>{
        console.log(req.token);
        if(!err) 
            res.status(200).json({message:"Welcome, User!"})
        else 
            res.status(401).json({message:"Invalid Token"})
    })
})

app.listen(process.env.PORT,()=>{
    console.log("Server is running on port "+process.env.PORT)
})