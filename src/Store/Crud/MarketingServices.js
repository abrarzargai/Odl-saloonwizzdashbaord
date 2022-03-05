import axios from "axios";

//export const MARKETING_SERVICES_URL = "http://localhost:8080/api";
 const MARKETING_SERVICES_URL = "https://odl-saloonwizz-app.herokuapp.com/api";

// CREATE =>  POST: add a new customer to the server
export function createMarketingService(data) {
  return axios.post(`${MARKETING_SERVICES_URL}/packages/add`, data);
}

// READ
export function getAllMarketingServices() {
  return axios.get(`${MARKETING_SERVICES_URL}/packages/getall`);
}

// DELETE MarketingServices by ids
export function deleteMarketingService(data) {

    return axios.post(`${MARKETING_SERVICES_URL}/packages/delete`, data);
  
}

export function getMarketingServiceById(customerId) {
  return axios.get(`${MARKETING_SERVICES_URL}/${customerId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findMarketingServices(queryParams) {
  return axios.post(`${MARKETING_SERVICES_URL}/find`, { queryParams });
}

// UPDATE => PUT: update the customer on the server
export function updateMarketingService(data) {
  return axios.post(`${MARKETING_SERVICES_URL}/packages/update`, data)
}

// UPDATE Status
export function updateStatusForMarketingServices(ids, status) {
  return axios.post(`${MARKETING_SERVICES_URL}/updateStatusForMarketingServices`, {
    ids,
    status
  });
}



// DELETE MarketingServices by ids
export function deleteMarketingServices(ids) {
  return axios.post(`${MARKETING_SERVICES_URL}/deleteMarketingServices`, { ids });
}
