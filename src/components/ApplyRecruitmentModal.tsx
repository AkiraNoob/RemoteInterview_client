"use client";

import { XIcon } from "lucide-react";
import * as React from "react";
import useApplyForARecruitment from "~/hook/useApplyForARecruitment";
import { Button } from "./ui/button";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export const recruitmentAcceptTypeUpload = [
  // pdf
  "application/pdf",
  // word
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export default function ApplyRecruitmentModal({
  setOpen,
  recruitmentId,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  recruitmentId: string;
}) {
  const [cv, setCv] = React.useState<File | null>(null);

  const disabledCondition = !cv || !recruitmentId;

  const {
    mutation: { isPending, mutate },
  } = useApplyForARecruitment({
    recruitmentId,
  });

  const onSubmit = () => {
    const data = new FormData();
    if (cv) data.append("CV", cv);

    data.append("UsePreloadedCV", "false");

    mutate(data);
  };

  return (
    <DialogContent
      showCloseButton={false}
      className="!max-w-[1000px] max-h-[800px] overflow-y-scroll w-full"
    >
      <DialogHeader className="flex flex-row items-center justify-between">
        <DialogTitle className="text-2xl">Ứng tuyển</DialogTitle>
        <Button
          variant={"ghost"}
          size={"icon"}
          onClick={() => setOpen(false)}
          className="rounded-full "
        >
          <XIcon className="size-6" />
        </Button>
      </DialogHeader>
      <div className="space-y-5">
        <div className="space-y-1">
          <Label className="text-lg">Chọn CV để ứng tuyển</Label>
          <Input
            accept={recruitmentAcceptTypeUpload.join(",")}
            type="file"
            onChange={(e) => setCv(e.target.files?.[0] ?? null)}
            placeholder="CV của bạn *"
          />
        </div>
        <p>
          <b>Lưu ý:</b> Thông tin cá nhân của bạn sẽ được gửi kèm về cho nhà
          tuyển dụng.
        </p>
      </div>
      <DialogFooter>
        <Button
          disabled={disabledCondition}
          onClick={onSubmit}
          loading={isPending}
          variant={"custom"}
        >
          Ứng tuyển
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
