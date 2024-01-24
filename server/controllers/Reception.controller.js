import ReceiptionsModel from "../models/Receiptions.model.js";
import doctorModel from "../models/doctor.model.js";
import bcrypt from "bcrypt";

export const receiptionSignup = async (req, res) => {
    try {
        let { name, userName, password, gender, email, mobile, address, addedBy } = req.body;

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
        req.body.password = await bcrypt.hash(password, 12)

        const receiptionData = {
            ...req.body
        }

        ReceiptionsModel.create(receiptionData)

        res.status(200).json({ msg: "Receiption new account created sucessfully" })
    }
    catch (err) {
        console.log(err)
    }
}
