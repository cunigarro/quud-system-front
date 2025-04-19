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

export interface RegisterResponse {
  data: {
    access_token: string;
  };
}

export interface LoginResponse {
  data: {
    token: {
      access_token: string;
    };
  };
}

interface Auth {
  token: string;
}

export interface Register extends Auth {}
export interface Login extends Auth {}
