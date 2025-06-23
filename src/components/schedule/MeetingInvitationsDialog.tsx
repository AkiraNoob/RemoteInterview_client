"use client";

import dayjs from "dayjs";
import { SquareArrowOutUpRight, XIcon } from "lucide-react";
import * as React from "react";
import useGetAllPendingMeetingInvitation from "~/hook/useGetMeetingInvitations";
import useRespondMeetingInvitation from "~/hook/useRespondMeetingInvitation";
import {
  IMeetingInvitationDTO,
  UserMeetingStatusEnum,
} from "~/types/meeting.types";
import { Button } from "../ui/button";
import { DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export default function MeetingInvitationsDialog({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { query } = useGetAllPendingMeetingInvitation({});

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
        {query.data?.map((item, index) => (
          <MeetingInvitation key={index} item={item} />
        ))}
      </div>
    </DialogContent>
  );
}

function MeetingInvitation({ item }: { item: IMeetingInvitationDTO }) {
  const {
    mutation: { mutate, isPending },
  } = useRespondMeetingInvitation({});
  const [state, setState] = React.useState<UserMeetingStatusEnum | null>(null);

  return (
    <div className="flex w-full px-3 pb-3 border-b">
      <div className="flex-1">
        <p className="text-2xl font-semibold">{item.recruitmentTitle}</p>
        <p className="text-lg font-normal">{item.employerName}</p>
        <p>
          <span className="font-semibold">Thời gian:</span>{" "}
          <span>
            Từ {dayjs(item.startTime).format("HH:mm DD:MM:YYYY")} đến{" "}
            {!item.endTime
              ? "Không rõ"
              : dayjs(item.endTime).format("HH:mm DD:MM:YYYY")}
          </span>
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
        <Button
          loading={isPending && state === UserMeetingStatusEnum.Accepted}
          disabled={isPending}
          onClick={() => {
            setState(UserMeetingStatusEnum.Accepted);
            mutate({
              invitationId: item.id,
              status: UserMeetingStatusEnum.Accepted,
            });
          }}
          variant={"success"}
        >
          Chấp nhận
        </Button>
        <Button
          loading={isPending && state === UserMeetingStatusEnum.Rejected}
          disabled={isPending}
          onClick={() => {
            setState(UserMeetingStatusEnum.Rejected);
            mutate({
              invitationId: item.id,
              status: UserMeetingStatusEnum.Rejected,
            });
          }}
          variant={"error"}
        >
          Từ chối
        </Button>
      </div>
    </div>
  );
}
