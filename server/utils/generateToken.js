import jwt from 'jsonwebtoken';
import config from '../config/config.js';



const private_key = config.PRIVATE_KEY

export default function generateToken(payload) {

    const token = jwt.sign(payload, private_key);
    //const token = jwt.sign(payload, private_key,{expiresIn})

    // console.log("Encode JWT----->>>>");
    // console.log(token);
    return token;
}


