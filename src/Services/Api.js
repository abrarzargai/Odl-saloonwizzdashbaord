import Axios from "axios";
export const imagePath = "/uploads/";
//config
 const URL = "https://odl-saloonwizz-app.herokuapp.com";
// const URL = "http://localhost:8080";

const axios = Axios.create({
    baseURL: URL,
    timeout: 10000,
});

// const getToken = localStorage.getItem("token");

// const axiosAuth = Axios.create({
//     baseURL: URL,
//     headers: { Authorization: `Bearer ${getToken}` },
//     timeout: 100000,
// });



// export const AuthApi = {
//     Email: async (data) => await axios.post("/api/auth/Email", data),
//     ImageUplaod: async (data) => await axios.post("/api/Upload/image", data),
// };

// Admin/User
export const UserApi = {
 
    UpdatePassword: async (data) => await axios.post("/api/user/updatepassword", data),
    Update: async (data) => await axios.post("/api/user/update ", data),
    AddLink: async (data) => await axios.post("/api/user/addlink ", data),
    updatelink: async (data) => await axios.post("/api/user/updatelink ", data),
    DeleteLink: async (data) => await axios.post("/api/user/Deletelink ", data),
    ResetPassword: async (data) => await axios.post("/api/user/resetpassword ", data),
    Getoneuser: async (data) => await axios.post("/api/user/Getoneuser", data),

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
               await axios.post("/api/Utilities/addSupplier",data)
                return true
        } catch (error) {
            console.log("API Error :",error)
            return null
        }
         
         },
    DeleteSupplierToUtility: async (data) =>  {
          try {
              await axios.post("/api/Utilities/deleteSupplier",data)
                return true
        } catch (error) {
            console.log("API Error :",error)
            return null
        }

         
         },

     DeleteUtility: async (data) => {
        try {
             await axios.post("/api/Utilities/Delete", data)
            return true
        } catch (error) {
            console.log("API Error :", error)
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

//Services/ Packages 
export const ServicesApi = {
    GetAll: async () => {
        try {
            const Response = await axios.get("/api/packages/getall")
            return Response.data.Data
        } catch (error) {
            console.log("API Error :", error)
            return null
        }


    },
    Add: async (data) => await axios.post("/api/packages/add", data),

    Update: async (data) => {
        try {
            await axios.post("/api/packages/update", data)
            return true
        } catch (error) {
            console.log("API Error :", error)
            return null
        }


    },

    Delete: async (data) => {
        try {
            await axios.post("/api/Packages/Delete", data)
            return true
        } catch (error) {
            console.log("API Error :", error)
            return null
        }


    }


};

export const DigitalAssistanceApi = {
    GetAll: async () => {
        try {
            const Response = await axios.get("/api/DigitalAssistance/getall")
            return Response.data.Data
        } catch (error) {
            console.log("API Error :", error)
            return null
        }


    },
    Update: async (data) => {
        try {
           await axios.post("/api/DigitalAssistance/update", data)
            return true
        } catch (error) {
            console.log("API Error :", error)
            return null
        }


    },
    Add: async (data) => {
        try {
            const Response = await axios.post("/api/DigitalAssistance/add", data)
            return Response
        } catch (error) {
            console.log("API Error :", error)
            return null
        }


    },

  

};

export const Statistics = {
    GetAll: async () => {
        try {
            const Utilities = await axios.get("/api/Utilities/getall")
            const DigitalAssistance = await axios.get("/api/DigitalAssistance/getall")
            const Services = await axios.get("/api/DigitalAssistance/getall")
            const UsersUtilities = await axios.get("/api/Userutilities/getall")
            const Reminders = await axios.get("/api/reminder/getall")
            const User = await axios.get("/api/user/GetAllUsers")
            console.log(Utilities)
            console.log(DigitalAssistance)
            console.log(Services)
            console.log(UsersUtilities)
            console.log(User)
            console.log(Reminders)
            const data = {
                Utilities: Utilities.data.Data.length,
                DigitalAssistance: DigitalAssistance.data.Data.length,
                Services: Services.data.Data.length,
                UsersUtilities: UsersUtilities.data.Active.length,
                User: User.data.Data.length,
                Reminders: Reminders.data.Data.length,
            }
            console.log(data)
            return data;
        } catch (error) {
            console.log("API Error :", error)
            return null
        }

    },
  

};

export const Reminder = {
    GetAll: async () => {
        try {
            const Reminders = await axios.get("/api/reminder/getall")
            return Reminders.data.Data;
        } catch (error) {
            console.log("API Error :", error)
            return null
        }

    },
    Add: async (data) => {
        try {
            const Response = await axios.post("/api/reminder/add", data)
            console.log(Response)
            return true
        } catch (error) {
            console.log("API Error :", error)
            return null
        }


    },
    Delete: async (data) => {
        try {
           await axios.post("/api/reminder/Delete", data)
            return true
        } catch (error) {
            console.log("API Error :", error)
            return null
        }


    },

};

export const UsrServicePackageApi = {
    GetAll: async () => {
        try {
            const Reminders = await axios.get("/api/UserServices/getall")
            return Reminders.data.Data;
        } catch (error) {
            console.log("API Error :", error)
            return null
        }

    },
    Add: async (data) => {
        try {
            const Response = await axios.post("/api/UserServices/add", data)
            console.log(Response)
            return Response
        } catch (error) {
            console.log("API Error :", error)
            return null
        }


    },
    Update: async (data) => {
        try {
            const Response = await axios.post("/api/UserServices/update", data)
            return Response
        } catch (error) {
            console.log("API Error :", error)
            return null
        }


    },
    delete: async (data) => {
        try {
            const Response = await axios.post("/api/UserServices/delete", data)
            return Response
        } catch (error) {
            console.log("API Error :", error)
            return null
        }


    },

};

export const UserutilitiesApi = {
    GetByuser: async () => {
        try {
            const Response = await axios.post("/api/Userutilities/getOne")
           
            return Response
        } catch (error) {
            console.log("API Error :", error)
            return null
        }

    },
    Add: async (data) => {
        try {
            const Response = await axios.post("/api/Userutilities/add",data)

            return Response
        } catch (error) {
            console.log("API Error :", error)
            return null
        }

    },
    AcceptDeal: async (data) => {
        try {
            const Response = await axios.post("/api/Userutilities/AcceptDeal", data)

            return Response
        } catch (error) {
            console.log("API Error :", error)
            return null
        }

    },
  
};