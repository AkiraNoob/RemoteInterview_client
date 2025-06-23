"use client";

import { MapPin, UsersRound } from "lucide-react";
import { ComponentPropsWithoutRef, useContext } from "react";
import { RecruitmentDetailContext } from "~/app/(layout_w_search_top_bar)/job/[jid]/provider";
import { cn } from "~/lib/utils";
import CompanyLogo from "./ui/company-logo";

export default function CompanyDescription(
  props: ComponentPropsWithoutRef<"div">
) {
  const { data } = useContext(RecruitmentDetailContext);

  return (
    <div
      {...props}
      className={cn("p-5 bg-white rounded-lg space-y-3 h-fit", props.className)}
    >
      <div className="flex gap-5">
        <CompanyLogo src="/logo_title.png" className="w-[88px] h-[88px]" />
        <p className="text-xl font-semibold uppercase">{data?.companyName}</p>
      </div>
      <div className="space-y-2">
        <div className="flex gap-4">
          <div className="w-[100px] flex items-center text-other_helper_text gap-2 flex-shrink-0">
            <UsersRound size={18} />
            <span>Quy mô:</span>
          </div>
          <span>123 nhân viên</span>
        </div>
        <div className="flex gap-4">
          <div className="w-[100px] flex items-center h-fit gap-2 flex-shrink-0 text-other_helper_text">
            <MapPin size={18} />
            <span>Địa điểm:</span>
          </div>
          <span>{data?.companyAddress}</span>
        </div>
      </div>
    </div>
  );
}
