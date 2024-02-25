import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ViewAllPatient() {
    const [allPatient, setAllPatient] = useState([])

    async function allPatientData() {
        try {
            let token = JSON.parse(localStorage.getItem("token")).token

            let res = await axios.get("/api/patient", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            console.log(res.data)
            setAllPatient(res.data)
        }
        catch (error) {
            console.log(error)
            window.alert(error)
        }
    }

    useEffect(() => {
        allPatientData()
    }, [])


    return (
        <>
            <center>
                <h1>All Patients Data</h1>
                <table>
                    <thead>
                        <tr>
                            <th >Sl No</th>
                            <th>Patient Id</th>
                            <th>Patient Name</th>
                            <th>Gender</th>
                            <th>Email</th>
                            <th >Contact No</th>
                            <th>Address</th>
                            <th>Adhar No</th>
                            <th>DEPT</th>
                            <th>Attendind Dr</th>
                            <th>Appointment Date</th>
                            <th className='eye'>👉🏿</th>
                            <th className='eye'>🗑️</th>
                            <th className='eye'>✏️</th>
                        </tr>
                    </thead>
                    <tbody>

                    {
                        allPatient.map((patient, index) => {
                            return (
                                
                                    <tr key={patient._id}>
                                        <td >{index + 1}</td>
                                        <td>{patient._id}</td>
                                        <td>{patient.patientName}</td>
                                        <td>{patient.gender}</td>
                                        <td>{patient.email}</td>
                                        <td >{patient.mobileNumber}</td>
                                        <td>{patient.address}</td>
                                        <td>{patient.aadhar}</td>
                                        <td>{patient.department}</td>
                                        <td>{patient.doctorName} </td>
                                        <td>{patient.appointmentTime}</td>
                                        <td className='eye'><Link to={`/patient/view/${patient._id}`}>👉🏿</Link></td>
                                        <td className='eye'>🗑️</td>
                                        <td className='eye'>✏️</td>
                                    </tr>
                               
                            )
                        })
                    }
                     </tbody>


                </table>
            </center>

        </>
    )

}

export default ViewAllPatient