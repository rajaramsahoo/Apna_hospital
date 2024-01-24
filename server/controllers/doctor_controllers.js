import Doctormodel from "../models/doctor_model.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";
import sendMail from "../email.js";


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
            availability, 
            addedByDean
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

        let doctorFound = await Doctormodel.findOne({ email : email })

        //  console.log(doctorFound)
        if (!doctorFound) {
            return res.status(409).json({error:`${email} not found `})
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
            role : "doctor"
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

