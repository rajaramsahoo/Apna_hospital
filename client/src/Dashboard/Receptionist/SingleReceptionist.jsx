import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';


function SingleReceptionist() {
    const { referenceNo } = useParams();
    const [receptionData, setReceptionData] = useState({})

    async function fetchDoctorData(referenceNo) {
        try {
            let token = JSON.parse(localStorage.getItem('token')).token;
            let res = await axios.get(`/api/receptionist/${referenceNo}`, {
                headers: {
                    "authorization": `Bearer ${token}`
                }
            });
            setReceptionData(res.data);
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

                <h2>` {receptionData.name} Receptionist Data`</h2>
                <table>
                    <thead>
                        <tr>
                            <th >Sl No</th>
                            <th>Doctor Id</th>

                            <th>Doctor Name</th>
                            <th>Receptionist UserName</th>
                            <th>Gender</th>
                            <th>Email</th>
                            <th >Contact No</th>
                            <th>Address</th>
                            <th>Added by</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td >{"1"}</td>
                            <td>{receptionData._id}</td>
                            <td>{receptionData.name}</td>
                            <td>{receptionData.userName}</td>
                            <td>{receptionData.gender}</td>
                            <td>{receptionData.email}</td>
                            <td >{receptionData.mobile}</td>
                            <td>{receptionData.address}</td>
                            <td>{receptionData.addedBy} </td>
                        </tr>
                    </tbody>
                </table>
            </center>
        </>
    )
}

export default SingleReceptionist