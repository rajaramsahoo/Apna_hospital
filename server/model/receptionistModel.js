import mongoose from 'mongoose';
const { Schema } = mongoose;

const receptionistSchema = new Schema({

    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    gender:{
        type:String,
        required :true,
        enum:["male","female"]
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    aadhar: {
        type: Number,
        required: true
    },    
    password: {
        type: String,
        required: true
    }

}); 
export default mongoose.model('receptionistModel', receptionistSchema, "Receptionists")