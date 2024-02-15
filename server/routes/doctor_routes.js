import express from "express"
import { doctorSignup, updateDoctorData, deleteDoctor, addAvailability } from "../controllers/doctor_controllers.js"
import { doctorLogin } from "../controllers/doctor_controllers.js"
import { viewDoctorData } from "../controllers/doctor_controllers.js"
import { isDean , isDoctor} from "../middlewares/auth.verifyMiddleWare.js"
import { validationErrors, doctorSignupValidation,doctorLoginValidation} from '../middlewares/validation.js'
const routes = express.Router()

routes.post('/signup',isDean,doctorSignupValidation(),validationErrors, doctorSignup)
routes.post('/login',doctorLoginValidation(),validationErrors,doctorLogin)
routes.post('/availability',isDoctor, addAvailability);
routes.get('/:doctorId',isDean, viewDoctorData);
routes.patch('/:doctorId',isDean,updateDoctorData);
routes.delete('/:doctorId',isDean, deleteDoctor );

export default routes