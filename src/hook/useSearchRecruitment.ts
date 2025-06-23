import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";
import { getListRecruitment } from "~/api/recruitments";
import { Experiences } from "~/constants/experiences";
import { IPaginationResponse, IQueryOptions } from "~/types/generic.types";
import { IRecruitmentDTO } from "~/types/recruitment.types";

export default function useSearchRecruitment({
  keyword,
  props,
}: {
  keyword: string;
} & IQueryOptions<IPaginationResponse<IRecruitmentDTO>>) {
  const [minSalary, setMinSalary] = useState<string>("");
  const [maxSalary, setMaxSalary] = useState<string>("");

  const [minExperience, setMinExperience] = useState<string>(
    Experiences["ALL"].value
  );
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [provinceId, setProvinceId] = useState("");
  const [districtId, setDistrictId] = useState("");

  const query = useQuery<IPaginationResponse<IRecruitmentDTO>, AxiosError>({
    ...props,
    queryKey: ["search_recruitment"],
    queryFn: async () =>
      getListRecruitment({
        keyword: keyword,
        pageNumber: currentPage,
        pageSize: 12,
        minSalary: parseInt(minSalary),
        maxSalary: parseInt(maxSalary),
        minExperience: parseInt(minExperience),
        provinceId: parseInt(provinceId),
        districtId: parseInt(districtId),
      }),
  });

  return {
    currentPage,
    setCurrentPage,
    query,
    minSalary,
    setMinSalary,
    maxSalary,
    setMaxSalary,
    minExperience,
    setMinExperience,
    provinceId,
    setProvinceId,
    districtId,
    setDistrictId,
  };
}
