import React from "react";
import axiosClient from "./AxiosClient";
const tasksApi = {
  getAll: (params) => {
    const url = "/DS";
    return axiosClient.get(url, { params });
  },
  delete: (id) => {
    const url = `/Delete?tasksID=${id}`;
    return axiosClient.delete(url);
  },
  add: (params) => {
    const url = "/Add";
    return axiosClient.post(url, params);
  },
  updateName: (params) => {
    const url = "/Edit";
    return axiosClient.put(url, params);
  },
  updateStatus: (id) => {
    const url = `/updateStatus?TasksID=${id}`;
    return axiosClient.put(url);
  },
};

export default tasksApi;
