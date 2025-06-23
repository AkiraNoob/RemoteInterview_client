"use client";

import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";
import { getSuggestRecruitments } from "~/api/recruitments";
import { IPaginationResponse, IQueryOptions } from "~/types/generic.types";
import {
  IGetSuggestRecruitments,
  IRecruitmentDTO,
} from "~/types/recruitment.types";

export default function useGetSuggestRecruitment({
  data,
  props,
}: { data: Omit<IGetSuggestRecruitments, "pageNumber"> } & IQueryOptions<
  IPaginationResponse<IRecruitmentDTO>
>) {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const query = useQuery<IPaginationResponse<IRecruitmentDTO>, AxiosError>({
    ...props,
    queryKey: ["suggest_recruitment", data.recruitmentId],
    queryFn: async () =>
      await getSuggestRecruitments({ ...data, pageNumber: currentPage }),
  });

  return { query, currentPage, setCurrentPage };
}
