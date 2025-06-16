"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { ComponentPropsWithoutRef, useState } from "react";
import { cn } from "~/lib/utils";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import CompanyLogo from "./ui/company-logo";

export default function JobList(props: ComponentPropsWithoutRef<"div">) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPage = 24;
  const hasNextPage = true;
  const hasPreviousPage = true;

  return (
    <div>
      <div {...props} className={cn("space-y-4", props.className)}>
        {new Array(5).fill(0).map((item, index) => (
          <JobListCard key={index} />
        ))}
      </div>

      <div className="flex items-center justify-center gap-4 mt-5">
        <Button
          disabled={!hasPreviousPage}
          className={cn(
            "rounded-full size-9, border-c-primary hover:bg-c-primary hover:text-c-text-dark"
          )}
          size={"icon"}
          variant={"outline"}
        >
          <ChevronLeft size={"5"} />
        </Button>
        <p className="text-c-text-light text-sm font-normal">
          {currentPage} / {totalPage} trang
        </p>
        <Button
          disabled={!hasNextPage}
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

export const JobListCard = () => {
  return (
    <div className="border p-2 flex gap-2 rounded-lg bg-other-rested-bg hover:border-c-primary group transition-all ease-linear shadow-md">
      <CompanyLogo src="/logo_title.png" className="w-[106px] h-[106px]" />
      <div className="space-y-2 flex-1">
        <div className="flex gap-4">
          <p className="flex-1 font-semibold text-xl group-hover:text-c-primary">
            Tên công việc
          </p>
          <p className="flex-shrink-0 text-md font-semibold">Up to xxx triệu</p>
        </div>
        <p className="font-normal text-gray-800 text-md">Tên doanh nghiệp</p>
        <div className="flex gap-3 flex-wrap">
          <Badge variant={"light"}>Thành phố</Badge>
          <Badge variant={"light"}>&gt;= x năm kinh nghiệm</Badge>
        </div>
        <div className="flex justify-end">
          <p className="text-sm text-gray-500 font-medium">Đăng x tuần trước</p>
        </div>
      </div>
    </div>
  );
};
