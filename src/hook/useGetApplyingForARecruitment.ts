"use client";

import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";
import { getApplyingListOfARecruitment } from "~/api/recruitments";
import { IPaginationResponse, IQueryOptions } from "~/types/generic.types";
import {
  IApplicationDetail,
  IGetApplyingListOfARecruitment,
} from "~/types/recruitment.types";

export default function useGetApplyingForARecruitment({
  data,
  props,
}: IQueryOptions<IPaginationResponse<IApplicationDetail>> & {
  data: Omit<IGetApplyingListOfARecruitment, "pageNumber">;
}) {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const query = useQuery<IPaginationResponse<IApplicationDetail>, AxiosError>({
    ...props,
    queryKey: ["application", data.recruitmentId],
    queryFn: () =>
      getApplyingListOfARecruitment({
        ...data,
        pageNumber: currentPage,
      }),
  });

  return { query, currentPage, setCurrentPage };
}
