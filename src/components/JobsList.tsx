"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { ComponentPropsWithoutRef, useContext } from "react";
import { SearchContext } from "~/app/(layout_w_search_top_bar)/search/provider";
import { province } from "~/data/province_data";
import { formatCurrency } from "~/helpers/stringHelper";
import { cn } from "~/lib/utils";
import { IRecruitmentDTO } from "~/types/recruitment.types";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import CompanyLogo from "./ui/company-logo";

export default function JobList(props: ComponentPropsWithoutRef<"div">) {
  const { query, currentPage, setCurrentPage } = useContext(SearchContext);

  return (
    <div>
      <div {...props} className={cn("space-y-4", props.className)}>
        {query?.data?.data.map((item, index) => (
          <JobListCard key={index} data={item} />
        ))}
      </div>

      <div className="flex items-center justify-center gap-4 mt-5">
        <Button
          disabled={!query?.data?.hasPreviousPage}
          className={cn(
            "rounded-full size-9, border-c-primary hover:bg-c-primary hover:text-c-text-dark"
          )}
          size={"icon"}
          variant={"outline"}
        >
          <ChevronLeft size={"5"} />
        </Button>
        <p className="text-c-text-light text-sm font-normal">
          {currentPage} / {query?.data?.totalPages} trang
        </p>
        <Button
          disabled={!query?.data?.hasNextPage}
          className={cn(
            "rounded-full size-9, border-c-primary hover:bg-c-primary hover:text-c-text-dark"
          )}
          size={"icon"}
          variant={"outline"}
        >
          <ChevronRight size={"5"} />
        </Button>
      </div>
    </div>
  );
}

export const JobListCard = ({ data }: { data: IRecruitmentDTO }) => {
  return (
    <div className="border p-2 flex gap-2 rounded-lg bg-other-rested-bg hover:border-c-primary group transition-all ease-linear shadow-md">
      <CompanyLogo src="/logo_title.png" className="w-[106px] h-[106px]" />
      <div className="space-y-2 flex-1">
        <div className="flex gap-4">
          <p className="flex-1 font-semibold text-xl group-hover:text-c-primary">
            {data.title}
          </p>
          <p className="flex-shrink-0 text-md font-semibold">
            Lên tới {formatCurrency(data.maxSalary)} triệu
          </p>
        </div>
        <p className="font-normal text-gray-800 text-md">{data.companyName}</p>
        <div className="flex gap-3 flex-wrap">
          <Badge variant={"light"}>
            {province.find((item) => item.code == data.provinceId)?.name}
          </Badge>
          <Badge variant={"light"}>
            &gt;= {data.minExperience} năm kinh nghiệm
          </Badge>
        </div>
        <div className="flex justify-end">
          <p className="text-sm text-gray-500 font-medium">Đăng x tuần trước</p>
        </div>
      </div>
    </div>
  );
};
