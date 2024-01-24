import express from 'express'
import patientRoute from './routes/patient_route.js'
import receptionistRoute from './routes/receptionistRoute.js'
import './dbConnect.js';

const app = express();
const port = 3001;

app.use(express.json());

// app.get('/',(req,res)=>{
//     res.status(200).send("server started up fine")
// })
app.use('/api/patient',patientRoute)
app.use('/api/receptionist', receptionistRoute)

app.listen(port,()=>{
    console.log(`the server started at port no ${port}`)
})