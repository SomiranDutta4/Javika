import React, { useContext, useEffect, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import axios from "axios"
// import CheckIcon from '@mui/icons-material/Check';
// import { Alert } from '@mui/material'
import { StoreContext } from '../../context/StoreContext';

const LoginPopup = ({ }) => {

    const { url, setAuth, setFarmer } = useContext(StoreContext)


    const [currState, setCurrState] = useState("Login")
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        farmerId: "",
        panNumber: "",
        aadhaar: "",
        location: "",
    })

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }))
    }


    const onLogin = async (event) => {
        event.preventDefault()
        let newUrl = url
        if (currState === "Login") {
            newUrl += "/api/farmer/login"
        } else {
            newUrl += '/api/farmer/signUp'
        }

        const response = await axios.post(newUrl, data);

        if (response.data.success||response.status===200) {
            localStorage.setItem("farmer",JSON.stringify(response.data.farmer))
            setFarmer(response.data.farmer)
            setAuth(true)
            // setToken(response.data.token);
            // localStorage.setItem("token", response.data.token)
            // setShowLogin(false)
        }
        else {
            alert(response.data.message)
        }
    }

    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    {/* <img onClick={backBtn} src={assets.cross_icon} alt="" /> */}
                </div>
                <div className="login-popup-inputs">
                    {currState === "Login" ? <></> : <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' required />}
                    <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email' required />
                    <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required />

                    {currState === "Sign Up" &&
                        <>
                            <input name='panNumber' onChange={onChangeHandler} value={data.panNumber} type="number" placeholder='Your PAN Card number' required></input>
                            <input name='aadhaar' onChange={onChangeHandler} value={data.aadhaar} type="number" placeholder='Your aadhaar No.' required></input>
                            <input name='location' onChange={onChangeHandler} value={data.location} type="text" placeholder='Your exact Adress' required></input>
                        </>
                    }
                    {currState === 'Login' &&
                        <>
                            <input name='farmerId' onChange={onChangeHandler} value={data.farmerId} type="text" placeholder='Your ID here' required></input>
                        </>
                    }
                    <button type='submit'>Submit</button>

                </div>
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p className='continuee'>By continuing, i agree to the terms of use & privacy policy</p>
                </div>
                {currState === 'Login' ? <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p>
                    : <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>

                }
            </form>
        </div>
    )
}

export default LoginPopup