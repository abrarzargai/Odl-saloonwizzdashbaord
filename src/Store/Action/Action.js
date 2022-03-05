import axios from "axios"
// const URL = "http://localhost:8080";
 const URL = "https://odl-saloonwizz-app.herokuapp.com/";

//Utilities
export const DisplayUtilities = {
    GetAll: async (dispatch) => {
        try {
            const res = await axios.get(`${URL}/api/Utilities/getall`);
              console.log("res",res)
            dispatch({ type: 'GET_Utilities', payload: res.data.Data })
        } catch (error) {
            console.log(error)
        }
    }
};

export const DisplayFilling_UtilitiesFilling = {
    GetAll: async (dispatch) => {
        try {
            const res = await axios.get(`${URL}/api/DigitalAssistance/getall`);
            console.log("res",res)
            dispatch({ type: 'GET_UtilitiesFilling', payload: res.data.Data })
        } catch (error) {
            console.log(error)
        }
    }
};


export const DisplayFilling_SupplierInvoices = {
    GetAll: async (dispatch) => {
        try {
            const res = await axios.get(`${URL}/api/Utilities/getall`);
            dispatch({ type: 'GET', payload: res.data.Data })
        } catch (error) {
            console.log(error)
        }
    }
};

//userutilites =>showing on client manager page
export const ClientManager = {
    GetAll: async (dispatch) => {
        try {
            const res = await axios.get(`${URL}/api/Userutilities/getall`);
            dispatch({ type: 'GET', payload: res.data.Data })
        } catch (error) {
            console.log(error)
        }
    }
};


export const DigitalAssistance = {
    GetAll: async (dispatch) => {
        try {
            const res = await axios.get(`${URL}/api/DigitalAssistance/getall`);
            dispatch({ type: 'GET', payload: res.data.Data })
        } catch (error) {
            console.log(error)
        }
    }
};


export const knowledgedBase_faq = {
    GetAll: async (dispatch) => {
        try {
            const res = await axios.get(`${URL}/api/KnowledgedBase/getall`);
            dispatch({ type: 'GET', payload: res.data.Data })
        } catch (error) {
            console.log(error)
        }
    }
};

export const knowledgedBase_articles = {
    GetAll: async (dispatch) => {
        try {
            const res = await axios.get(`${URL}/api/KnowledgedBase/getall`);
            dispatch({ type: 'GET', payload: res.data.Data })
        } catch (error) {
            console.log(error)
        }
    }
};

export const knowledgedBase_tutorials = {
    GetAll: async (dispatch) => {
        try {
            const res = await axios.get(`${URL}/api/KnowledgedBase/getall`);
            dispatch({ type: 'GET', payload: res.data.Data })
        } catch (error) {
            console.log(error)
        }
    }
};


export const Calender = {
    GetAll: async (dispatch) => {
        try {
            const res = await axios.get(`${URL}/api/reminder/getall`);
            dispatch({ type: 'GET', payload: res.data.Data })
        } catch (error) {
            console.log(error)
        }
    }
};