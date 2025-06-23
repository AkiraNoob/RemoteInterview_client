"use client";

import { useContext } from "react";
import { RecruitmentDetailContext } from "~/app/(layout_w_search_top_bar)/job/[jid]/provider";

export default function DetailedJobDescription() {
  const { data } = useContext(RecruitmentDetailContext);

  return (
    <div className="rounded-lg p-5 bg-white space-y-4">
      <div className="space-y-4">
        <p className="font-bold text-xl">Chi tiết tuyển dụng</p>
        <div>
          <p className="font-semibold text-lg">Mô tả công việc</p>
          <div
            className="list-class"
            dangerouslySetInnerHTML={{
              __html: data?.description || "Không có",
            }}
          ></div>
        </div>
        <div>
          <p className="font-semibold text-lg">Yêu cầu công việc</p>
          <div
            className="list-class"
            dangerouslySetInnerHTML={{
              __html: data?.requirement || "Không có",
            }}
          ></div>
        </div>
        <div>
          <p className="font-semibold text-lg">Quyền lợi</p>
          <div
            className="list-class"
            dangerouslySetInnerHTML={{ __html: data?.welfare || "Không có" }}
          ></div>
        </div>
        <div>
          <p className="font-semibold text-lg">Địa điểm làm việc</p>
          <p>{data?.address}</p>
        </div>
      </div>
    </div>
  );
}
