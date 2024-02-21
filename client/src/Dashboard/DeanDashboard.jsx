import React from 'react'
import { useNavigate } from 'react-router-dom'

function DeanDashboard() {
  let navigate = useNavigate()


  function onChangeHandler1(e) {
    e.preventDefault();
    const selectedValue = e.target.value;
    if (selectedValue === "View all doctor") {
      navigate("/dean/alldoctor");
    }
    if (selectedValue === "CreateCreate doctor") {
      navigate("/dean/createdoctor");
    }
    if (selectedValue === "View all Receptionist") {
      navigate("/dean/allreceptionist");
    }
    if (selectedValue === "Create Receptionist") {
      navigate("/dean/createreceptionist");
    }
    if (selectedValue === "View all Patient") {
      navigate("/allpatients");
    }
    if (selectedValue === "Create A Patient") {
      navigate("/createpatient");
    }
  }

  return (
    <>
      <h1>Dean Dashboard</h1>
      <div>
        <div>
          <h3>View Doctor Data</h3>
          <select onChange={onChangeHandler1}>
            <option>select</option>
            <option value="View all doctor">View all doctor</option>
            <option >Search a doctor</option>
            <option value="CreateCreate doctor">CreateCreate doctor</option>
          </select>
        </div>
        <div>
          <h3>View Receptionist Data</h3>
          <select onChange={onChangeHandler1}>
            <option>select</option>
            <option value="View all Receptionist">View all Receptionist</option>
            <option>Search a Receptionist</option>
            <option value="Create Receptionist"> Create Receptionist</option>
          </select>
        </div>
        <div>
          <h3>View Patient Data</h3>
          <select onChange={onChangeHandler1}>
            <option>select</option>
            <option value="View all Patient">View all Patient</option>
            <option>Search a Patient</option>
            <option value="Create A Patient">Create A Patient</option>
          </select>
        </div>
      </div>
    </>
  )
}

export default DeanDashboard