export interface RegisterResponse {
  data: {
    token: {
      access_token: string;
    };
  };
}

export interface LoginResponse {
  data: {
    token: {
      access_token: string;
    };
  };
}
