"use client";

import { UseQueryResult } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSearchParams } from "next/navigation";
import { createContext } from "react";
import { Experiences } from "~/constants/experiences";
import useSearchRecruitment from "~/hook/useSearchRecruitment";
import { IPaginationResponse } from "~/types/generic.types";
import { IRecruitmentDTO } from "~/types/recruitment.types";

export interface ISearchRecruitmentContext {
  currentPage: number;
  setCurrentPage: (page: number) => void;

  minSalary: string;
  setMinSalary: (value: string) => void;

  maxSalary: string;
  setMaxSalary: (value: string) => void;

  minExperience: string;
  setMinExperience: (value: string) => void;

  provinceId: string;
  setProvinceId: (value: string) => void;

  districtId: string;
  setDistrictId: (value: string) => void;

  query:
    | UseQueryResult<IPaginationResponse<IRecruitmentDTO>, AxiosError>
    | undefined;
}

export const SearchContext = createContext<ISearchRecruitmentContext>({
  currentPage: 1,
  setCurrentPage: () => {},
  minSalary: "",
  setMinSalary: () => {},
  maxSalary: "",
  setMaxSalary: () => {},
  minExperience: Experiences["ALL"].value,
  setMinExperience: () => {},
  provinceId: "",
  setProvinceId: () => {},
  districtId: "",
  setDistrictId: () => {},
  query: undefined,
});

export default function SearchProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const searchParams = useSearchParams();

  const keyword = searchParams.get("keyword");

  const props = useSearchRecruitment({ keyword: keyword || "" });

  return (
    <SearchContext.Provider value={{ ...props }}>
      {children}
    </SearchContext.Provider>
  );
}
