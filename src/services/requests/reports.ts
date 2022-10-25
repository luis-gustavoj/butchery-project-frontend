import { api } from "../api";

type CreateReportRequestBody = {
  userID: string;
  reportData: any;
};

async function create(body: CreateReportRequestBody) {
  return api.post("/reports", body);
}

async function getAll<T>(userId: string) {
  return api.get<T>(`/reports/${userId}`);
}

async function getById<T>(userId: string, id: string) {
  return api.get<T>(`/report/${id}`);
}

export const reports = {
  create,
  getAll,
  getById,
};
