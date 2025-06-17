const mongoose=require('mongoose')

mongoose.connect(process.env.CONNECTION_STRING).then((res)=>{
    console.log("server connected at mongoDB")
}).catch((err)=>{console.log(err)})

