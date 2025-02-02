import React, { useContext, useEffect, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from "axios"
import CheckIcon from '@mui/icons-material/Check';
import { Alert } from '@mui/material'

const LoginPopup = ({ setShowLogin, showLoginSeller, setShowLoginSeller }) => {

  const { url, setToken,setUser } = useContext(StoreContext)


  const [currState, setCurrState] = useState("Login")
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    sellerId: "",
    PIN: "",
    PAN: "",
    ADHAAR: "",
    SellerLicense: "",
    Location: "",
    DriversLicense: ""
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }))
  }


  const onLogin = async (event) => {
    event.preventDefault()
    let newUrl = url;

    if (currState === 'Seller Sign-Up') {
      setShowLoginSeller(false);
      return (
        <Alert icon={<CheckIcon fontSize='inherit' />} severity="success">
          Your request will be processed within 2-3 business days
        </Alert>
      )
    }

    if (currState === "Login") {
      newUrl += "/api/user/login"
    }
    else if (currState === "Sign Up") {
      newUrl += "/api/user/register"
    } else if (currState === "Seller") {
      newUrl += "/api/seller/login"
    }

    const response = await axios.post(newUrl, data);

    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token)
      setShowLogin(false)
      localStorage.setItem('user',JSON.stringify(response.data.user))
      setUser(response.data.user)
    }
    else {
      alert(response.data.message)
    }

  }
  const backBtn = () => {
    setShowLogin(false)
    setShowLoginSeller(false);
  }


  useEffect(() => {
    if (showLoginSeller) {
      setCurrState("Seller Sign-Up")
    }
  }, [])



  //   <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
  //   Here is a gentle confirmation that your action was successful.
  // </Alert>

  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={backBtn} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
          {currState === "Login" ? <></> : <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' required />}
          <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email' required />
          <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required />
          {currState === "Seller" &&
            <>
              <input name='sellerId' onChange={onChangeHandler} value={data.sellerId} type="text" placeholder='Your Seller ID' required></input>
              <input name='PIN' onChange={onChangeHandler} value={data.PIN} type="number" placeholder='Your Seller PIN' required></input>
            </>
          }
          {currState === "Seller Sign-Up" &&
            <>
              <input name='PAN' onChange={onChangeHandler} value={data.PAN} type="number" placeholder='Your PAN Card number' required></input>
              <input name='ADHAAR' onChange={onChangeHandler} value={data.ADHAAR} type="number" placeholder='Your ADHAAR No.' required></input>
              <input name='SellerLicense' onChange={onChangeHandler} value={data.SellerLicense} type="text" placeholder='Your SellerLicense' required></input>
              <input name='Location' onChange={onChangeHandler} value={data.Location} type="text" placeholder='Your exact Adress' required></input>
            </>
          }
        </div>
        {currState !== "Seller Sign-Up" &&
          <button type='submit'>{currState === "Sign Up" ? "Create account" : "Login"}</button>
        }
        {currState === "Seller Sign-Up" &&
          <button type='submit'>Submit</button>
        }
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p className='continuee'>By continuing, i agree to the terms of use & privacy policy</p>
        </div>
        {currState === "Sign Up" &&
          <>
            <p>Already have an Account? <span onClick={() => setCurrState("Login")}>Click here</span></p>
            <p>Login as Seller? <span onClick={() => setCurrState("Seller")}>Click here</span></p>

          </>
          // : <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>
        }
        {currState === "Login" &&
          <>
            <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p>
            <p>Login as Seller? <span onClick={() => setCurrState("Seller")}>Click here</span></p>

          </>
          // : <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>
        }
        {currState === "Seller" &&
          <> <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p>
            <p>Login as Buyer? <span onClick={() => setCurrState("Login")}>Click here</span></p>
          </>

        }
      </form>
    </div>
  )
}

export default LoginPopup