import axios from "axios";
import { BASE_URL } from "../config/axios-config";

const client = axios.create({
  baseURL: BASE_URL,
});

export const saveContextFlow = (payload) => client.post(`/context`, payload);
export const saveContextType = (payload) =>
  client.post(`/context-type`, payload);
export const getAllContextFlow = (payload) =>
  client.get(`/all-contexts`, { params: { payload } });
export const getFilteredContextFlow = (payload) =>
  client.get(`/contexts`, { params: { payload } });
export const updateContextFlowById = (payload) =>
  client.put(`/add-module-entity`, payload);
export const updateContextFlowByDrag = (payload) =>
  client.put(`/shuffle-entity`, payload);
export const removeAttentionEntities = (payload) =>
  client.put(`/remove-attention`, payload);
export const changeContextById = (payload) =>
  client.put(`/change-context`, payload);
export const getAllContextDomain = (payload) => client.get(`/get-all-domain`);
export const getRpByDomain = (payload) =>
  client.get(`/get-rp-by-domain`, { params: { payload } });

/////context values
export const saveContextValue = (payload) =>
  client.post(`/context-value`, payload);
export const getContextValue = (payload) =>
  client.get(`/get-context-value`, { params: { payload } });
export const getAllContextValue = (payload) =>
  client.get(`/get-all-context-value`, { params: { payload } });
export const updateContextValue = (payload) =>
  client.put(`/update-context-value`, payload);
export const saveContextValueImg = (payload) =>
  client.post(`/cv-image-upload`, payload);
// export const deleteContextFlowById = (payload) =>
//   client.delete('/contextflow/delete', {data: payload});

const ContextFlowClientApi = {
  getAllContextFlow,
  saveContextFlow,
  saveContextValue,
  updateContextFlowById,
  updateContextFlowByDrag,
  removeAttentionEntities,
  saveContextType,
  getAllContextValue,
  saveContextValueImg,
  getAllContextDomain,
  getRpByDomain,
};

export default ContextFlowClientApi;
