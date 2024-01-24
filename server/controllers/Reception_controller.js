import ReceiptionsModel from "../models/Receiptions_model.js";
import doctorModel from "../models/doctor_model.js";
import bcrypt from "bcrypt";
import sendMail from "../email.js";

export const receptionistSignup = async (req, res) => {
    try {
        let { name, userName, password, gender, email, mobile, address } = req.body;

        //
        let userFound = await doctorModel.findById(req.payload.user_id)
        // console.log( userFound)

        if (!userFound) {
            return res.status(404).send("Doctor not found")
        }


        let userNameFound = await ReceiptionsModel.findOne({ userName: userName })
        if (userNameFound) {
            return res.status(404).json({ error: "username was already registered" })
        }
        let emailFound = await ReceiptionsModel.findOne({ email: email })
        if (emailFound) {
            return res.status(404).json({ error: "Email was already registered" })
        }
        let mobileFound = await ReceiptionsModel.findOne({ mobile: mobile })
        if (mobileFound) {
            return res.status(404).json({ error: "mobile number was already registered" })
        }

        // hassing the password
        password = await bcrypt.hash(password, 12)

        const receptionistData = {
            name,
            userName,
            password,
            gender,
            email,
            mobile,
            address,
            addedBy :  userFound.name
        }

        await ReceiptionsModel.create(receptionistData)

        res.status(200).json({ msg: `${receptionistData.userName}  signup successfully` })

        let usermailBody = {
            to: email,
            subject: "Thanking for joining with us",
            //text: `Please Verify Your Email ${config.BASE_URL}/api/user/verify/email/${userverifyToken.email}`,
            html: `<p>Hi, <b>${receptionistData.name}</b></p>
                        Please find your your login details 
                        <h3>url = <b>http://localhost:3001/api/receptionist/login</b></h3>
                        <h3>User name = <b>${receptionistData.email}</b></h3>
                        <h3>Password = <b>${req.body.password}</b></h3>.
                        <p> Thank you for choosing us. </p>`
        }
        sendMail(usermailBody)
    }
    catch (error) {
        console.log(err)
        res.status(500).json({ error: 'something went wrong' });
    }
}


export const receptionistLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        let emailFound = await ReceiptionsModel.findOne({ email: email });
        if (!emailFound) {
            return res.status(401).json({ error: 'Incorrect email id' })
        }
        let matchPassword = await bcrypt.compare(password, emailFound.password);
        if (!matchPassword) {
            return res.status(401).json({ error: 'Incorrect password' })
        }
        res.status(200).json({ msg: `${emailFound.name} was login successfully` })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "something error in login" })
    }
}