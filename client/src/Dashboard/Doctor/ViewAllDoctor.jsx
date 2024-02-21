import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ViewAllDoctor() {
    let navigate = useNavigate();
    let token = JSON.parse(localStorage.getItem("token")).token
    const [allDoctor, setAllDoctor] = useState([])

    async function allDoctorData() {
        try {
            let token = JSON.parse(localStorage.getItem("token")).token

            let res = await axios.get("/api/doctor", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            console.log(res.data)
            setAllDoctor(res.data)
        }
        catch (error) {
            console.log(error)
            window.alert(error)
        }
    }

    useEffect(() => {
        allDoctorData()
    }, [])


    return (
        <>
            <center>
                <h1>All Doctor Data</h1>
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
                            <th className='eye'>👉🏿</th>
                            <th className='eye'>🗑️</th>
                            <th className='eye'>✏️</th>
                        </tr>
                    </thead>

                    {
                        allDoctor.map((doc, index) => {
                            return (
                                <tbody>
                                    <tr>
                                        <td >{index + 1}</td>
                                        <td>{doc._id}</td>
                                        <td>{doc.name}</td>
                                        <td>{doc.gender}</td>
                                        <td>{doc.email}</td>
                                        <td >{doc.mobile}</td>
                                        <td>{doc.address}</td>
                                        <td>{doc.department}</td>
                                        <td>{doc.addedByDean} </td>
                                        <td className='eye'><Link to={`/doctor/view/${doc._id}`}>👉🏿</Link></td>
                                        <td className='eye'>🗑️</td>
                                        <td className='eye'>✏️</td>
                                    </tr>
                                </tbody>
                            )
                        })
                    }


                </table>
            </center>

        </>
    )
}

export default ViewAllDoctor