import React  from 'react';
import './Navbar.css';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import useInst from "./useinstance";
import { 
  useContractRead,
  useContractWrite,
  MediaRenderer,
  useAddress
} from '@thirdweb-dev/react';
import { useState } from 'react';
  
function Patient () {

  const navigate = useNavigate();

  return (
    <div className='theFirstPage'><Navbar/>
    <div className = "Firstpage">What would you like to do?
      <div><button onClick={() => navigate('/upload')}> Upload Documents </button>{'      '}
      <button onClick={() => navigate('/view')}> View Documents </button><br/>
      <button onClick={() => navigate('/access')}> Access Management </button>{'    '}
      <button onClick={() => navigate('/nft')}>NFT Monetization</button><br/>
      <button> Get lifestyle recommendations </button></div>
    </div>
    </div>
    

  )
}
export default Patient
