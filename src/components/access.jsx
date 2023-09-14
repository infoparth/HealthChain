import React  from 'react';
import '../Navbar.css';
import { useNavigate } from 'react-router-dom';
import useInst from "../useinstance";
import { 
  useContractRead,
  useContractWrite,
  MediaRenderer,
  useAddress
} from '@thirdweb-dev/react';
import { useState } from 'react';
import Navbar from '../Navbar';

export default function Access() {

    const contract = useInst();

  console.log('contract', contract);

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [newDoctorAddress, setNewDoctorAddress] = useState('');

  const wallAdd = useAddress();

     const {data: doctor_list} = useContractRead(
      contract,
       "patient_has_doctors",
       [],
     {
         from: wallAdd
     }
       );

       const {mutateAsync: add_doc} = useContractWrite(
        contract,
        "grantAccess"
    );

    const {mutateAsync: revoked} = useContractWrite(
      
      contract,
      "revokeAccess",
  
    );
    

    const handleAddDoctor = async () => {

        add_doc({
          args: [newDoctorAddress]
        });
      }

  const handleAddressChange = (event) => {
    setSelectedAddress(event.target.value);
};

  const handleWriteData = async () => {
    const confirmed = window.confirm('Are you sure you want to revoke access ?');
    if(confirmed){
  revoked({
    args: [selectedAddress]
  });
  }

else{
  console.log('Revoke Cancelled');
}
  }

  if(contract !== undefined && doctor_list !== undefined){

    return (
      <div className='theAccessPage'><Navbar/>
        <div className='AccessPage'>
            <div>
          <h4>The Addresses</h4>
          <select value={selectedAddress} onChange={handleAddressChange}>
              <option value="">Select an address</option>
              {doctor_list.map((address, index) => (
                  <option key={index} value={address}>
                      {address}
                  </option>
              ))}
          </select>
          <button onClick={handleWriteData}>Revoke Access</button>
      </div>
      <div>
        <h4>Add a Doctor</h4>
        <input
          type="text"
          placeholder="Enter doctor's wallet address"
          value={newDoctorAddress}
          onChange={(e) => setNewDoctorAddress(e.target.value)}
        />
        <button onClick={handleAddDoctor}>Add Doctor</button>
      </div>
      </div>
      </div>
      
  );
              }
              else{
                return (
                  <div className='theAccessPage'><Navbar/>
                  <div className='AccessPage'>
        <h4>Add a Doctor</h4>
        <input
          type="text"
          placeholder="Enter doctor's wallet address"
          value={newDoctorAddress}
          onChange={(e) => setNewDoctorAddress(e.target.value)}
        />
        <button onClick={handleAddDoctor}>Add Doctor</button>
      </div>
      </div>
                );
              }
              }
  