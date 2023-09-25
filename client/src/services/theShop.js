import axios from "axios";

export const checkoutCart = async () => {
  await axios.post('/api/checkout');
}

export const getProducts = async () => {
  const response = await axios.get("/api/products");
  return response.data;
}

export const getCartItems = async () => {
  const response = await axios.get("/api/cart");
  return response.data;
}

export const addNewProduct = async (newProduct) => {
  const response = await axios.post("/api/products", { ...newProduct });
  return response.data;
}

export const deleteProduct = async (id) => {
  await axios.delete(`/api/products/${id}`);
}

export const editProduct = async (id, product) => {
  const response = await axios.put(`/api/products/${id}`, product);
  return response.data;
}

export const addNewCartItem = async (obj) => {
  const response = await axios.post(`/api/add-to-cart`, obj);
  return response.data;
}
