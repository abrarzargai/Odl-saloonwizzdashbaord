import axios from "axios";

export const KNOWLEDGE_BASES_URL = "http://localhost:8080/api";
// const KNOWLEDGE_BASES_URL = "https://odl-saloonwizz-app.herokuapp.com/api";

// CREATE =>  POST: add a new customer to the server
export function createKnowledgedBase(customer) {
  return axios.post(KNOWLEDGE_BASES_URL, { customer });
}

// READ
export function getAllKnowledgedBases() {
  return axios.get(`${KNOWLEDGE_BASES_URL}/reminder/getall`);
}

export function getKnowledgedBaseById(customerId) {
  return axios.get(`${KNOWLEDGE_BASES_URL}/${customerId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findKnowledgedBases(queryParams) {
  return axios.post(`${KNOWLEDGE_BASES_URL}/find`, { queryParams });
}

// UPDATE => PUT: update the customer on the server
export function updateKnowledgedBase(customer) {
  return axios.put(`${KNOWLEDGE_BASES_URL}/${customer.id}`, { customer });
}

// UPDATE Status
export function updateStatusForKnowledgedBases(ids, status) {
  return axios.post(`${KNOWLEDGE_BASES_URL}/updateStatusForKnowledgedBases`, {
    ids,
    status
  });
}

// DELETE => delete the customer from the server
export function deleteKnowledgedBase(customerId) {
  return axios.delete(`${KNOWLEDGE_BASES_URL}/${customerId}`);
}

// DELETE KnowledgedBases by ids
export function deleteKnowledgedBases(ids) {
  return axios.post(`${KNOWLEDGE_BASES_URL}/deleteKnowledgedBases`, { ids });
}
