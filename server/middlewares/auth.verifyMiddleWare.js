import jwt from 'jsonwebtoken';
const private_key = "raja"


export function middleWare(req, res, next) {
    try {

        let token = req.headers.authorization.split(" ")[1];
        // console.log(token);
        let decode = jwt.verify(token, private_key);
        // console.log(decode) ;
        req.payload = decode;
        next();
    }
    catch (err) {
        console.log(err);
        return res.status(404).send("unAuthorized person in verify token")
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
            return res.status(404).json({err : "you are not a authorized"})
        }
       
    }
    catch (err) {
        console.log(err);
        return res.status(404).send("unAuthorized person in verify token")
    }

}






