import { api } from "../api";

type User = {
  id: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  email: string;
};

async function getAll() {
  return api.get<User[]>(`/users`);
}

async function remove(userId: string) {
  return api.delete(`/users/${userId}`);
}

export const users = {
  getAll,
  delete: remove,
};
