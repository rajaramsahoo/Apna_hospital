import mongoose from 'mongoose';
const { Schema } = mongoose;

const patientSchema = new Schema({

    patientName: {
        type: String,
        required: true
    },
    gender:{
        type:String,
        required :true,
        enum:["male","female"]
    },
    mobileNumber: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    aadhar: {
        type: Number,
        required: true
    },    
    department: {
        type: String,
        required: true
    },    
    doctorName: {
        type: String,
        required: true
    },
    appointmentTime: {
        type: Date,
        required: true
    }

}); 
export default mongoose.model('patientModel', patientSchema, "Patients")
