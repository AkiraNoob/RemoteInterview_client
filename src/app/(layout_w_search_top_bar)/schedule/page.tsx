"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import SchedulerWrapper from "~/components/schedule/_components/view/schedular-view-filteration";
import { Button } from "~/components/ui/button";
import { Dialog, DialogTrigger } from "~/components/ui/dialog";
const MeetingInvitationsDialog = dynamic(
  () => import("~/components/schedule/MeetingInvitationsDialog")
);

export default function SchedulePage() {
  const [open, setOpen] = useState(false);
  return (
    <div className="h-[calc(100dvh-72px)] flex flex-col">
      <div className="relative flex-1 flex flex-col bg-white rounded-lg p-3">
        <div className="p-5 flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Lịch phỏng vấn</h1>
          <Dialog open={open}>
            <DialogTrigger asChild>
              <Button onClick={() => setOpen((p) => !p)} variant={"custom"}>
                Danh sách lời mời
              </Button>
            </DialogTrigger>
            {open && <MeetingInvitationsDialog setOpen={setOpen} />}
          </Dialog>
        </div>
        <SchedulerWrapper
          enableAddEvent={false}
          stopDayEventSummary={true}
          classNames={{
            tabs: {
              panel: "p-0",
            },
          }}
        />
      </div>
    </div>
  );
}
