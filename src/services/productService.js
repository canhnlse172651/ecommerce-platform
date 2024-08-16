import axiosInstance from "@/utils/axiosInstance";

export const productService = {
  getProducts(query = "") {
    return axiosInstance.get(`/products${query}`);
  },
  getProductDetail(slug = "") {
    return axiosInstance.get(`/products/${slug}`);
  },
  getCategories(query = "") {
    return axiosInstance.get(`/product-categories${query}`);
  },
  getCategoriesBySlug(slug = "") {
    return axiosInstance.get(`/product-categories/${slug}`);
  },
  getProductReview(id = "", query = "") {
    return axiosInstance.get(`/reviews/product/${id}${query}`);
  },
  addProductToWishList(payload) {
    return axiosInstance.post(`/customer/white-list`, payload);
  },
  removeProductInWhishList(payload) {
    return axiosInstance.delete(`/customer/white-list`, { data: payload });
  },
};
