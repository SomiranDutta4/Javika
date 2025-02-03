import React, { useContext, useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import { Routes, Route } from 'react-router-dom'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Orders from './pages/Orders/Orders'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { StoreContext } from './context/StoreContext'
import LoginPopup from './pages/Login/LoginPopup'
import { useEffect } from 'react'
import Analytics from './pages/Analytics/Analytics'

const App = () => {
  const { isAuth, setFarmer, setAuth } = useContext(StoreContext)
  const [isAnal, setANaly] = useState(false)

  const url = "http://localhost:4000"
  useEffect(() => {
    let newFarmer = JSON.parse(localStorage.getItem("farmer"))
    setFarmer(newFarmer)
    if (newFarmer && newFarmer._id) {
      setAuth(true)
    }

  }, [])

  if (isAuth) {
    return (
      <div>
        <ToastContainer />
        <Navbar isAnal={setANaly} setANaly={setANaly} />
        <hr />
        <div className="app-content">
          {/* {!isAnal && */}
            <Sidebar isAnal={setANaly} setANaly={setANaly}/>
          {/* } */}
          <Routes>
            <Route path="/add" element={<Add url={url} />} />
            <Route path="/list" element={<List url={url} />} />
            <Route path="/orders" element={<Orders url={url} />} />
            <Route path='/analytics' element={<Analytics></Analytics>}></Route>
          </Routes>
        </div>
      </div>
    )
  } else {
    return (
      <div>
        <LoginPopup></LoginPopup>
      </div>
    )
  }
}

export default App