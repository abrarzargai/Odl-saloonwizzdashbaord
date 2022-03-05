import axios from "axios";

 // export const DIGITAL_ASSISTANCES_URL = "http://localhost:8080/api";
 const DIGITAL_ASSISTANCES_URL = "https://odl-saloonwizz-app.herokuapp.com/api";

// CREATE =>  POST: add a new customer to the server
export function createDigitalAssistance(customer) {
  return axios.post(DIGITAL_ASSISTANCES_URL, { customer });
}

// READ
export function getAllDigitalAssistances() {
  return axios.get(`${DIGITAL_ASSISTANCES_URL}/DigitalAssistance/getall`);
}

export function getDigitalAssistanceById(customerId) {
  return axios.get(`${DIGITAL_ASSISTANCES_URL}/${customerId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findDigitalAssistances(queryParams) {
  return axios.post(`${DIGITAL_ASSISTANCES_URL}/find`, { queryParams });
}

// UPDATE => PUT: update the customer on the server
export function updateDigitalAssistance(data) {
  return axios.post(`${DIGITAL_ASSISTANCES_URL}/DigitalAssistance/update`, data)
}

// UPDATE Status
export function updateStatusForDigitalAssistances(ids, status) {
  return axios.post(`${DIGITAL_ASSISTANCES_URL}/updateStatusForDigitalAssistances`, {
    ids,
    status
  });
}

// DELETE => delete the customer from the server
export function deleteDigitalAssistance(customerId) {
  return axios.delete(`${DIGITAL_ASSISTANCES_URL}/${customerId}`);
}

// DELETE DigitalAssistances by ids
export function deleteDigitalAssistances(ids) {
  return axios.post(`${DIGITAL_ASSISTANCES_URL}/deleteDigitalAssistances`, { ids });
}
