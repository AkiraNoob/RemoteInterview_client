"use client";

import dayjs from "dayjs";
import { Clock4, DollarSign, Hourglass, MapPin, Send } from "lucide-react";
import { useContext, useState } from "react";
import { RecruitmentDetailContext } from "~/app/(layout_w_search_top_bar)/job/[jid]/provider";
import cookieCommons from "~/helpers/cookieCommon";
import { formatCurrency } from "~/helpers/stringHelper";
import ApplyRecruitmentModal from "./ApplyRecruitmentModal";
import { Button } from "./ui/button";
import { Dialog, DialogTrigger } from "./ui/dialog";

export default function ShortenedJobDescription() {
  const { data } = useContext(RecruitmentDetailContext);

  return (
    <div className="rounded-lg p-5 bg-white space-y-4">
      <h3 className="text-xl font-bold">Tên công việc</h3>
      <div className="flex gap-14 items-center">
        <div className="flex items-center gap-3">
          <div className="rounded-full p-2 bg-c-primary text-c-text-dark">
            <DollarSign />
          </div>
          <div>
            <p className="text-other_helper_text text-sm">Mức lương</p>
            <p className="font-semibold text-md text-c-text-light">
              Lên tới {formatCurrency(data?.maxSalary || 0)} triệu
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="rounded-full p-2 bg-c-primary text-c-text-dark">
            <MapPin />
          </div>
          <div>
            <p className="text-other_helper_text text-sm">Địa điểm</p>
            <p className="font-semibold text-md text-c-text-light">
              {data?.address}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="rounded-full p-2 bg-c-primary text-c-text-dark">
            <Hourglass />
          </div>
          <div>
            <p className="text-other_helper_text text-sm">Kinh nghiệm</p>
            <p className="font-semibold text-md text-c-text-light">
              Tối thiểu {data?.minExperience} năm
            </p>
          </div>
        </div>
      </div>

      <div className="bg-other-rested-bg w-fit flex items-center gap-2 px-2 rounded-md">
        <Clock4 size={20} fill="#7f878f" className="text-white" />
        <p className="text-md text-c-text-light">
          Hạn nộp hồ sơ: {dayjs(data?.expiredData).format("dd/mm/yyyy")}
        </p>
      </div>
      {data?.companyId === cookieCommons.getUserId() ? (
        <></>
      ) : (
        <ApplyButton recruitmentId={data?.id || ""} />
      )}
    </div>
  );
}

function ApplyButton({ recruitmentId }: { recruitmentId: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Dialog open={open}>
        <DialogTrigger asChild>
          <Button
            onClick={() => setOpen((p) => !p)}
            className="w-full"
            variant={"custom"}
          >
            <Send color="#ffffff" />
            Ứng tuyển ngay
          </Button>
        </DialogTrigger>
        {open && (
          <ApplyRecruitmentModal
            setOpen={setOpen}
            recruitmentId={recruitmentId}
          />
        )}
      </Dialog>
    </>
  );
}
