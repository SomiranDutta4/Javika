import React, { useContext } from 'react'
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

const App = () => {
  const { isAuth } = useContext(StoreContext)

  const url = "http://localhost:4000"

  if (isAuth) {
    return (
      <div>
        <ToastContainer />
        <Navbar />
        <hr />
        <div className="app-content">
          <Sidebar />
          <Routes>
            <Route path="/add" element={<Add url={url} />} />
            <Route path="/list" element={<List url={url} />} />
            <Route path="/orders" element={<Orders url={url} />} />
          </Routes>
        </div>
      </div>
    )
  }else{
    return(
      <div>
        <LoginPopup></LoginPopup>
      </div>
    )
  }
}

export default App