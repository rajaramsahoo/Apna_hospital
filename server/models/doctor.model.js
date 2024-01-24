import mongoose from "mongoose"

const { Schema } = mongoose

const DoctorSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
        enum: ["male", "female"]
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobile: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true
    },

    availability: {
        type: Date,
        required: true
    },
    addedByDean: {
        type: String,
        required: true,
    }



})

export default mongoose.model('Doctormodel', DoctorSchema, "Doctor")