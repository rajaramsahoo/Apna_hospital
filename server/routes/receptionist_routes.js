import express from "express"
import { receptionistSignup, receptionistLogin } from "../controllers/Reception_controller.js"
import {middleWare, isDoctor} from "../middlewares/auth.verifyMiddleWare.js"

const routes = express.Router()

routes.post('/signup',isDoctor,receptionistSignup)
routes.post('/login',receptionistLogin)



export default routes