import express from 'express';
import {createPatient, viewyourData, updatePatientData, allPatient} from '../controllers/patient_controller.js';


const router = express.Router();


/*
description: create a patient
method :post
api_url: api/patient
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

/*
description: get Patient
method :get
api_url: api/patient
*/
router.get('/', allPatient );


export default router;