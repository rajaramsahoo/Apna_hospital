import {body, validationResult} from 'express-validator'


function patientCreateValidation(){
    return [
        body('patientName', 'Patient name doesnot blank').notEmpty(),
        body('gender', 'Patient gender doesnot blank').notEmpty(),
        body('mobileNumber', 'Phone number is invalid').notEmpty().isLength({ min: 13, max: 13 }),
        body('address', 'Patient address doesnot blank').notEmpty(),
        body('email', 'Patient email is invalid').isEmail(),
        body('aadhar', 'Patient adhar number doesnot blank').notEmpty(),
        body('department', 'Deapartment doesnot blank').notEmpty(),
        body('doctorName', 'doctorName doesnot blank').notEmpty(),
    ]
}

function doctorSignupValidation(){
    return [
        body('name', 'Doctor name doesnot blank').notEmpty(),
        body('userName', 'Doctor username doesnot blank').notEmpty(),
        body('password', 'password is not strong').notEmpty().isStrongPassword(),
        body('gender', 'Patient gender doesnot blank').notEmpty(),
        body('mobile', 'Phone number is invalid').notEmpty().isLength({ min: 13, max: 13 }),
        body('address', 'Patient address doesnot blank').notEmpty(),
        body('email', 'Patient email is invalid').isEmail(),
        body('department', 'Deapartment doesnot blank').notEmpty(),
    ]
}
function doctorLoginValidation(){
    return [
        body('email', 'Email is invalid').isEmail(),
        body('password', 'password is missing').notEmpty(),
    ]
}

function validationErrors(req, res, next) {
    const result = validationResult(req);
    if (result.isEmpty()) {
        return next();
    }

    res.status(401).json({ errors: result.array() });
}
export {
    validationErrors, 
    patientCreateValidation, 
    doctorSignupValidation,
    doctorLoginValidation
}