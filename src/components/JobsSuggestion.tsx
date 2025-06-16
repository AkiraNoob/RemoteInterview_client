import { ComponentPropsWithoutRef } from "react";
import { cn } from "~/lib/utils";
import { Badge } from "./ui/badge";
import CompanyLogo from "./ui/company-logo";

export default function JobsSuggestion() {
  return (
    <div className={"p-5 bg-white rounded-lg space-y-3 h-fit"}>
      <p className="font-bold text-xl">Gợi ý việc làm phù hợp</p>

      <div className={"space-y-3"}>
        {new Array(4).fill(0).map((item, index) => (
          <JobSuggestionCard key={index} />
        ))}
      </div>
    </div>
  );
}

export const JobSuggestionCard = (props: ComponentPropsWithoutRef<"div">) => {
  return (
    <div
      {...props}
      className={cn(
        "p-3 rounded-lg border bg-c-text-dark/30 hover:border-c-primary group transition-all ease-linear space-y-2",
        props.className
      )}
    >
      <div className="flex gap-2 items-center">
        <CompanyLogo src="/logo_title.png" className="w-[50px] h-[50px]" />
        <div className="flex-1">
          <p className="font-semibold text-md line-clamp-2 group-hover:text-c-primary">
            Tên công việc
          </p>
          <p className="font-medium text-c-text-light/60 text-sm truncate">
            Tên doanh nghiệp
          </p>
        </div>
      </div>
      <div>
        <div className="flex gap-3 flex-wrap">
          <Badge variant={"light"}>Lên tới xxx triệu</Badge>
          <Badge variant={"light"}>Thành phố</Badge>
        </div>
      </div>
    </div>
  );
};
