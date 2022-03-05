import axios from "axios";

// export const UTILITIES_URL = "http://localhost:8080/api";
 const UTILITIES_URL = "https://odl-saloonwizz-app.herokuapp.com/api";

// CREATE =>  POST: add a new customer to the server
export function createUtility(data) {
  return axios.post(`${UTILITIES_URL}/Utilities/add`,data );
}

// READ
export function getAllUtilities() {
  return axios.get(`${UTILITIES_URL}/Utilities/getall`);
}

export function getUtilityById(customerId) {
  return axios.get(`${UTILITIES_URL}/${customerId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findUtilitys(queryParams) {
  return axios.post(`${UTILITIES_URL}/find`, { queryParams });
}

// UPDATE => PUT: update the customer on the server
export function updateUtility(customer) {
  return axios.put(`${UTILITIES_URL}/${customer.id}`, { customer });
}

// UPDATE Status
export function updateStatusForUtilities(ids, status) {
  return axios.post(`${UTILITIES_URL}/updateStatusForUtilitys`, {
    ids,
    status
  });
}

// DELETE => delete the customer from the server
export function deleteUtility(data) {
  return axios.post(`${UTILITIES_URL}/Utilities/Delete`, data)
}

// DELETE => delete the customer from the server
export function deleteSupplier(data) {
  return axios.post(`${UTILITIES_URL}/Utilities/deleteSupplier`,data)
}

export function AddSupplier(data) {
  return axios.post(`${UTILITIES_URL}/Utilities/addSupplier`,data)
}

// DELETE Utilities by ids
export function deleteUtilities(ids) {
  return axios.post(`${UTILITIES_URL}/deleteUtilitys`, { ids });
}
