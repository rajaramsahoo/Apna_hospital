import  express from "express";
import { deanSignup, deanLogin } from "../controllers/dean_controller.js";


const routes = express.Router();

routes.post('/signup', deanSignup)
routes.post('/login',deanLogin)

export default routes