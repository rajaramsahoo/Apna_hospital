import mongoose from "mongoose"
import patientModel from "../model/patientModel.js"
import sendMail from '../email.js'

export async function createPatient(req, res) {
    try {
        const { patientName,gender, mobileNumber, address, email, aadhar, department, doctorName, appointmentTime } = req.body

        let patientObj = {
            patientName,
            gender,
            mobileNumber,
            address,
            email,
            aadhar,
            department,
            doctorName,
            appointmentTime: new Date(appointmentTime)
        }

        let patient = await patientModel.create(patientObj)
        let registrationNumber = patient._id;
        console.log(registrationNumber)

        res.status(200).json({ msg: "patient created successfylly" })

        let userMailBody = {
            to: patientObj.email,
            subject: "Registration Successfull",
            text: `MR/MRs ${patientObj.patientName} your appointment with doctor ${patientObj.doctorName} on ${patientObj.appointmentTime}.Your Reference no:=> ${registrationNumber}`,
            html: `<h1>MR/MRs ${patientObj.patientName} your appointment with doctor ${patientObj.doctorName} on ${patientObj.appointmentTime}.Your Reference no${registrationNumber}`
        }
        sendMail(userMailBody)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "something went wrong(patient does not created)" })

    }
}

export async function viewyourData(req, res) {
    try {
        const { referenceNo } = req.params

        if (!mongoose.isValidObjectId(referenceNo)) {
            return res.status(400).json({ error: 'please pass valid patient reference number' })
        }


        let patientData = await patientModel.findById(referenceNo);
        //console.log(singletask)

        if (!patientModel) {
            return res.status(404).json({ error: 'patient does not found' })
        }
        res.status(200).send(patientData)
    } catch (error) {
        console.log(error)
    }
}

export async function updatePatientData(req, res) {
    try {
        const { referenceNo } = req.params
        const { newPatientName, newMobileNumber, newAddress, newEmail, newAadhar, newDepartment, newDoctorName, newAppointmentTime } = req.body
        if (!mongoose.isValidObjectId(referenceNo)) {
            return res.status(400).json({ error: "please pass valid patient reference number" })
        }
       
        let patientData = await patientModel.findByIdAndUpdate(
            referenceNo,
            {
                $set: {
                    patientName: newPatientName,
                    mobileNumber: newMobileNumber,
                    address: newAddress,
                    email: newEmail,
                    aadhar: newAadhar,
                    department: newDepartment,
                    doctorName: newDoctorName,
                    appointmentTime: new Date(newAppointmentTime)
                }
            },
        { new : true })
        if (!patientData){
            return res.status(404).json({error:"patient not registered"})
        }
        res.status(200).json({ msg: "patient data updated successfylly" })

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "something went wrong in updating" })

    }
}

