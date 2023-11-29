import React from "react";
import axiosClient from "./AxiosClient";
const tasksApi = {
  getAll: (params) => {
    const url = "toDoList/DS";
    return axiosClient.get(url, { params });
  },
  delete: (id) => {
    const url = `toDoList/Delete?tasksID=${id}`;
    return axiosClient.delete(url);
  },
  add: (params) => {
    const url = "toDoList/Add";
    return axiosClient.post(url, params);
  },
  login: (params) => {
    const url = "toDoList/login";
    return axiosClient.post(url, params);
  },
  updateName: (params) => {
    const url = "toDoList/Edit";
    return axiosClient.put(url, params);
  },
  updateStatus: (id) => {
    const url = `toDoList/updateStatus?TasksID=${id}`;
    return axiosClient.put(url);
  },
};

export default tasksApi;
