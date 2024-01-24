import express from "express"
import { doctorSignup } from "../controllers/doctor_controllers.js"
import { doctorLogin } from "../controllers/doctor_controllers.js"

const routes = express.Router()

routes.post('/signup',doctorSignup)
routes.post('/login',doctorLogin)


export default routes