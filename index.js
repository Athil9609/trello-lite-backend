require('dotenv').config()
require('./Connection/db')

const routes=require('./Routes/Router')
const express=require('express')
const cors=require('cors')

const kanbanServer=express()

kanbanServer.use(cors())

kanbanServer.use(express.json())

kanbanServer.use(routes)

const PORT=process.env.PORT || 3000

kanbanServer.listen(PORT,()=>{
    console.log("Server Running At Port:",PORT)
})

kanbanServer.get('/',(req,res)=>{
    res.send("<h1>Welcome to kanban server</h1>")
})
