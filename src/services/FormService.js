import ApiService from "./ApiService";
import { API_URL } from "./AxiosInterceptor";

export const getAllForm = (data) => {
  return ApiService.post(API_URL+ `tasks/get-task-by-user`,data);
};

export const addForm = (data) => {
  return ApiService.post(API_URL + `tasks/create`, data);
};

export const updateForm = (id, data) => {
  return ApiService.put(API_URL + `tasks/update/${id}`, data);
};

export const deleteForm = (id) => {
  return ApiService.Delete(API_URL + `tasks/delete/${id}`);
};


