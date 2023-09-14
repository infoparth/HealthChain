import React from 'react';
import './Navbar.css';
import logos from './image/logo.png'
import { Navigate, useNavigate } from 'react-router-dom';
import { useDisconnect } from "@thirdweb-dev/react";
function Navbar() {

  const navigate = useNavigate();

  const disconnect = useDisconnect();

  const handleLogout = () => {
    navigate('/login');
    disconnect();
  }


  return (
    <div className = "Navbar">
    <div className = "Navbar-logo">
        <img className = "logonav" src ={logos} alt ="logo"></img>SecureMed</div>
    <ul className = "Navbar-menu">
        <li onClick={() => navigate('/')}><a>HOME</a></li>
        <li onClick= {handleLogout}><a>LOGOUT</a></li>
    </ul>
    
    </div>
  )
}

export default Navbar;