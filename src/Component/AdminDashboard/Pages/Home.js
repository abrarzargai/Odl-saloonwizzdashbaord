import React, { useEffect, useState } from 'react';
import {  message } from 'antd';
import { Statistics } from "../../../Services/Api";

function Home() {
    const [loading, setloading] = useState(true);
    const [theArray, setTheArray] = useState([]);
    const [theArrayCheck, setTheArrayCheck] = useState(true);

    useEffect(() => {
        ApiCall();
        setloading(false)
    }, [])

    const ApiCall = async () => {

        try {
            const GetHandler = await Statistics.GetAll()
            if (GetHandler) {
                setTheArray(GetHandler)
                setloading(false)

            }
            else {
                console.log("check")
                setTheArrayCheck(false)
                setloading(false)
            }

        } catch (error) {
            console.log("Server Error :", error)
            message.error("Server is Down")
            setloading(false)
        }

    }

    return (
        <>
         Home
        </>
    );
}

export default Home;
