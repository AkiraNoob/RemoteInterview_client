"use client";

import { PencilLine } from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Dialog, DialogTrigger } from "../ui/dialog";

const RecruitmentModal = dynamic(() => import("./RecruitmentModal"), {
  ssr: false,
});

export default function DetailRecruitmentInfo() {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white rounded-lg p-5 space-y-2">
      <p className="font-semibold text-2xl">Tiêu đề tuyển dụng</p>
      <div className="flex items-center gap-2">
        <span className="text-md font-semibold">Từ khoá:</span>
        <div className="flex flex-wrap gap-3">
          <Badge variant={"light"}>Developer</Badge>
          <Badge variant={"light"}>IT</Badge>
        </div>
      </div>
      <div>
        <p>
          <span className="text-md font-semibold">Địa chỉ: </span> Đường x, Quận
          y, TP. Hồ Chí Minh
        </p>
      </div>
      <div>
        <p>
          <span className="text-md font-semibold">Kinh nghiệm tối thiểu: </span>{" "}
          x năm
        </p>
      </div>
      <div>
        <p>
          <span className="text-md font-semibold">Mức lương tối đa: </span> xxx
          triệu
        </p>
      </div>
      <Dialog open={open}>
        <DialogTrigger asChild>
          <Button onClick={() => setOpen((p) => !p)} variant="custom">
            Xem chi tiết và chỉnh sửa
            <PencilLine />
          </Button>
        </DialogTrigger>
        {open && <RecruitmentModal setOpen={setOpen} />}
      </Dialog>
    </div>
  );
}
