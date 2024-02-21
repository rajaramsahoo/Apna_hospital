import Doctormodel from "../models/doctor_model.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";
import sendMail from "../email.js";
import mongoose from "mongoose";


export const doctorSignup = async (req, res) => {
    try {
        // console.log(req.payload)
        let { name, userName, password, gender, email, mobile, address, department, addedByDean } = req.body;

        let userNameFound = await Doctormodel.findOne({ userName: userName })
        if (userNameFound) {
            return res.status(404).json({ error: "username was already registered" })
        }
        let emailFound = await Doctormodel.findOne({ email: email })
        if (emailFound) {
            return res.status(404).json({ error: "Email was already registered" })
        }
        let mobileFound = await Doctormodel.findOne({ mobile: mobile })
        if (mobileFound) {
            return res.status(404).json({ error: "mobile number was already registered" })
        }
        password = await bcrypt.hash(password, 12)

        const doctorData = {
            name,
            userName,
            password,
            gender,
            email,
            mobile,
            address,
            department,
            addedByDean : req.payload.role
        }

        await Doctormodel.create(doctorData)

        res.status(200).json({ msg: `Successfully created Doctor Mr/Mrs ${doctorData.name}` })
        let usermailBody = {
            to: email,
            subject: "Thanking for joining with us",
            //text: `Please Verify Your Email ${config.BASE_URL}/api/user/verify/email/${userverifyToken.email}`,
            html: `<p>Hi, <b>Dr ${doctorData.name}</b></p>
                        Please find your your login details 
                        <h3>url = <b>http://localhost:3001/api/doctor/login</b></h3>
                        <h3>User name = <b>${doctorData.email}</b></h3>
                        <h3>Password = <b>${req.body.password}</b></h3>.
                        <p> Thank you for choosing us. </p>`
        }
        sendMail(usermailBody)
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ error: 'something went wrong in doctor signup' });

    }
}

export const doctorLogin = async (req, res) => {

    try {
        const { email, password } = req.body;

        let doctorFound = await Doctormodel.findOne({ email: email })

        //  console.log(doctorFound)
        if (!doctorFound) {
            return res.status(409).json({ error: `${email} not found ` })
        }


        let matchPassword = await bcrypt.compare(password, doctorFound.password);
        if (!matchPassword) {
            return res.status(401).json({ error: "Invalid password" })
        }

        // if(emailFound.isVerified.email == false){
        //     return res.status(404).json({err : "email not verified"})
        // }

        // if(emailFound.isVerified.phone == false){
        //     return res.status(404).json({err : "phone not verified"})

        // }

        let payload = {
            user_id: doctorFound._id,
            role: "doctor"
        }
        // console.log(payload)
        let token = generateToken(payload)
        //console.log(token)

        res.status(200).json({ msg: `Dr ${doctorFound.name} you are logged in`, token })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: " something went wrong in doctor Login" })
    }
}

export async function viewDoctorData(req, res) {
    try {
        const { doctorId } = req.params
        if (!mongoose.isValidObjectId(doctorId)) {
            return res.status(400).json({ error: "please pass valid doctor id" })
        }
        let doctotData = await Doctormodel.findById(doctorId);
        if (!Doctormodel) {
            return res.status(404).json({ error: "doctor not found" })
        }
        res.status(200).send(doctotData)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "something went wrong in finding the doctor data" })
    }
}

export async function updateDoctorData(req, res) {
    try {
        const { doctorId } = req.params
        const { newDoctorName, newMobileNumber, newAddress, newEmail, newDepartment } = req.body
        if (!mongoose.isValidObjectId(doctorId)) {
            return res.status(400).json({ error: "please find the valid doctor id" })
        }

        // newdate= new Date(newAvailability)
        let doctorData = await Doctormodel.findByIdAndUpdate(
            doctorId,
            {
                $set: {
                    name: newDoctorName,
                    mobile: newMobileNumber,
                    address: newAddress,
                    email: newEmail,
                    department: newDepartment,
                    // availability: new Date (newdate)
                }
            },
            { new: true })
        if (!doctorData) {
            return res.status(404).json({ error: "Doctor not registered" })
        }
        res.status(200).json({ msg: "Doctor Data Updated Successfully" })

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "something went wrong in updating the doctor data" })
    }
}

export async function deleteDoctor(req, res){
    try {
        const {doctorId} = req.params
        if (!mongoose.isValidObjectId(doctorId)) {
            return res.status(400).json({ error: "please find the valid doctor id" })
        }
        let deleteDoc = await Doctormodel.findByIdAndDelete({_id : doctorId})
    console.log(deleteDoc)
    if(!deleteDoc){
        return res.status(404).json({error:"Doctor not found"})
    }
    res.status(200).json({msg:"Doctor deleted successfully"})
    } catch (error) {
        cponsole.log(error)
        res.status(500).json({error:"Something went wrong in deleting the doctor"})
    }
}

export const addAvailability = async (req, res) => {
    try {
        const { toDate, fromDate } = req.body;
        const doctorId = req.payload.user_id; // Assuming the user ID is stored in the request object after authentication

        // Find the doctor by ID
        let doctor = await Doctormodel.findById(doctorId);

        if (!doctor) {
            return res.status(404).json({ error: "Doctor not found" });
        }
        const startDate = new Date(toDate).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
        const endDate = new Date(fromDate).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
        // Add availability
        doctor.availability.push({ 
            startTime: startDate,
            endTime: endDate
         });
        await doctor.save();

        res.status(200).json({ msg: `Availability added successfully` });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong while adding availability" });
    }
};

export async function allDoctorData(req, res) {
    try {
        let DoctorData = await Doctormodel.find()
        if (!DoctorData) {
            return res.status(404).json({ error: "No Doctor available" })
        }
        res.status(200).send(DoctorData)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Something went wrong" })
    }
}