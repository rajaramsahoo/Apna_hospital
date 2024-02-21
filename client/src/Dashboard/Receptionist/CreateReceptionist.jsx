import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'



function CreateReceptionist() {

    let navigate = useNavigate()
    const [receptionistData, setReceptionistData] = useState({
        name: '',
        userName: '',
        gender: '',
        email: '',
        mobile: '',
        address: '',
        password: '',
        addedBy: ''
    })

    function onChangeHandler(e) {
        console.log(e.target.value)
        setReceptionistData({
            ...receptionistData,
            [e.target.name]: e.target.value
        })
    }

    async function onClickHandler(e) {
        try {
            let token = JSON.parse(localStorage.getItem('token')).token

            e.preventDefault();
            if (!receptionistData.name.trim() || !receptionistData.userName.trim() || !receptionistData.gender.trim() || !receptionistData.email.trim() || !receptionistData.mobile.trim() || !receptionistData.address.trim() || !receptionistData.password.trim() || !receptionistData.addedBy.trim()) {
                return window.alert("please fill up properly")
            }
            // console.log(userData)
            const res = await axios.post("/api/receptionist/signup", receptionistData, {
                headers: {
                    "authorization": `Bearer ${token}`
                }
            })
            console.log(res.data)

            alert("Receptionist profile was created")
            navigate('/dean/deandashboardpage')
            setReceptionistData({
                name: '',
                userName: '',
                gender: '',
                email: '',
                mobile: '',
                address: '',
                password: '',
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
                            <input type="text" name="name" onChange={onChangeHandler} value={receptionistData.name} />
                        </label>
                        <br />
                        <label>
                            UserName :
                            <input type="text" name="userName" onChange={onChangeHandler} value={receptionistData.userName} />
                        </label>
                        <br />
                        <label>
                            Gender :
                            <input type="text" name="gender" onChange={onChangeHandler} value={receptionistData.gender} />
                        </label>
                        <br />
                        <label>
                            Enter the Email :
                            <input type="text" name="email" onChange={onChangeHandler} value={receptionistData.email} />
                        </label>
                        <br />
                        <label>
                            Enter the Mobile Number   :
                            <input type="text" name="mobile" onChange={onChangeHandler} value={receptionistData.mobile} />
                        </label>
                        <br />
                        <label>
                            Enter the Adress :
                            <input type="text" name="address" onChange={onChangeHandler} value={receptionistData.address} />
                        </label>
                        <br />
                        <label>
                            Enter the Password :
                            <input type='password' name="password" onChange={onChangeHandler} value={receptionistData.password} />
                        </label><br />
                        <label>
                            Enter the Added By :
                            <input type="text" name="addedBy" onChange={onChangeHandler} value={receptionistData.addedBy} />
                        </label>
                        <br />
                        <button type="submit" onClick={onClickHandler}>Create A Recepoinist</button>
                    </form>
                </center>
            </div>
        </>

    )
}

export default CreateReceptionist