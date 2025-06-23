"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ComponentPropsWithoutRef } from "react";
import { PATH_NAME } from "~/constants/pathName";
import { province } from "~/data/province_data";
import { formatCurrency } from "~/helpers/stringHelper";
import useGetSuggestRecruitment from "~/hook/useGetSuggestRecruitment";
import { cn } from "~/lib/utils";
import { IRecruitmentDTO } from "~/types/recruitment.types";
import { Badge } from "./ui/badge";
import CompanyLogo from "./ui/company-logo";

export default function JobsSuggestion() {
  const params = useParams();
  const recruitmentId = params?.jid;

  const {
    query: { data },
  } = useGetSuggestRecruitment({
    data: {
      recruitmentId: recruitmentId as string,
      pageSize: 9,
    },
  });

  return (
    <div className={"p-5 bg-white rounded-lg space-y-3 h-fit"}>
      <p className="font-bold text-xl">Gợi ý việc làm phù hợp</p>

      <div className={"space-y-3"}>
        {data?.data ? (
          data?.data.map((item, index) => (
            <JobSuggestionCard data={item} key={index} />
          ))
        ) : (
          <p className="italic">Chưa có việc làm phù hợp</p>
        )}
      </div>
    </div>
  );
}

export const JobSuggestionCard = ({
  data,
  ...props
}: ComponentPropsWithoutRef<"a"> & {
  data: IRecruitmentDTO;
}) => {
  return (
    <Link
      {...props}
      className={cn(
        "p-3 rounded-lg border bg-c-text-dark/30 hover:border-c-primary group transition-all ease-linear space-y-2 cursor-pointer block",
        props.className
      )}
      href={PATH_NAME.RECRUITMENT_DETAIL.replace("[jid]", data.id)}
    >
      <div className="flex gap-2 items-center">
        <CompanyLogo src="/logo_title.png" className="w-[50px] h-[50px]" />
        <div className="flex-1">
          <p className="font-semibold text-md line-clamp-2 group-hover:text-c-primary break-word-legacy">
            {data.title}
          </p>
          <p className="font-medium text-c-text-light/60 text-sm truncate">
            {data.companyName}
          </p>
        </div>
      </div>
      <div>
        <div className="flex gap-3 flex-wrap">
          <Badge variant={"light"}>
            Lên tới {formatCurrency(data.maxSalary)}
          </Badge>
          <Badge variant={"light"}>
            {province.find((item) => item.code == data.provinceId)?.name}
          </Badge>
        </div>
      </div>
    </Link>
  );
};
