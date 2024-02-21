import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


function CreateDoctor() {

    let navigate = useNavigate()
    const [doctorData, setDoctorData] = useState({
        name: '',
        userName: '',
        gender: '',
        email: '',
        mobile: '',
        address: '',
        password: '',
        department: '',
        addedBy: ''
    })

    function onChangeHandler(e) {
        console.log(e.target.value)
        setDoctorData({
            ...doctorData,
            [e.target.name]: e.target.value
        })
    }

    async function onClickHandler(e) {
        try {
            let token = JSON.parse(localStorage.getItem('token')).token

            e.preventDefault();
            if (!doctorData.name.trim() || !doctorData.userName.trim() || !doctorData.gender.trim() || !doctorData.email.trim()|| !doctorData.mobile.trim()|| !doctorData.address.trim() || !doctorData.password.trim() || !doctorData.department.trim() || !doctorData.addedBy.trim()) {
                return window.alert("please fill up properly")
            }
            // console.log(userData)
            const res = await axios.post("/api/doctor/signup", doctorData, {
                headers: {
                    "authorization": `Bearer ${token}`
                }
            })
            console.log(res.data)

            alert("Doctor profile was created")
            navigate('/dean/deandashboardpage')
            setDoctorData({
                name: '',
                userName: '',
                gender: '',
                email: '',
                mobile: '',
                address: '',
                password: '',
                department: '',
                addedBy: ''
            })

        }
        catch (err) {
            console.log(err)
            window.alert(err.response.data)
        }
    }


    return (
        <>
            <div>
                <center>
                    <form>
                        <label>
                            Enter the Doctor Name:
                            <input type="text" name="name" onChange={onChangeHandler} value={doctorData.name} />
                        </label>
                        <br />
                        <label>
                            UserName :
                            <input type="text" name="userName" onChange={onChangeHandler} value={doctorData.userName} />
                        </label>
                        <br />
                        <label>
                            Gender :
                            <input type="text" name="gender" onChange={onChangeHandler} value={doctorData.gender} />
                        </label>
                        <br />
                        <label>
                            Enter the Email :
                            <input type="text" name="email" onChange={onChangeHandler} value={doctorData.email} />
                        </label>
                        <br />
                        <label>
                            Enter the Mobile Number   :
                            <input type="text" name="mobile" onChange={onChangeHandler} value={doctorData.mobile} />
                        </label>
                        <br />
                        <label>
                            Enter the Adress :
                            <input type="text" name="address" onChange={onChangeHandler} value={doctorData.address} />
                        </label>
                        <br />
                        <label>
                            Enter the Password :
                            <input type='password' name="password" onChange={onChangeHandler} value={doctorData.password} />
                        </label><br />
                        <label>
                            Enter the DEPT :
                            <input type="text" name="department" onChange={onChangeHandler} value={doctorData.department} />
                        </label><br />

                        <label>
                            Enter the Added By :
                            <input type="text" name="addedBy" onChange={onChangeHandler} value={doctorData.addedBy} />
                        </label>
                        <br />
                        <button type="submit" onClick={onClickHandler}>Create A Doctor</button>
                    </form>
                </center>
            </div>
        </>
    )
}

export default CreateDoctor