"use client";

import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";
import { getListRecruitmentOfAUser } from "~/api/recruitments";
import { IPaginationResponse, IQueryOptions } from "~/types/generic.types";
import {
  IGetListRecruitmentOfAUser,
  IRecruitmentDTO,
} from "~/types/recruitment.types";

export default function useGetListRecruitmentOfAUser({
  props,
  data,
}: {
  data: Omit<IGetListRecruitmentOfAUser, "pageNumber">;
} & IQueryOptions<IPaginationResponse<IRecruitmentDTO>>) {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const query = useQuery<IPaginationResponse<IRecruitmentDTO>, AxiosError>({
    ...props,
    queryKey: [
      "recruitment_user",
      data.employerId,
      data.status,
      currentPage,
      data.pageSize,
    ],
    queryFn: async () =>
      getListRecruitmentOfAUser({ ...data, pageNumber: currentPage }),
  });

  return {
    currentPage,
    setCurrentPage,
    query,
  };
}
