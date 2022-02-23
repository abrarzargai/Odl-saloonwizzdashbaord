import Axios from "axios";
export const imagePath = "/uploads/";
//config
 const URL = "https://odl-saloonwizz-app.herokuapp.com";
// const URL = "http://localhost:8080";

const axios = Axios.create({
    baseURL: URL,
    timeout: 10000,
});

const getToken = localStorage.getItem("token");

const axiosAuth = Axios.create({
    baseURL: URL,
    headers: { Authorization: `Bearer ${getToken}` },
    timeout: 100000,
});



// export const AuthApi = {
//     Email: async (data) => await axios.post("/api/auth/Email", data),
//     ImageUplaod: async (data) => await axios.post("/api/Upload/image", data),
// };

// Admin/User
export const UserApi = {
 
    UpdatePassword: async (data) => await axios.post("/api/user/updatepassword", data),
};


//Display Utlities ====>

export const DisplayUtilitiesApi = {
    GetAll: async () =>{
        try {
              const Response = await axios.get("/api/Utilities/getall")
                return Response.data.Data
        } catch (error) {
            console.log("API Error :",error)
            return null
        }

         
         },
    AddUtilities: async (data) => await axios.post("/api/Utilities/add",data),
    AddSupplierToUtility: async (data) =>  {
          try {
              const Response = await axios.post("/api/Utilities/addSupplier",data)
                return true
        } catch (error) {
            console.log("API Error :",error)
            return null
        }
         
         },
    DeleteSupplierToUtility: async (data) =>  {
          try {
              const Response = await axios.post("/api/Utilities/deleteSupplier",data)
                return true
        } catch (error) {
            console.log("API Error :",error)
            return null
        }

         
         }



};


//Display Utlities ====>

export const DisplayUtilitiyBillApi = {

   GetAll: async (Email) =>{
        try {
              const Response = await axios.get(`/api/user/getfilling?email=${Email}`)
                return Response.data.Data
        } catch (error) {
            console.log("API Error :",error)
            return null
        }

         
         },

     Add: async (data) => await axios.post("/api/user/addfile",data),
}

//Display KnowledgedBaseArticles ====>
export const KnowledgedBaseApi = {

   GetAll: async () =>{
        try {
              const Response = await axios.get(`/api/KnowledgedBase/getall`)
              console.log("KnowledgedBaseApiGetAll Response:",Response)
                return Response.data.Data
        } catch (error) {
            console.log("API Error :",error)
            return null
        }

         
         },

     Add: async (data) => await axios.post("/api/KnowledgedBase/add",data),
}