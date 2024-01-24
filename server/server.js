import express from 'express'
import patientRoute from './routes/patient_routes.js'
import './dbConnect.js';
import receptionRoutes from "./routes/receptionist_routes.js"
import doctorRoutes from "./routes/doctor_routes.js"

const app = express();
const port = 3001;

app.use(express.json());

// app.get('/',(req,res)=>{
//     res.status(200).send("server started up fine")
// })
app.use('/api/patient',patientRoute)
app.use('/api/receptionist', receptionRoutes )
app.use('/api/doctor', doctorRoutes)

app.listen(port,()=>{
    console.log(`the server started at port no ${port}`)
})
