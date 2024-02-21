import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'




function CreatePatient() {

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

          alert("Patient Appointmnet was scheduled")
          navigate('/dean/deandashboardpage')

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


  return (
    <>
      <form>
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

    </>
  )
}

export default CreatePatient