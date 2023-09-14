import React from "react";
import {
    ConnectWallet,
    useContract,
    useContractRead,
    useWallet,
    Web3Button,
    useAddress
  } from '@thirdweb-dev/react';
import r_abi from './recordsabi.json';
import { useNavigate } from "react-router-dom";

export const Login = (props) => {

    const address = "0x10E169701b033fE4F78C55c79C6519AeB4bB4909";

    const record_abi = r_abi.abi;

    const navigate = useNavigate();


    const {contract, isLoading: contractLoading} = useContract(

        address,
        record_abi,
    );

    console.log('contract: ',contract);

    const walletConnected = useWallet();

    console.log('wallet connected', walletConnected);

    const wallAdd = useAddress();

    console.log(wallAdd);

    const {data: isPatient, isLoading: patientLoad, error: patientErr} = useContractRead(
        contract, 
        "checkPatient",
        [],
        {
            from: wallAdd
        }
    );

    console.log('patient' , isPatient);

    const {data: isDoctor, isLoading: docLoad, error: docErr} = useContractRead(
        contract, 
        "checkDoc",
        [],
        {
            from: wallAdd
        }
    );

    console.log('doctor' , isDoctor);

    const clickedButton = async() => {


        console.log('inside clicked');

        try{

        if (walletConnected !== undefined){

            console.log('in the if block');

                        if (isPatient === true){
                            navigate("/patient");
                            
                            
                        } else if (isDoctor === true){
                            navigate("/docotr");
                            
                        } else {
                            navigate("/register");
                
        }
    }

        else {

            console.log('in the else block');

            <div>
            return <ConnectWallet />;
            </div>
        }
    }
    catch(err){
        console.log(err);
    }
}

    return (
        <div >
        <div>
            <h1  className="Message">Welcome to SecureMed !</h1>
        <div className="auth-form-container">
            <h2>Login</h2>
            <form className="login-form">
            <Web3Button
      contractAddress= {address} 
      contractAbi= {record_abi}
      action={() => clickedButton()}
    >
      Click Me
    </Web3Button>
            </form>
            
        </div>
        
        <button className="link-btn" onClick={() => navigate('/register')}>Don't have an account? Register here.</button>
        </div>
        </div>
    )
}