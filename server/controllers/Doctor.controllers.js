import Doctormodel from "../models/doctor.model.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";

export const doctorSignup = async (req, res) => {
    try {
        let { name, userName, password, gender, email, mobile, address, department, availability, addedByDean } = req.body;

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
        req.body.password = await bcrypt.hash(password, 12)

        const DoctorData = {
            ...req.body
        }

        Doctormodel.create(DoctorData)

        res.status(200).json({ msg: "Doctor new account created sucessfully" })
    }
    catch (err) {
        console.log(err)
    }
}


export const doctorLogin = async (req, res) => {

    try {
        const { userName, password } = req.body;

        let doctorFound = await Doctormodel.findOne({ userName : req.body.userName })

        //  console.log(doctorFound)
        if (!doctorFound) {
            return res.status(409).json({err:`${userName} not regd yet`})
        }

        
        let matchPossword = await bcrypt.compare(password, doctorFound.password);
        if (!matchPossword) {
            return res.status(401).json({ err: "Doctor your password was wrong" })
        }

        // if(emailFound.isVerified.email == false){
        //     return res.status(404).json({err : "email not verified"})
        // }

        // if(emailFound.isVerified.phone == false){
        //     return res.status(404).json({err : "phone not verified"})
        
        // }



        let payload = {
            user_id: doctorFound._id,
            role : "doctor"
        }
        // console.log(payload)
        let token = generateToken(payload)
        console.log(token)
        
        res.status(200).json({ msg: "Doctor login successfully", token })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: " Doctor something went wrong in LOGIN" })
    }
}

