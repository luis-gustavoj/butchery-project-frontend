import { api } from "../api";

type CreateProductRequestBody = {
  name: string;
  userID: string;
  value: number;
  type: string;
};

async function create(body: CreateProductRequestBody) {
  return api.post("/costs", body);
}

async function getAll(userId: string) {
  return api.get(`/costs/${userId}`);
}

export const costs = {
  create,
  getAll,
};
