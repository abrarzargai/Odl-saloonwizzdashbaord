import axios from "axios";

// export const UTILITY_BILLS_URL = "http://localhost:8080/api";
 const UTILITY_BILLS_URL = "https://odl-saloonwizz-app.herokuapp.com/api";

// CREATE =>  POST: add a new customer to the server
export function createUtilityBill(data) {
  console.log(data)
  return axios.post(`${UTILITY_BILLS_URL}/user/addfile`, data);
}

// READ
export function getAllUtilityBills(Email) {
  return axios.get(`${UTILITY_BILLS_URL}/user/getfilling?email=${Email}`);
}

export function getUtilityBillById(customerId) {
  return axios.get(`${UTILITY_BILLS_URL}/${customerId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findUtilityBills(queryParams) {
  return axios.post(`${UTILITY_BILLS_URL}/find`, { queryParams });
}

// UPDATE => PUT: update the customer on the server
export function updateUtilityBill(customer) {
  return axios.put(`${UTILITY_BILLS_URL}/${customer.id}`, { customer });
}

// UPDATE Status
export function updateStatusForUtilityBills(ids, status) {
  return axios.post(`${UTILITY_BILLS_URL}/updateStatusForUtilityBills`, {
    ids,
    status
  });
}

// DELETE => delete the customer from the server
export function deleteUtilityBill(customerId) {
  return axios.delete(`${UTILITY_BILLS_URL}/${customerId}`);
}

// DELETE UtilityBills by ids
export function deleteUtilityBills(ids) {
  return axios.post(`${UTILITY_BILLS_URL}/deleteUtilityBills`, { ids });
}
