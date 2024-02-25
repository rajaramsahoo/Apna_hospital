import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';


function SinglePatient() {

    const { referenceNo } = useParams();
    const [patientData, setPatientData] = useState({})

    async function fetchDoctorData(referenceNo) {
        try {
            let token = JSON.parse(localStorage.getItem('token')).token;
            let res = await axios.get(`/api/patient/${referenceNo}`, {
                headers: {
                    "authorization": `Bearer ${token}`
                }
            });
            setPatientData(res.data);
            console.log(res.data)
        }
        catch (error) {
            console.log(error)
            window.alert(error.response)
        }
    }

    useEffect(() => {
        fetchDoctorData(referenceNo);
    }, [])

    return (
        <>
            <center>

                <h2> {patientData.name} Receptionist Data</h2>
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
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td >{"1"}</td>

                            <td>{patientData._id}</td>
                            <td>{patientData.patientName}</td>
                            <td>{patientData.gender}</td>
                            <td>{patientData.email}</td>
                            <td >{patientData.mobileNumber}</td>
                            <td>{patientData.address}</td>
                            <td>{patientData.aadhar}</td>
                            <td>{patientData.department}</td>
                            <td>{patientData.doctorName} </td>
                            <td>{patientData.appointmentTime}</td>
                        </tr>
                    </tbody>
                </table>
            </center>
        </>
    )
}

export default SinglePatient





