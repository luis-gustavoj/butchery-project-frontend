import { api } from "../api";

type CreateProductRequestBody = {
  name: string;
  userID: string;
  category: string;
};

async function create(body: CreateProductRequestBody) {
  return api.post("/products", body);
}

async function update(
  productId: string,
  body: Omit<CreateProductRequestBody, "userID">
) {
  return api.put(`/products/${productId}`, body);
}

async function deleteProduct(productId: string) {
  return api.delete(`/products/${productId}`);
}

async function getAll(userId: string) {
  return api.get(`/products/${userId}`);
}

export const products = {
  create,
  getAll,
  deleteProduct,
  update,
};
