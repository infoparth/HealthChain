
import { useStorageUpload,
useContractWrite,
useAddress,
MediaRenderer
 } from "@thirdweb-dev/react";

 import useInst from "./useinstance";

import { useState } from "react";
import { Navigate } from "react-router-dom";

const Upload = () =>{

	const [file, setFile] = useState(null);
	const [URI, setURI] = useState(null);

	const contract = useInst();

	console.log('contract: ',contract);

	const address = useAddress();

	const { mutateAsync: fileUpload} = useContractWrite(
		contract, "addDocument");

	const { mutateAsync: upload } = useStorageUpload();

	 const uploadToIPFS = async() =>{

		if (file !== null) {

		const response = await upload({
			data: [file],
			options: {
				uploadWithGatewayUrl: true,
				uploadWithoutDirectory: true
			}

		});

		

		console.log('CID ??: ', response[0]);

		setURI(response[0])

		console.log('The actual URL/URI',response[0]);

		console.log('Testing URI', URI);

		try{

		const isSuccess = fileUpload({
			args: [response[0]]
		});

		console.log(isSuccess);

		Navigate('/patient');
	}
	catch (error){
		console.log('error is', error);
	}

	scrollToBottom();
}

else{
	alert("Please select a file to upload");
}


	}

	const scrollToBottom = () => {
		window.scrollTo({
		  top: document.documentElement.scrollHeight,
		  behavior: 'smooth',
		});
	  };

	// File content to be displayed after
	// file upload is complete
	const fileData = () => {

		if (file !== null) {

			return (
				<div>
					<h2>File Details:</h2>
					<p>File Name: {file.name}</p>

					<p>File Type: {file.type}</p>

					<p>
						Last Modified:{" "}
						{file.lastModifiedDate.toDateString()}
					</p>
					<p>
						File URI: {URI}
					</p>
					<MediaRenderer
                  src= {URI}
                  alt= {URI}
                />


				</div>
			);
		} else {
			return (
				<div></div>
			);
		}
	};


		return (
			<div className ="Firstpage">
				<h3>
					Choose file to upload
				</h3>
				<div>
					<input type="file" onChange={(e) => {
						if(e.target.files){
							setFile(e.target.files[0])
						}
					}} />
					<button onClick={uploadToIPFS} >
						Upload
					</button>
				</div>
				{fileData()}
			</div>
		);
}

export default Upload;
