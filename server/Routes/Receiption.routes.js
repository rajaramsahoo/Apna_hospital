import express from "express"
import { receiptionSignup } from "../controllers/Reception.controller.js"
import {middleWare, isDoctor} from "../middlewares/auth.verifyMiddleWare.js"

const routes = express.Router()

routes.post('/receptionsignup',isDoctor,receiptionSignup)

export default routes