import React, { useState } from "react";
import './App.css';
import { Login } from "./login";
import { Register } from "./registration";
import NFT from "./components/nft";
import View from "./components/view";
import Access from "./components/access";
import Securemed from "./landingpage";
import Patient from "./patient";
import Doctor from "./Doctor";
import Upload from "./Upload";
import { Route, Routes } from "react-router-dom";
function App() {
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }
  
    return (
      <div className="App">
      <Routes>
        <Route path="/" element={<Securemed />} />
        <Route path="/login" element={<Login />} />
        <Route path="/patient" element={<Patient />} />
        <Route path="/doctor" element={<Doctor />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/register" element={<Register />} />
        <Route path="/nft" element={<NFT />} />
        <Route path="/view" element={<View />} />
        <Route path="/access" element={<Access />} />
      </Routes>
    </div>
      
    );
  
  

  
}

export default App;




