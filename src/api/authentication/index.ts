import { setAuthCookies, setUserInfoCookies } from "~/helpers/authFunction";
import httpRequest from "~/services/axios/httpRequest";
import {
  ILoginForm,
  ILoginResponse,
  IRegisterForm,
} from "~/types/authentication.types";

export const postLogin = (data: ILoginForm) => {
  return httpRequest
    .post<ILoginResponse>("/authentication/login", data)
    .then((res) => {
      setAuthCookies(res);
      setUserInfoCookies(res);
      return res;
    });
};

export const postRegister = (data: IRegisterForm) => {
  return httpRequest.post<string>("/authentication/sign-up", data);
};
