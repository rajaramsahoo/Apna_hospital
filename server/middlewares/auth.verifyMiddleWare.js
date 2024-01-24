import jwt from 'jsonwebtoken';
import config from '../config/config.js';



const private_key = config.PRIVATE_KEY

export function middleWare(req, res, next) {
    try {

        let token = req.headers.authorization.split(" ")[1];
        // console.log(token);
        let decode = jwt.verify(token, private_key);
        // console.log(decode) ;
        req.payload = decode;
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(404).json({error : "unAuthorized person "})
    }

}



export function isDoctor(req, res, next) {
    try {

        let token = req.headers.authorization.split(" ")[1];
        // console.log(token);
        let decode = jwt.verify(token, private_key);
        if(decode.role == "doctor"){
            req.payload = decode;
            next();
        }
        else {
            return res.status(404).json({error : "unauthorized doctor"})
        }
       
    }
    catch (error) {
        console.log(error);
        return res.status(404).send("unAuthorized person for creating the receptionist")
    }

}






