import { api } from "../api";

type CreateReportRequestBody = {
  userID: string;
  reportData: any;
};

async function create(body: CreateReportRequestBody) {
  return api.post("/reports", body);
}

async function getAll(userId: string) {
  return api.get(`/reports/${userId}`);
}

export const reports = {
  create,
  getAll,
};
