import React, { useState } from 'react'
import SearchBar from "./searchBar";
import Navbar from './Navbar';
import {
  useContractRead,
  useAddress,
  MediaRenderer
} from '@thirdweb-dev/react';
import useInst from './useinstance';

export function Doctor(){

  const [selectedPatient, setSelectPatient] = useState(undefined);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const contract = useInst();         //creating the contract instance

  console.log('contract', contract);

  const address = useAddress();

  const {data: patient_list} = useContractRead(
    contract,
    "patientsUnderDoctor",
    [address]
  )

  console.log('patient_list', patient_list);

  const {data: user_details} = useContractRead(
    contract,
    "getUserDetails",
  );

  const {data: record_list} = useContractRead(
    contract,
    "getDocuments",
    [selectedPatient],
    {
      from: address
    }
  )

  console.log('user_deets', user_details);

  
  

//////////////////////////////////////////////////////////////////////////////////////////////////////

  const getUser = async(arg) => {
    // user_details({
    //   args: [arg],
    // })
  }

/////////////////////////////////////////////////////////////////////////////////////////////////////

     const view = (pat_address) => {   //This function is used to view documents of a particular patient, after clicked

      console.log('inside view',pat_address);

      setSelectPatient(pat_address);

      console.log('patient', selectedPatient);

      if(selectedPatient !== null){
        return (
          <div>
            <ul>
              {record_list.map((url, index) => (
                  <MediaRenderer
                  src= {url}
                  alt= {url}
                />
              ))}
          </ul>
          </div>
        )
      }
     }

const handleRecordChange = (event) => {
  setSelectedRecord(event.target.value);
};

if(patient_list !== undefined && patient_list.length > 0 ){

  console.log('inside the if block');

    return (
      <div className='doc_block'><Navbar/>
      <div className = "SecondPage">
        Patient Records
      <SearchBar/>
      
      <div>
      <ul>
        {patient_list.map((user, index) => (
          <li key={index} onClick={() => view(user)} onChange={handleRecordChange}>
            {/* {getUser(address_pat)} */}
            {/* {user.name}, {user.age}, {user.mob_no} */}
            {/* {patient_list[index]} */}
            {user}
          </li>
        ))}
      </ul>
      </div>
      
      </div>
      </div>
    )
              }
              else{
                
                console.log('in the else block');      //Executes, when there are no patients under a doctor
                return (
                  <div className='doc_block'><Navbar/>
                  <div className = "SecondPage">
                    No Patient Records found
                  </div>
                  </div>
                )
              }
  
  
}


export default Doctor