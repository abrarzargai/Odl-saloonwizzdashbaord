import axios from "axios";

//export const CALENDERS_URL = "http://localhost:8080/api";
 const CALENDERS_URL = "https://odl-saloonwizz-app.herokuapp.com/api";

// CREATE =>  POST: add a new customer to the server
export function createCalender(data) {
  return axios.post(`${CALENDERS_URL}/reminder/add`, data );
}

// READ
export function getAllCalenders() {
  return axios.get(`${CALENDERS_URL}/reminder/getall`);
}

export function getCalenderById(customerId) {
  return axios.get(`${CALENDERS_URL}/${customerId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findCalenders(queryParams) {
  return axios.post(`${CALENDERS_URL}/find`, { queryParams });
}

// UPDATE => PUT: update the customer on the server
export function updateCalender(customer) {
  return axios.put(`${CALENDERS_URL}/${customer.id}`, { customer });
}

// UPDATE Status
export function updateStatusForCalenders(ids, status) {
  return axios.post(`${CALENDERS_URL}/updateStatusForCalenders`, {
    ids,
    status
  });
}

// DELETE => delete the customer from the server
export function deleteCalender(customerId) {
  return axios.delete(`${CALENDERS_URL}/${customerId}`);
}

// DELETE Calenders by ids
export function deleteCalenders(ids) {
  return axios.post(`${CALENDERS_URL}/reminder/Delete`,  ids );
}
