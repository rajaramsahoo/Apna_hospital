import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
// import { Link } from 'react-router-dom'
// import DeanLogin from './Login/DeanLogin.jsx'
import Modal from 'react-modal';


function Home() {
    const [visible, setVisible] = useState(false)
    let navigate = useNavigate()
    const [userData, setUserData] = useState({
        patientName: '',
        gender: '',
        mobileNumber: "",
        address: '',
        email: '',
        aadhar: '',
        department: '',
        doctorName: '',
        appointmentTime: ''
    })


    function onChangeHandler(e) {
        console.log(e.target.value)
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })
    }




    async function onClickHandler(e) {
        try {
            e.preventDefault();
            // console.log(userData)
            const res = await axios.post("/api/patient", userData)
            console.log(res.data)

            alert("your appointment was booked")
            setUserData({
                patientName: '',
                gender: '',
                mobileNumber: "",
                address: '',
                email: '',
                aadhar: '',
                department: '',
                doctorName: '',
                appointmentTime: ''
            })

        }
        catch (err) {
            console.log(err)

        }
    }

    function visibleHandle(e) {
        e.preventDefault();
        setVisible(true)
    }

    const [deanData, setDeanData] = useState({
        email: "",
        password: ''
    })

    function onChangeHandlerDean(e) {
        console.log(e.target.value)
        setDeanData({
            ...deanData,
            [e.target.name]: e.target.value
        })
    }

    async function onClickHandlerDeanlogin(e) {
        try {
            e.preventDefault();
            console.log(deanData)
            if (!deanData.email.trim() || !deanData.password.trim()) {
                return window.alert("please pass Email and password")
            }
            const res = await axios.post("api/dean/login", deanData)
            console.log(res.data)
            localStorage.setItem("token", JSON.stringify({ token: res.data.token }))
            navigate('/dean/deandashboardpage')
        }
        catch (error) {
            console.log(error)
            let errorString = "";
            if (error.response.data.errors) {
                error.response.data.errors.forEach(element => {
                    errorString += `${element.msg}`
                    // showAlert({
                    //     type : "err",
                    //     msg: errorString
                    // })
                    window.alert(errorString)
                });
            }
            else {
                errorString = error.response.data.err;
                // showAlert({
                //   type: "error",
                //   msg: errorString
                // })
                window.alert(errorString)
            }

        }
    }

    //----------------------------------
    const [doctorData, setDoctorData] = useState({
        email: "",
        password: ''
    })

    function onChangeHandlerDoctor(e) {
        console.log(e.target.value)
        setDoctorData({
            ...doctorData,
            [e.target.name]: e.target.value
        })
    }


    async function onClickHandlerDoctorlogin(e) {
        try {
            e.preventDefault();
            console.log(deanData)
            if (!doctorData.email.trim() || !doctorData.password.trim()) {
                return window.alert("please pass Email and password")
            }
            const res = await axios.post("api/doctor/login", doctorData)
            console.log(res.data)
            localStorage.setItem("token", JSON.stringify({ token: res.data.token }))
            navigate('/doctor/doctordashboardpage')
        }
        catch (error) {
            console.log(error)
            let errorString = "";
            if (error.response.data.errors) {
                error.response.data.errors.forEach(element => {
                    errorString += `${element.msg}`
                    // showAlert({
                    //     type : "err",
                    //     msg: errorString
                    // })
                    window.alert(errorString)
                });
            }
            else {
                errorString = error.response.data.err;
                // showAlert({
                //   type: "error",
                //   msg: errorString
                // })
                window.alert(errorString)
            }

        }
    }
    //---------------------==========--------

    const [receptionistData, setReceptionistData] = useState({
        email: "",
        password: ''
    })

    function onChangeHandlerReceptionist(e) {
        console.log(e.target.value)
        setReceptionistData({
            ...receptionistData,
            [e.target.name]: e.target.value
        })
    }


    async function onClickHandlerReceptionistlogin(e) {
        try {
            e.preventDefault();
            console.log(deanData)
            if (!receptionistData.email.trim() || !receptionistData.password.trim()) {
                return window.alert("please pass Email and password")
            }
            const res = await axios.post("api/receptionist/login", receptionistData)
            console.log(res.data)
            localStorage.setItem("token", JSON.stringify({ token: res.data.token }))
            navigate('/receptionisr/receptionistdashboard')
        }
        catch (error) {
            console.log(error)
            let errorString = "";
            if (error.response.data.errors) {
                error.response.data.errors.forEach(element => {
                    errorString += `${element.msg}`
                    // showAlert({
                    //     type : "err",
                    //     msg: errorString
                    // })
                    window.alert(errorString)
                });
            }
            else {
                errorString = error.response.data.err;
                // showAlert({
                //   type: "error",
                //   msg: errorString
                // })
                window.alert(errorString)
            }

        }
    }




    return (
        <div className='home-page'>
            <div className='home-navbar'>
                <div className='animation'>
                    <div className='animation-line'><p>
                        AMRI Hospitals representatives do not seek any advance payment over the phone/email for doctor appointments or any medical services. If you receive any such call, SMS or email, please report it immediately by calling 033-66800000
                    </p>
                    </div>

                </div>
                <div className='logobar'>
                    <div>                    <img className='hospital-logo' src='hospital.png' />
                    </div>
                    <div className='dropup'>
                        <button className='dropbtn'>How can i help you</button>
                        <div className='dropup-content'>
                            <a href="#">Link 1</a>
                            <a href="#">Link 2</a>
                            <a href="#">Link 3</a>
                        </div>
                    </div>
                    <div> <ul>
                        <li>About Hospital</li>
                        <li>Carrer</li>
                    </ul></div>
                    <input placeholder='sreach' />
                </div>
            </div>
            <div className='homepage-body'>
                <div className='patientBooking'>
                    <h3 style={{ color: "black", textAlign: "center", }}>BOOK AN APPOINTMENT</h3><form>
                        <label>
                            Enter the Patient Name:
                            <input type="text" name="patientName" onChange={onChangeHandler} value={userData.patientName} />
                        </label>
                        <br />
                        <label>
                            Gender :
                            <input type="text" name="gender" onChange={onChangeHandler} value={userData.gender} />
                        </label>

                        <br />
                        <label>
                            Enter the Mobile Number   :
                            <input type="text" name="mobileNumber" onChange={onChangeHandler} value={userData.mobileNumber} />
                        </label>
                        <br />
                        <label>
                            Enter the Adress :
                            <input type="text" name="address" onChange={onChangeHandler} value={userData.address} />
                        </label>
                        <br />
                        <label>
                            Enter the Email :
                            <input type="text" name="email" onChange={onChangeHandler} value={userData.email} />
                        </label><br />
                        <label>
                            Enter the Aadhar :
                            <input type="Number" name="aadhar" onChange={onChangeHandler} value={userData.aadhar} />
                        </label><br />
                        <label>
                            Enter the DEPT :
                            <input type="text" name="department" onChange={onChangeHandler} value={userData.department} />
                        </label><br />
                        <label>
                            Enter the Dr. Name :
                            <input type="text" name="doctorName" onChange={onChangeHandler} value={userData.doctorName} />
                        </label><br />
                        <label>
                            Enter the Appiontment Date :
                            <input type="datetime-local" name="appointmentTime" onChange={onChangeHandler} value={userData.appointmentTime} />
                        </label>
                        <br />
                        <button type="submit" onClick={onClickHandler}>Book an appointment</button>
                    </form>
                </div>
                <div className='logIn'>
                    <div>
                        <button onClick={visibleHandle}>Dean Login</button>
                        <Modal isOpen={visible} onRequestClose={() => setVisible(false)} style={{
                            content: {
                                top: '50%',
                                left: '50%',
                                right: 'auto',
                                bottom: 'auto',
                                marginRight: '-50%',
                                transform: 'translate(-50%, -50%)',
                                backgroundColor: 'aqua'
                            }
                        }}>
                            <center>
                                <h1>Dean Log in</h1>
                                <button onClick={() => setVisible(false)}>❌</button>
                                <div >
                                    <form>
                                        <label>
                                            <b> Enter the Email</b> :
                                            <input type="text" name="email" onChange={onChangeHandlerDean} />
                                        </label>
                                        <br />
                                        <label>
                                            <b>Enter the possword</b> :
                                            <input type="password" name="password" onChange={onChangeHandlerDean} />
                                        </label>
                                        <button type="submit" onClick={onClickHandlerDeanlogin}>Log In</button>
                                    </form>
                                </div>
                            </center>
                        </Modal>
                    </div>
                    <div>
                        <button onClick={visibleHandle}>Doctor Login</button>
                        <Modal isOpen={visible} onRequestClose={() => setVisible(false)} style={{
                            content: {
                                top: '50%',
                                left: '50%',
                                right: 'auto',
                                bottom: 'auto',
                                marginRight: '-50%',
                                transform: 'translate(-50%, -50%)',
                                backgroundColor: 'aqua'
                            },
                        }}>
                            <center>
                                <h1>Doctor Login</h1>
                                <button onClick={() => setVisible(false)}>❌</button>
                                <div>
                                    <form>
                                        <label>
                                            <b> Enter the Email</b> :
                                            <input type="text" name="email" onChange={onChangeHandlerDoctor} />
                                        </label>
                                        <br />
                                        <label>
                                            <b>Enter the possword</b> :
                                            <input type="password" name="password" onChange={onChangeHandlerDoctor} />
                                        </label>
                                        <button type="submit" onClick={onClickHandlerDoctorlogin}>Log In</button>
                                    </form>
                                </div>
                            </center>
                        </Modal>
                    </div>
                    <div>
                        <button onClick={visibleHandle}>Receptionist Login</button>
                        <Modal isOpen={visible} onRequestClose={() => setVisible(false)} style={{
                            content: {
                                top: '50%',
                                left: '50%',
                                right: 'auto',
                                bottom: 'auto',
                                marginRight: '-50%',
                                transform: 'translate(-50%, -50%)',
                                backgroundColor: 'aqua'
                            },
                        }}>
                            <center>
                                <h1>Receptionist Login</h1>
                                <button onClick={() => setVisible(false)}>❌</button>
                                <div>
                                    <form>
                                        <label>
                                            <b> Enter the Email</b> :
                                            <input type="text" name="email" onChange={onChangeHandlerReceptionist} />
                                        </label>
                                        <br />
                                        <label>
                                            <b>Enter the possword</b> :
                                            <input type="password" name="password" onChange={onChangeHandlerReceptionist} />
                                        </label>
                                        <button type="submit" onClick={onClickHandlerReceptionistlogin}>Log In</button>
                                    </form>
                                </div>
                            </center>
                        </Modal>
                    </div>
                </div>
            </div>
            <div>Footer</div>
        </div>
    )
}

export default Home
