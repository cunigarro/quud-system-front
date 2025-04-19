import { ApiResponse } from "./api.model";

export interface RegisterUserBody {
  name: string;
  last_names: string;
  cellphone: number;
  email: string;
  password: string;
}

export interface LoginBody {
  username: string;
  password: string;
}

export type RegisterResponse = ApiResponse<{ access_token: string }>;

export type LoginResponse = ApiResponse<{
  token: {
    access_token: string
  }
}>;

interface Auth {
  token: string;
}

export interface Register extends Auth {}
export interface Login extends Auth {}
