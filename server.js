const express = require('express')
const config =  require('./config/config')
const userRouter  = require('./routers/userRouter')
const port = process.env.port
const app = express()
app.use(express.json())

app.use("/api/v1/user", userRouter)
app.use('/', (req, res)=>{
    res.send('This is a bank application  software, where you can carry ')
})

app.listen(port,()=>{
    console.log(`Server is listening on port:${port}`)
})