import axios from "axios";

export const CLIENT_MANAGERS_URL = "http://localhost:8080/api";
// const CLIENT_MANAGERS_URL = "https://odl-saloonwizz-app.herokuapp.com/api";

// CREATE =>  POST: add a new customer to the server
export function createClientManager(customer) {
  return axios.post(CLIENT_MANAGERS_URL, { customer });
}

// READ
export function getAllClientManagers() {
  return axios.get(`${CLIENT_MANAGERS_URL}/reminder/getall`);
}

export function getClientManagerById(customerId) {
  return axios.get(`${CLIENT_MANAGERS_URL}/${customerId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findClientManagers(queryParams) {
  return axios.post(`${CLIENT_MANAGERS_URL}/find`, { queryParams });
}

// UPDATE => PUT: update the customer on the server
export function updateClientManager(customer) {
  return axios.put(`${CLIENT_MANAGERS_URL}/${customer.id}`, { customer });
}

// UPDATE Status
export function updateStatusForClientManagers(ids, status) {
  return axios.post(`${CLIENT_MANAGERS_URL}/updateStatusForClientManagers`, {
    ids,
    status
  });
}

// DELETE => delete the customer from the server
export function deleteClientManager(customerId) {
  return axios.delete(`${CLIENT_MANAGERS_URL}/${customerId}`);
}

// DELETE ClientManagers by ids
export function deleteClientManagers(ids) {
  return axios.post(`${CLIENT_MANAGERS_URL}/deleteClientManagers`, { ids });
}
