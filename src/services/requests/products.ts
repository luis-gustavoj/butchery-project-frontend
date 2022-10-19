import { api } from "../api";

type CreateProductRequestBody = {
  name: string;
  userID: string;
  category: string;
};

async function create(body: CreateProductRequestBody) {
  return api.post("/products", body);
}

async function getAll(userId: string) {
  return api.get(`/products/${userId}`);
}

export const products = {
  create,
  getAll,
};
