"use client";

import { ChevronLeft, ChevronRight, ListFilter } from "lucide-react";
import useNewRecruitment, {
  EFilterType,
  FilterType,
  FilterValue,
} from "~/hook/useGetNewestRecruitment";
import { cn } from "~/lib/utils";
import { JobSuggestionCard } from "./JobsSuggestion";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./ui/select";

export default function NewRecruitments() {
  const {
    currentPage,
    setCurrentPage,
    filterType,
    setFilterType,
    filterValue,
    setFilterValue,
    query,
  } = useNewRecruitment({});

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
        {query.data?.data.map((item, index) => (
          <JobSuggestionCard
            data={item}
            key={index}
            className="w-[calc((100%-32px)/3)]"
          />
        ))}
      </div>
      <div className="flex items-center justify-center gap-4 mt-5">
        <Button
          disabled={!query.data?.hasPreviousPage}
          className={cn(
            "rounded-full size-9, border-c-primary hover:bg-c-primary hover:text-c-text-dark"
          )}
          size={"icon"}
          variant={"outline"}
        >
          <ChevronLeft size={"5"} />
        </Button>
        <p className="text-c-text-light text-sm font-normal">
          {currentPage} / {query.data?.totalPages} trang
        </p>
        <Button
          disabled={!query.data?.hasNextPage}
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
