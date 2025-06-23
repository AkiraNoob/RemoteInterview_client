export interface ILoginForm {
  email: string;
  password: string;
}

export interface IRegisterForm {
  email: string;
  password: string;
  fullName: string;
}

export interface ILoginResponse {
  token: string;
  refreshToken: string;
  refreshTokenExpiryTime: string;
  isOnboarded: boolean;
  userId: string;
}
