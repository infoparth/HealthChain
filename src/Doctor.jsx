import React, { useState } from 'react'
import SearchBar from "./searchBar";
import Navbar from './Navbar';
import {
  useContractRead,
  useAddress,
  MediaRenderer
} from '@thirdweb-dev/react';
import useInst from './useinstance';

function ChildComponent({ input }) {

  console.log('input', input[0]);
  console.log('input', input[1]);
  

  const contract = input[1];

  console.log('contract_child', contract);

  const address = useAddress();

  const wallAdd = input[0];

  console.log('address', address);
  // Use the useContractRead hook with the provided inputs
  const {data: record_list} = useContractRead(
    contract,
     "getDocuments",
     [wallAdd]
     );

  console.log('docs', record_list);
  if(record_list !== undefined){
  // Render the contract data or any other content
  return (
    <div>
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
    </div>
  );
}
else{
  return(
    <div>
      <h3>No Records found</h3>
    </div>
  )
}
}

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

     const view = async(pat_address) => {   //This function is used to view documents of a particular patient, after clicked

      setSelectPatient(pat_address)
      
     }

    // const view = async() => {
    //   setSelectedRecord(mutateAsync({args: [selectedPatient], }))
    // }
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
            {user}
          </li>
        ))}
      </ul>
      </div>
      {selectedPatient !== undefined && (
        <ChildComponent input={[selectedPatient, contract]} />
      )}
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