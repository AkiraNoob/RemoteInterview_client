import httpRequest from "~/services/axios/httpRequest";
import { IUserDetailResponse } from "~/types/user.types";

export const getUserDetail = (userId: string) => {
  return httpRequest.get<IUserDetailResponse>(`/user/${userId}`);
};

export const updateUserInfo = (userId: string, data: FormData) => {
  return httpRequest.put(`/user/${userId}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const putRegisterCompanyRole = (userId: string) => {
  return httpRequest.put(`/user/${userId}/register-company`, null);
};
