import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";
import { getListNewestRecruitment } from "~/api/recruitments";
import { IPaginationResponse, IQueryOptions } from "~/types/generic.types";
import { IRecruitmentDTO } from "~/types/recruitment.types";

export enum EFilterType {
  Location = "location",
  Exp = "exp",
  Job = "job",
  Salary = "salary",
}

export const FilterType: {
  value: string;
  label: string;
}[] = [
  { value: EFilterType.Location, label: "Vị trí" },
  { value: EFilterType.Exp, label: "Kinh nghiệm" },
  { value: EFilterType.Job, label: "Ngành nghề" },
  { value: EFilterType.Salary, label: "Mức lương" },
];

export const FilterValue: {
  [key in EFilterType]: { value: number | null; label: string }[];
} = {
  [EFilterType.Location]: [
    { value: null, label: "Ngẫu nhiên" },
    { value: 1, label: "Hà Nội" },
    { value: 79, label: "Hồ Chí Minh" },
    { value: 48, label: "Đà Nẵng" },
  ],
  [EFilterType.Exp]: [
    { value: null, label: "Tất cả" },
    { value: 1, label: "Tối thiểu 1 năm" },
    { value: 2, label: "Tối thiểu 2 năm" },
    { value: 3, label: "Tối thiểu 3 năm" },
    { value: 4, label: "Tối thiểu 4 năm" },
    { value: 5, label: "Tối thiểu 5 năm" },
  ],
  [EFilterType.Salary]: [
    { value: null, label: "Tất cả" },
    { value: 10, label: "Dưới 10 triệu" },
    { value: 15, label: "Dưới 15 triệu" },
    { value: 20, label: "Dưới 20 triệu" },
    { value: 30, label: "Dưới 30 triệu" },
  ],
  [EFilterType.Job]: [
    { value: null, label: "Tất cả" },
    { value: 1, label: "IT" },
    { value: 2, label: "Kế toán" },
    { value: 3, label: "Kinh doanh" },
    { value: 4, label: "Bất động sản" },
  ],
};

export default function useGetNewestRecruitment({
  props,
}: IQueryOptions<IPaginationResponse<IRecruitmentDTO>>) {
  const [filterType, setFilterType] = useState<string>(FilterType[0].value);

  const [filterValue, setFilterValue] = useState<number | null>(null);

  const [currentPage, setCurrentPage] = useState<number>(1);

  const query = useQuery<IPaginationResponse<IRecruitmentDTO>, AxiosError>({
    ...props,
    queryKey: ["newest_recruitment"],
    queryFn: async () =>
      getListNewestRecruitment({
        pageNumber: currentPage,
        pageSize: 12,
        tagId: filterType === EFilterType.Job ? filterValue?.toString() : null,
        minSalary: filterType === EFilterType.Salary ? filterValue : null,
        minExperience: filterType === EFilterType.Exp ? filterValue : null,
        provinceId: filterType === EFilterType.Location ? filterValue : null,
      }),
  });

  return {
    currentPage,
    setCurrentPage,
    filterType,
    setFilterType,
    filterValue,
    setFilterValue,
    query,
  };
}
