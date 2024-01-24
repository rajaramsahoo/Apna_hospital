import express from 'express';
import {createPatient, viewyourData, updatePatientData} from '../controller/patient_controller.js';


const router = express.Router();


/*
description: create a patient
method :post
api_url: api/task
*/
router.post('/',createPatient)

/*
description: get own patient data
method :get
api_url: api/patient/:referenceNo
*/

router.get('/:referenceNo',viewyourData);

/*
description: update patient data
method :patch
api_url: api/patient/:referenceNo
*/
router.patch('/:referenceNo',updatePatientData);



export default router;