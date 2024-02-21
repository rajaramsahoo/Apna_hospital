import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"



function DeanLogin({ alert, showAlert }) {
    let navigate = useNavigate()
    const [userData, setUserData] = useState({
        email: "",
        password: ''
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
            console.log(userData)
            if (!userData.email.trim() || !userData.password.trim()) {
                return window.alert("please pass Email and password")
            }
            const res = await axios.post("api/dean/login", userData)
            console.log(res.data)
            localStorage.setItem("token", JSON.stringify({ token: res.data.token }))
            navigate('/Deanloginpage')
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
        <>
            {userData.email}
            {userData.password}
         
             
                    <center>
                        <h1>Dean Log in</h1>
                        <div className="container">
                            <form>
                                <label>
                                    <b> Enter the Email</b> :
                                    <input type="text" name="email" onChange={onChangeHandler} />
                                </label>
                                <br />
                                <label>
                                    <b>Enter the possword</b> :
                                    <input type="password" name="password" onChange={onChangeHandler} />
                                </label>
                                <button type="submit" onClick={onClickHandler}>Log In</button>
                            </form>
                        </div>
                    </center>
               
            

        </>
    )
}

export default DeanLogin