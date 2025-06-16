"use client";

import { SquareArrowOutUpRight, XIcon } from "lucide-react";
import * as React from "react";
import { Button } from "../ui/button";
import { DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export default function MeetingInvitationsDialog({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <DialogContent
      showCloseButton={false}
      className="!max-w-[1000px] max-h-[800px] overflow-y-scroll w-full"
    >
      <DialogHeader className="flex flex-row items-center justify-between">
        <DialogTitle className="text-2xl">
          Danh sách lời mời phỏng vấn
        </DialogTitle>
        <Button
          variant={"ghost"}
          size={"icon"}
          onClick={() => setOpen(false)}
          className="rounded-full"
        >
          <XIcon className="size-6" />
        </Button>
      </DialogHeader>
      <div className="space-y-3">
        {new Array(10).fill(0).map((item, index) => (
          <MeetingInvitation key={index} />
        ))}
      </div>
    </DialogContent>
  );
}

function MeetingInvitation() {
  return (
    <div className="flex w-full px-3 pb-3 border-b">
      <div className="flex-1">
        <p className="text-2xl font-semibold">Tiêu đề tuyển dụng</p>
        <p className="text-lg font-normal">Tên công ty</p>
        <p>
          <span className="font-semibold">Thời gian:</span>{" "}
          <span>10:30 dd/mm/yyyy</span>
        </p>
        <p className="text-sm italic text-other_helper_text">
          Thời gian trên không phù hợp với bạn?{" "}
          <span className="underline underline-offset-2 text-c-primary cursor-pointer">
            Nhắn tin
          </span>{" "}
          với nhà tuyển dụng ngay.
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Tooltip>
          <TooltipContent>Xem chi tiết</TooltipContent>
          <TooltipTrigger asChild>
            <Button size={"icon"} variant={"ghost"} className="rounded-full">
              <SquareArrowOutUpRight />
            </Button>
          </TooltipTrigger>
        </Tooltip>
        <Button variant={"success"}>Chấp nhận</Button>
        <Button variant={"error"}>Từ chối</Button>
      </div>
    </div>
  );
}
