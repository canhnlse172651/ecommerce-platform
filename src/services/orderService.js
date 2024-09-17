

import axiosInstance from "@/utils/axiosInstance";

export const orderServices = {
     getVoucher(id = '') {
        return axiosInstance.get(`/orders/voucher/${id}`)
     },
     getOrder(query = '') {
        return axiosInstance.get(`/orders/me${query}`)
     },
     getOrderById(id = '') {
        return axiosInstance.get(`/orders/${id}/me`)
     },
     checkOut(payload = {}){
        return axiosInstance.post(`/orders`,payload)
     }
}