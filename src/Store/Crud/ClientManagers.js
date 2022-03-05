import axios from "axios";

// export const CLIENT_MANAGERS_URL = "http://localhost:8080/api";
 const CLIENT_MANAGERS_URL = "https://odl-saloonwizz-app.herokuapp.com/api";

// CREATE =>  POST: add a new customer to the server
export function createClientManagerDeal(data) {
  return axios.post(`${CLIENT_MANAGERS_URL}/Userutilities/AddDeal`, data);
}

// READ
export function getAllClientManagers() {
  return axios.get(`${CLIENT_MANAGERS_URL}/userutilities/getall`);
}

// DELETE => delete the customer from the server
export function deleteClientManagerDeal(data) {
  return axios.post(`${CLIENT_MANAGERS_URL}//Userutilities/DeleteDeal`,data);
}

