import express from 'express';
import {signupReceptionist, loginReceptionist} from '../controller/receptionistController.js'

const router = express.Router();


/*
description: signup a receptionist
method :post
api_url: api/task
*/
router.post('/signup',signupReceptionist)
router.post('/login', loginReceptionist);


/*
description: login a receptionist
method :post
api_url: api/patient/:referenceNo
*/





export default router;