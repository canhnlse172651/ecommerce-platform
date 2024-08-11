

import axiosInstance from "@/utils/axiosInstance";
import { localToken } from "@/utils/token";

export const authenService = {
  login(payload = {}) {
    return axiosInstance.post(`/customer/login`, payload);
  },

  register(payload = {}) {
    return axiosInstance.post(`/customer/register`, payload);
  },
  getProfile() {
    return axiosInstance.get(`/customer/profiles`);
  },
  updateProfile(payload = {}) {
    return axiosInstance.put(`/customer/profiles`, payload, {
      headers: {
        "Authorization": `Bearer ${localToken.get()?.accessToken}`,
        "Content-Type": `multipart/form-data`,                           
      },
    });
  },
};
