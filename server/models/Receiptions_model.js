import mongoose from "mongoose"

const { Schema } = mongoose

const ReceptionistsSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
        unique: true,
        lowercase:true
    },
    password : {
        type: String,
        required: true,
    },
    gender:{
        type:String,
        required :true, 
        enum:["male","female"]
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    mobile : {
        type: String,
        required: true,
        unique: true
    },
    address : {
        type: String,
        required: true,
    },
    addedBy : {
        type: String,
        required: true,
    }
})

export default mongoose.model('ReceptionistsModel', ReceptionistsSchema, "Receptionists")