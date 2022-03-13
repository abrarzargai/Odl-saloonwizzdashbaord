import { Divider, message } from 'antd';
import { useEffect, useState } from 'react';
import { DisplayUtilitiesApi } from "../../../Services/Api";
import ClientManagerTabel from '../SubComponents/ClientManagerTabel';

function ClientManager() {
    const [visible, setVisible] = useState(false);
    const [Utilities, setUtilities] = useState("All");
    const [theArray, setTheArray] = useState([]);
   

    useEffect(() => {
      
        UtilitiesFunction();

    }, [])

    const UtilitiesFunction = async () => {

        try {
            const GETUtilitiesHandler = await DisplayUtilitiesApi.GetAll()
            console.log("GETUtilitiesHandler", GETUtilitiesHandler)
            if (GETUtilitiesHandler) {
                console.log("GETUtilitiesHandler", GETUtilitiesHandler)
                let x =['All']
                GETUtilitiesHandler.map((data)=>(
                    x.push(data.Title)
                ))
                setTheArray(x)
                
            }
            else {
                console.log("check")
               
            }

        } catch (error) {
            console.log("Server Error :", error)
            message.error("Server is Down")
        }

    }

    return (
        <>
         <Divider style={{color: '#9e1068' }} > Client Manager  </Divider>
           <div className="mb-4">
               
                <button type="primary" className='addButton mx-3'
                    onClick={() => 
                    { if (visible) { setVisible(false) } else {setVisible(true)} ;
                }
                    }
                    >
                    Utilities
                </button>
                <button type="primary" className="mx-3 whitebutton">
                    {Utilities}
                </button>
                {
                    visible?(
                        <div className="mb-4 mt-3 py-4 px-4 bg-white" style={stylebox}>
                            {
                                theArray.map((x)=>{
                                    if (Utilities === x){
                                    return(
                                        <button type="primary" className="mx-1 my-2 addButton"
                                            onClick={() =>{ setUtilities(`${x}`);
                                                setVisible(false)
                                        }}>
                                        {x}
                                        </button>
                                       )
                                   }
                                    else {
                                       return (
                                           <button type="primary" className="mx-1 my-2 whitebutton"
                                               onClick={() => {
                                                   setUtilities(`${x}`);
                                                   setVisible(false)
                                               }}>
                                               {x}
                                           </button>
                                       )
                                    }
                                })      

                            }
                           
                        </div>
                    ):(
                        <>
                        </>
                    )
                }
          </div>
          
            <ClientManagerTabel Utilities={Utilities}/>
           
        </>
    );
}

export default ClientManager;


const stylebox = {
    
    boxShadow: ' 0 3px 5px 1px rgb(138, 138, 138)',
    borderRadius: '18px',
};

