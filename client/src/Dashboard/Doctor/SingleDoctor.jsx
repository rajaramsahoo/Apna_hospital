import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';

function SingleDoctor() {
    const { doctorId } = useParams();
    const [doctorData, setDoctorData] = useState({})

    async function fetchDoctorData(doctorId) {
        try {
            let token = JSON.parse(localStorage.getItem('token')).token;
            let res = await axios.get(`/api/doctor/${doctorId}`, {
                headers: {
                    "authorization": `Bearer ${token}`
                }
            });
            setDoctorData(res.data);
            console.log(res.data)
        }
        catch (error) {
            console.log(error)
            window.alert(error.response)
        }
    }

    useEffect(() => {
        fetchDoctorData(doctorId);
    },[])

    return (
        <>
            <center>

                <h2>`Dr {doctorData.name} Data`</h2>
                <table>
                    <thead>
                        <tr>
                            <th >Sl No</th>
                            <th>Doctor Id</th>
                            <th>Doctor Name</th>
                            <th>Gender</th>
                            <th>Email</th>
                            <th >Contact No</th>
                            <th>Address</th>
                            <th>DEPT</th>
                            <th>Added by</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td >{"1"}</td>
                            <td>{doctorData._id}</td>
                            <td>{doctorData.name}</td>
                            <td>{doctorData.gender}</td>
                            <td>{doctorData.email}</td>
                            <td >{doctorData.mobile}</td>
                            <td>{doctorData.address}</td>
                            <td>{doctorData.department}</td>
                            <td>{doctorData.addedByDean} </td>
                        </tr>
                    </tbody>
                </table>
            </center>
        </>
    )
}

export default SingleDoctor