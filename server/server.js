import express from "express";
import 'dotenv/config'
import "./dbConnect.js"
import receptionRoutes from "./Routes/Receiption.routes.js"
import doctorRoutes from "./Routes/Doctor.routes.js"


const port = process.env.PORT || 5000


const app = express();
app.use(express.json())

app.get('/', (req, res)=>{
    res.status(200).json({msg:"server is working fine"})
})

app.use('/api/reception', receptionRoutes )
app.use('/api/doctor', doctorRoutes)


app.listen(port, ()=>{
    console.log(`The server Was live on port ${port}`)
})