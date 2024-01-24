import jwt from 'jsonwebtoken';


const privateKey = "raja"

export default function generateToken(payload){

    var token = jwt.sign(payload, privateKey);
    // console.log("Encode JWT----->>>>");
    // console.log(token);
    return token;
}


