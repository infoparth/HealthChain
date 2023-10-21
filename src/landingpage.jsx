import React from "react";
import { useNavigate } from "react-router-dom";

import logo from "./image/securemed.png";

export const Securemed = () => {
  //contract_address = 0x10E169701b033fE4F78C55c79C6519AeB4bB4909

  const navigate = useNavigate();

  return (
    <div className="Firstpage">
      <div>
        <h2>Welcome To Securemed!</h2>
        <br />
      </div>
      <div>
        <img className="image" src={logo} alt="Logo"></img>
      </div>
      <h4>
        A Blockchain-Enabled Medical Records Manager with AI-Powered Insights
        and NFT Monetization
      </h4>
      <button className="loginButton" onClick={() => navigate("/login")}>
        Click to Login
      </button>
    </div>
  );
};

export default Securemed;
