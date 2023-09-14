import React, { useState } from 'react'
import SearchBar from "./searchBar";
import Navbar from './Navbar';
import AddDeleteTableRows from "./AddDeleteTableRows";
import {
  useContractRead,
  useAddress,
  MediaRenderer
} from '@thirdweb-dev/react';
import useInst from './useinstance';

export function Doctor(){

  const [selectedPatient, setSelectPatient] = useState(undefined);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const contract = useInst();

  console.log('contract', contract);

  const address = useAddress();

  const {data: patient_list} = useContractRead(
    contract,
    "patientsUnderDoctor",
    [address]
  )

  const {data: user_details} = useContractRead(
    contract,
    "getUserDetails",
  );

  const getUser = async(arg) => {
    user_details({
      args: [arg],
    })
  }

  const {data: record_list, isLoading, error} = useContractRead(
    contract,
     "getDocuments",
     [address],
     );

     const view = (pat_address) => {

      setSelectPatient(pat_address);

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

if(patient_list !== undefined && patient_list.length === 0 ){

    return (
      <div className='doc_block'><Navbar/>
      <div className = "SecondPage">
        Patient Records
      <SearchBar/>
      
      <div>
      <ul>
        {record_list.map((address_pat, index) => (
          <li key={index} onClick={() => view(address_pat)} onChange={handleRecordChange}>
            {getUser(address_pat)}
          </li>
        ))}
      </ul>
      </div>
      
      </div>
      </div>
    )
              }
              else{
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