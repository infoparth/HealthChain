import { useState, useEffect} from "react";
import r_abi from './recordsabi.json';
import { useContract } from "@thirdweb-dev/react";


 const useInst = () => {

    const [contract_is, setContract_is] = useState(undefined);

    const address = "0x10E169701b033fE4F78C55c79C6519AeB4bB4909";
    const record_abi = r_abi.abi;

    const {contract, isLoading: contractLoading} = useContract(

      address,
      record_abi,
  );

    

    useEffect(() => {
    try {
        setContract_is(contract);
      if (!contract_is) {
        throw new Error("Failed to create contract instance.");
      }

      console.log("Contract instance created:",contract_is);

    //   setContract_is(contract);


      
    } catch (error) {
      console.error("Error creating contract instance:", error);
    }
    
}, []);

return contract_is;

  };

  export default useInst;