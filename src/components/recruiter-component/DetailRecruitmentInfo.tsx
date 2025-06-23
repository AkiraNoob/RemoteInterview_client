"use client";

import { PencilLine } from "lucide-react";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { useState } from "react";
import { formatCurrency } from "~/helpers/stringHelper";
import useRecruitmentDetail from "~/hook/useRecruitmentDetail";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Dialog, DialogTrigger } from "../ui/dialog";

const RecruitmentModal = dynamic(() => import("./RecruitmentModal"), {
  ssr: false,
});

export default function DetailRecruitmentInfo() {
  const [open, setOpen] = useState(false);
  const params = useParams();
  const recruitmentId = params?.rid;

  const {
    query: { data },
  } = useRecruitmentDetail({
    recruitmentId: recruitmentId as string,
  });

  return (
    <div className="bg-white rounded-lg p-5 space-y-2">
      <p className="font-semibold text-2xl">{data?.title}</p>
      <div className="flex items-center gap-2">
        <span className="text-md font-semibold">Ngành nghề:</span>
        <div className="flex flex-wrap gap-3">
          <Badge variant={"light"}>{data?.professionName}</Badge>
        </div>
      </div>
      <div>
        <p>
          <span className="text-md font-semibold">Địa chỉ: </span>{" "}
          {data?.address}
        </p>
      </div>
      <div>
        <p>
          <span className="text-md font-semibold">Kinh nghiệm tối thiểu: </span>{" "}
          {data?.minExperience} năm
        </p>
      </div>
      <div>
        <p>
          <span className="text-md font-semibold">Mức lương tối đa: </span>{" "}
          {formatCurrency(data?.maxSalary || 0)}
        </p>
      </div>
      <Dialog open={open}>
        <DialogTrigger asChild>
          <Button onClick={() => setOpen((p) => !p)} variant="custom">
            Xem chi tiết và chỉnh sửa
            <PencilLine />
          </Button>
        </DialogTrigger>
        {open && (
          <RecruitmentModal setOpen={setOpen} recruitmentId={data?.id} />
        )}
      </Dialog>
    </div>
  );
}
