import { Button, message, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { DisplayUtilitiesApi } from "../../../Services/Api";
import ClientManagerTabel from '../SubComponents/ClientManagerTabel';

function ClientManager() {
    const [visible, setVisible] = useState(false);
    const [Utilities, setUtilities] = useState("All");
    const [theArray, setTheArray] = useState([]);
    const [theArrayCheck, setTheArrayCheck] = useState(true);
    const [loading, setloading] = useState(true);
   

    useEffect(() => {
      
        UtilitiesFunction();
        setloading(false)
    }, [])

    const UtilitiesFunction = async () => {

        try {
            const GETUtilitiesHandler = await DisplayUtilitiesApi.GetAll()
            console.log("GETUtilitiesHandler", GETUtilitiesHandler)
            if (GETUtilitiesHandler) {
                console.log("GETUtilitiesHandler", GETUtilitiesHandler)
                let x =['All']
                GETUtilitiesHandler.map((data)=>{
                    x.push(data.Title)
                })
                setTheArray(x)
                
            }
            else {
                console.log("check")
                setTheArrayCheck(false)
            }

        } catch (error) {
            console.log("Server Error :", error)
            message.error("Server is Down")
        }

    }

    return (
        <>
        
           <div className="mb-4">
               
                <Button type="primary" style={button2style} className="mx-3"
                    onClick={() => 
                    { if (visible) { setVisible(false) } else {setVisible(true)} ;
                }
                    }
                    >
                    Utilities
                </Button>
                <Button type="primary" style={buttonstyle} className="mx-3">
                    {Utilities}
                </Button>
                {
                    visible?(
                        <div className="mb-4 mt-3 py-4 px-4 bg-white" style={stylebox}>
                            {
                                theArray.map((x)=>{
                                    console.log("x==>",x)
                                    return(
                                        <Button type="primary" className="mx-1 my-2"
                                            onClick={() =>{ setUtilities(`${x}`);
                                                setVisible(false)
                                        }}
                                        style={

                                            (Utilities==x)?(button2style):(buttonstyle)
                                        }>
                                        {x}
                                        </Button>
                                    )
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

const button2style = {
    fontSize: '13px',
    background: "linear-gradient(to right, rgb(216, 93, 185),rgb(126, 3, 109), rgb(51, 1, 44))",
    color: 'white',
    padding: "5px 20px",
    borderRadius: '8px',
    border: "none",
    boxShadow: ' 0 3px 5px 1px rgb(138, 138, 138)',
};

const stylebox = {
    
    boxShadow: ' 0 3px 5px 1px rgb(138, 138, 138)',
    borderRadius: '18px',
};

const buttonstyle = {
    fontSize: '14px',
    color: " rgb(51, 1, 44)",
    background: 'white',
    padding: "5px 25px",
    borderRadius: '8px',
    border: "none",
    boxShadow: ' 0 3px 5px 1px rgb(138, 138, 138)',
};

const UtiltiesList =[
    "Gass","Electric","Telephone","CardTerminal",
    "water","wastewater","Clean","Dry",
    "shipping","Electricstore","maintaince","delivery","All"
]