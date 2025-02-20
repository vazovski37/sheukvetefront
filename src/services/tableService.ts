// services/tableService.ts
import { apiPost, apiGet, apiPut, apiDelete } from "@/utils/axiosInstance";

const ADD_TABLE_ENDPOINT = "/api/admin/addTable";
const VIEW_TABLES_ENDPOINT = "/api/admin/viewTables";
const EDIT_TABLE_ENDPOINT = (id: number) => `/api/admin/editTable/${id}`;
const DELETE_TABLE_ENDPOINT = (id: number) => `/api/admin/deleteTable/${id}`;

export interface Table {
  id: number;
  tableNumber: number;
}

export const addTableService = async (formData: { tableNumber: number }) => {
  try {
    const response = await apiPost(ADD_TABLE_ENDPOINT, formData);
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const fetchTablesService = async () => {
  try {
    const response = await apiGet(VIEW_TABLES_ENDPOINT);
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const editTableService = async (id: number, formData: { tableNumber: number }) => {
  try {
    const response = await apiPut(EDIT_TABLE_ENDPOINT(id), formData);
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const deleteTableService = async (id: number) => {
  try {
    const response = await apiDelete(DELETE_TABLE_ENDPOINT(id));
    return response;
  } catch (error: any) {
    throw error;
  }
};
