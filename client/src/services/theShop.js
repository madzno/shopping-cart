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
