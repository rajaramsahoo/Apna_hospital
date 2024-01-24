import bcrypt from 'bcrypt';
import receptionistModel from '../model/receptionistModel.js'
import sendMail from '../email.js';
import generationToken from '../utils/generationToken.js'

export const signupReceptionist = async (req, res) => {
    try {
        let { firstName, lastName, gender, email, phone, aadhar, password } = req.body
        let emailFound = await receptionistModel.findOne({ email: email });
        if (emailFound) {
            return res.status(409).json({ error: 'receptionist email already registered' })
        }

        let phoneFound = await receptionistModel.findOne({ phone: phone });
        if (phoneFound) {
            return res.status(409).json({ error: 'receptionist phone already registered' })
        }

        let aadharFound = await receptionistModel.findOne({ aadhar: aadhar })
        if (aadharFound) {
            return res.status(409).json({ error: "this aadhar was already seeded to another employee" })
        }
        // hassing the password
        password = await bcrypt.hash(password, 12)

        let receptionistData = {
            firstName,
            lastName,
            gender,
            email,
            phone,
            aadhar,
            password
        }
        await receptionistModel.create(receptionistData);
        res.status(200).json({ msg: 'receptionist signup sucessfull' });
        let usermailBody = {
            to: email,
            subject: "Thanking for joining with us",
            //text: `Please Verify Your Email ${config.BASE_URL}/api/user/verify/email/${userverifyToken.email}`,
            html: `<p>Hi, <b>${receptionistData.firstName}</b></p>
            Please find your your login details 
            <h3>url = <b>http://localhost:3001/api/receptionist/login</b></h3>
            <h3>User name = <b>${receptionistData.email}</b></h3>
            <h3>Password = <b>${req.body.password}</b></h3>.
            <p> Thank you for choosing us. </p>`
        }
        sendMail(usermailBody)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'something went wrong' });

    }
}

export const loginReceptionist = async (req,res) =>{
    try {
        const { email, password } = req.body;
        let emailFound = await receptionistModel.findOne({ email: email });
        if (!emailFound) {
            return res.status(401).json({ error: 'Incorrect email id' })
        }
        let matchPassword = await bcrypt.compare(password, emailFound.password);
        if (!matchPassword) {
            return res.status(401).json({ error: 'Incorrect password' })
        }

        //generation token
        let payload = {
            user_id: emailFound._id
        }
        const token = generationToken(payload);
        console.log(token)
        res.status(200).json({msg:`${emailFound.firstName} was login successfully`, token})
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"something error in login"})
    }
}