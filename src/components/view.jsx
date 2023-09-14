import { 
    useContractRead,
    MediaRenderer,
    useAddress
  } from '@thirdweb-dev/react';
  import Navbar from '../Navbar';
  import useInst from '../useinstance'

export default function View(){

    const contract = useInst();

    const wallAdd = useAddress();

    const {data: document_list, isLoading, error} = useContractRead(
        contract,
         "getDocuments",
         [wallAdd]
         );

    

    // scrollToBottom();

    if( document_list !== undefined && document_list.length > 0) {

    return (
      <div className='theViewPage'> <Navbar/>
      <div className='ViewPage'>
          <h4>List of your records</h4>
          <ul>
              {document_list.map((url, index) => (
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
              else {

                return (
                    <div className='theViewPage'> <Navbar/>
                  <div className='ViewPage'>
                      <h4>No Documents</h4>
                  </div>
                  </div>
                );

                
              }
  }