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
