import apiClient from './apiClient';

export async function fetchProducts({ limit = 10, skip = 0 } = {}) {
  const response = await apiClient.get(`/products?limit=${limit}&skip=${skip}`);
  return response.data;
}

export async function fetchProductById(productId) {
  const response = await apiClient.get(`/products/${productId}`);
  return response.data;
}
