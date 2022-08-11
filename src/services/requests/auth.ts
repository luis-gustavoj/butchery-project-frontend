import { User } from "src/@types";
import { api } from "../api";

type RegisterUserRequestBody = {
  firstName: string;
  lastName: string;
  orgName: string;
  email: string;
  password: string;
  address: string;
  userType: string;
};

async function register(body: RegisterUserRequestBody) {
  return api.post("/users", body);
}

type LoginUserRequestBody = {
  email: string;
  password: string;
};

type LoginResponse = {
  user: User;
  token: string;
};

async function login(body: LoginUserRequestBody) {
  return api.post<LoginResponse>("/login", body);
}

export const auth = {
  login,
  register,
};
