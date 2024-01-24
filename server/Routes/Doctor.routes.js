import express from "express"
import { doctorSignup } from "../controllers/Doctor.controllers.js"
import { doctorLogin } from "../controllers/Doctor.controllers.js"

const routes = express.Router()

routes.post('/doctorSignup',doctorSignup)
routes.post('/doctorlogin',doctorLogin)


export default routes