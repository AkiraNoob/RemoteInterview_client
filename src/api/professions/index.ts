import httpRequest from "~/services/axios/httpRequest";
import { IProfesisonDTO } from "~/types/profession.types";

export const postCreateProfessions = (data: { professionNames: string[] }) => {
  return httpRequest.post("/professions", data);
};

export const getAllProfessions = () => {
  return httpRequest.get<IProfesisonDTO[]>("/professions");
};

export const putUpdateProfession = (id: string, name: string) => {
  return httpRequest.put(`/professions/${id}`, {
    name,
  });
};

export const deleteProfession = (id: string) => {
  return httpRequest.delete(`/professions/${id}`);
};
