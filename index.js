const express = require("express");
const app = express();
const MyError = require("./express");


//middleWare

// app.use((req,res,next)=>{
//     console.log("1st middleware")
//     next();
// })
// app.use("/ran",(req,res,next)=>{
//     console.log("2nd middleware")
//     next();
// })


// //logger
// app.use((req,res,next)=>{
//     req.time =new Date( Date.now());
//     console.log(req.method,req.hostname,req.path,req.time);
//     return next();
// })
let checkToken = (req,res,next)=>{
    let {token} = req.query;
    if(token==='giveaccess'){
        next();
    }

             throw new MyError(401,"ACESS DENIED!")
}
app.get('/api',checkToken,(req,res)=>{
    res.send('data');
})
app.get("/",(req,res)=>{
    res.send("root page");
})

app.get("/ran",(req,res)=>{
    res.send("random page");
})
app.get("/admin",(req,res)=>{
    throw new MyError(403,"ACESSS FORBIDDEN");
})

app.use((err,req,res,next)=>{
    let {status=500,message='some error '}=  err;
  res.status(status).send(message);
    
})
app.listen(8080,()=>{
console.log(" server started")
})