import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
    useContractWrite,
    useAddress
} from '@thirdweb-dev/react'
import r_abi from './recordsabi.json';
import useInst from "./useinstance";

export const Register = (props) => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [mobno, setMobno] = useState('');
    const [registerAs, setRegisterAs] = useState('');

    const contraddress = "0x10E169701b033fE4F78C55c79C6519AeB4bB4909";

    const record_abi = r_abi.abi;

    const navigate = useNavigate();

    const contract = useInst();

    console.log('contract', contract);

    const curr_addr = useAddress();
    console.log('addr = ', curr_addr);

    const { mutateAsync: docAdd} = useContractWrite(contract, "addDoc");
    const { mutateAsync: patientAdd} = useContractWrite(contract, "addPatient");


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(registerAs);
        
        try {

        if (registerAs === 'doctor'){
            docAdd({
                args: [name, age, mobno],
              })

              navigate('/doctor');
        }
        else if (registerAs === 'patient'){
            patientAdd({
                args: [name, age, mobno],
              })
              
              navigate('/patient');
        }
    }
    catch(err){
        console.log(err.message);
    }

    }

    return (
        <div className="auth-form-container">
            <h2>Register</h2>
        <form className="register-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Full Name</label>
            <input value={name} name="name" onChange={(e) => setName(e.target.value)} id="name" placeholder="Full Name" />
            <label htmlFor="age">Age</label>
            <input value={age} age="age" onChange={(e) => setAge(e.target.value)} id="age" placeholder="age" />
            <label htmlFor="mobno">Mobile Number</label>
            <input value={mobno} mobno="mobno" onChange={(e) => setMobno(e.target.value)} id="mobno" placeholder="+91XXXXXXXXXX" />
            <label>Register As: <select name="Options" onChange={(e) => setRegisterAs(e.target.value)}>
        <option value="doctor">Doctor</option>
        <option value="patient">Patient</option>
      </select>
                </label>
                <br />
            <button type="submit">Submit Details</button>
        </form>
        <button className="link-btn" onClick={() => navigate('/login')}>Already have an account? Login here.</button>
    </div>
    )
}