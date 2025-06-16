"use client";

import { ChevronLeft, ChevronRight, ListFilter } from "lucide-react";
import { useState } from "react";
import { cn } from "~/lib/utils";
import { JobSuggestionCard } from "./JobsSuggestion";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./ui/select";

enum EFilterType {
  Location = "location",
  Exp = "exp",
  Job = "job",
  Salary = "salary",
}

const FilterType: {
  value: string;
  label: string;
}[] = [
  { value: EFilterType.Location, label: "Vị trí" },
  { value: EFilterType.Exp, label: "Kinh nghiệm" },
  { value: EFilterType.Job, label: "Ngành nghề" },
  { value: EFilterType.Salary, label: "Mức lương" },
];

const FilterValue: {
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

export default function NewRecruitments() {
  const [filterType, setFilterType] = useState<string>(FilterType[0].value);

  const [filterValue, setFilterValue] = useState<number | null>(null);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPage = 24;
  const hasNextPage = true;
  const hasPreviousPage = true;

  return (
    <div className="space-y-2">
      <p className="text-2xl font-bold text-c-primary">Việc làm mới</p>
      <div className="mb-5 flex items-center gap-10">
        <Select onValueChange={(value) => setFilterType(value)}>
          <SelectTrigger className="w-[250px]">
            <div className="flex items-center gap-2">
              <ListFilter />
              <span>Lọc theo:</span>
              <p className="text-c-text-light font-semibold">
                {FilterType.find((item) => item.value === filterType)?.label}
              </p>
            </div>
          </SelectTrigger>
          <SelectContent>
            {FilterType.map((item) => (
              <SelectItem key={`filter_${item.value}`} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex-1 flex items-center gap-4">
          {FilterValue[filterType as EFilterType].map((item, index) => (
            <Button
              variant={"custom"}
              key={`filter_value_${index}_type_${filterType}`}
              onClick={() => setFilterValue(item.value)}
              className={cn(
                item.value !== filterValue &&
                  "bg-other_divider/30 text-c-text-light hover:bg-white/20 border hover:border-c-primary"
              )}
            >
              {item.label}
            </Button>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap gap-4">
        {new Array(12).fill(0).map((item, index) => (
          <JobSuggestionCard key={index} className="w-[calc((100%-32px)/3)]" />
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
