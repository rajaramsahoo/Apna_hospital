import Deanmodel from "../models/dean_model.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcrypt";
import sendMail from "../email.js";


export const deanSignup = async (req, res) => {
    try {
        let { name, userName, password, gender, email, mobile, address } = req.body;

        let userNameFound = await Deanmodel.findOne({ userName: userName })
        if (userNameFound) {
            return res.status(404).json({ error: "username was already registered" })
        }
        let emailFound = await Deanmodel.findOne({ email: email })
        if (emailFound) {
            return res.status(404).json({ error: "Email was already registered" })
        }
        let mobileFound = await Deanmodel.findOne({ mobile: mobile })
        if (mobileFound) {
            return res.status(404).json({ error: "mobile number was already registered" })
        }
        password = await bcrypt.hash(password, 12)

        const deanData = {
            name, 
            userName, 
            password, 
            gender, 
            email, 
            mobile, 
            address
        }

       await Deanmodel.create(deanData)

        res.status(200).json({ msg: `Successfully created Dean Mr/Mrs ${deanData.name}` })
        let usermailBody = {
            to: email,
            subject: "Thanking for joining with us",
            //text: `Please Verify Your Email ${config.BASE_URL}/api/user/verify/email/${userverifyToken.email}`,
            html: `<p>Hi, <b>Dr ${deanData.name}</b></p>
                        Please find your your login details 
                        <h3>url = <b>http://localhost:3001/api/dean/login</b></h3>
                        <h3>User name = <b>${deanData.email}</b></h3>
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

export const deanLogin = async (req, res) => {

    try {
        const { email, password } = req.body;

        let deanFound = await Deanmodel.findOne({ email : email })

        //  console.log(deanFound)
        if (!deanFound) {
            return res.status(409).json({error:`${email} not found `})
        }

        
        let matchPassword = await bcrypt.compare(password, deanFound.password);
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
            user_id: deanFound._id,
            role : "dean"
        }
        // console.log(payload)
        let token = generateToken(payload)
        //console.log(token)
        
        res.status(200).json({ msg: `Dr ${deanFound.name} you are logged in`, token })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: " something went wrong in dean Login" })
    }
}
