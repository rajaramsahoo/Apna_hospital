import express from "express"
import { receptionistSignup, receptionistLogin,singleReceptionistData,allReceptionistData,deleteReceptionist,updateReceptionist} from "../controllers/Reception_controller.js"
import {middleWare, isDoctor} from "../middlewares/auth.verifyMiddleWare.js"

const routes = express.Router()

routes.post('/signup',isDoctor,receptionistSignup)
routes.post('/login',receptionistLogin)
routes.get('/:referenceNo',singleReceptionistData)
routes.get('/', allReceptionistData );
routes.delete('/:referenceNo',isDoctor,deleteReceptionist)
routes.patch('/:referenceNo',updateReceptionist)

export default routes