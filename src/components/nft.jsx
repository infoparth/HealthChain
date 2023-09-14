import {
    useContractWrite,
    useContractRead,
    useAddress,
    MediaRenderer,
    useStorageUpload
} from '@thirdweb-dev/react';
import { useState } from 'react';
import '../Navbar.css';
import Navbar from '../Navbar';
import useInst from '../useinstance';

export default function NFT (){

    const [selectedRecord, setSelectedRecord] = useState(undefined); //TELLS WHICH FILE IS SELECTED
    const [mintAddress, setMintAddress] = useState(undefined);  ///THE MINT ADDRESS
    const [useLoggedInAddress, setUseLoggedInAddress] = useState(false); //SAME AS ABOVE
    const [cid, setCID] = useState(undefined); //THE FINAL CID OF THE METADATA FILE

/////////////////////////////////////////////////////////////////////////////////////////////////////////

    const contract = useInst();

    // console.log('contract', contract);

    const address = useAddress();

    const {data: record_list} = useContractRead(
        contract, 
        "getDocuments",
        [address],
        );

        const {mutateAsync: turn} = useContractWrite(
            contract, 
            "safeMint",
        );

        const { mutateAsync: upload } = useStorageUpload();
        
////////////////////////////////////////////////////////////////////////////////////////////////////////////

//ACTUAL FUCNTION TO TURN NFT

const handleWriteData = async () => {

  const _cid = extractCIDFromIPFSUrl(selectedRecord);

  setCID("ipfs://", _cid);  //image cid

          //SET NFT METADATA

    const nftMetadata = {
      name: "Medical Records",
      description: "This NFT denotes your medical records",
      image: `ipfs://${_cid}` // Replace with the actual IPFS CID of your NFT image
    };

    const metadataJSON = JSON.stringify(nftMetadata);

    const metadataURI = await uploadMetadataToIPFS(metadataJSON);  //uploading to ipfs

    const confirmed = window.confirm("Are you sure you want to turn it into NFT?");

    if (confirmed) {

        turn({
            args: [mintAddress, metadataURI]
        });   

        console.log('confirmed');
}

else{

    console.log("Not confirmed");
}
}

//THE ACTUAL FUNCTION 

const uploadMetadataToIPFS = async (metadataJSON) => {

    const result = await upload({
      data: [metadataJSON],
      options: {
				uploadWithGatewayUrl: false,
				uploadWithoutDirectory: true
			}
    });

    console.log('in the upload function: ', result[0]);

    return result[0];
}

function extractCIDFromIPFSUrl(ipfsUrl) {
  // Define a regular expression pattern to match CID in IPFS URLs
  const cidPattern = /\/(ipfs|ipns)\/([a-zA-Z0-9]+)/;
  
  // Use match() to find the CID in the URL
  const match = ipfsUrl.match(cidPattern);
  
  if (match && match[2]) {
    // match[2] contains the CID
    return match[2];
  } else {
    // If no CID is found, return null or handle the error accordingly
    return null;
  }
  }


//REMAINING FUCNCTIONS


const handleDocumentClick = (url) => {
    setSelectedRecord(url);
  };

  const handleRecordChange = (event) => {
    setSelectedRecord(event.target.value);
};

if( record_list !== undefined && record_list.length > 0) {


    return (
        <div className='theNFTPage'><Navbar />
        <div className='NFTPage'>
          
      <h4>List of your records</h4>
      <div>
      <ul>
        {record_list.map((url, index) => (
          <li key={index} onClick={() => handleDocumentClick(url)} onChange={handleRecordChange}>
            <MediaRenderer src={url} alt={url} />
          </li>
        ))}
      </ul>
      </div>
      <div className='theURLblock'>
      <p >Selected URL: {selectedRecord}</p>
    
          
      <label >
        Mint NFT to Wallet Address:
        <input
          type="text"
          value={mintAddress}
          onChange={(e) => setMintAddress(e.target.value)}
        />
      </label><br/>
      <label>
        <input
          type="checkbox"
          checked= {useLoggedInAddress}
          onChange={() => {
            setUseLoggedInAddress(!useLoggedInAddress);
            if (!useLoggedInAddress) {
              setMintAddress(address); // Set mintAddress to logged-in address
            } else {
              setMintAddress(''); // Clear mintAddress when unchecking
            }
          }}
        />
        Use the same address as login
      </label>
    </div>
          <button onClick={handleWriteData}>Turn into NFT</button>
      </div>
      </div>
    )
        }
        else {

            return (
              <div className='theNFTPage'>
                <Navbar/>
                <div className='NFTpage'>
                  
                  <h4>No Documents</h4>
                  </div>
              </div>
            );

            
          }




}


// export default NFT;