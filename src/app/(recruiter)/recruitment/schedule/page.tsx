"use client";

import SchedulerWrapper from "~/components/schedule/_components/view/schedular-view-filteration";

export default function SchedulePage() {
  return (
    <div className="h-[calc(100dvh-72px)] flex flex-col w-full">
      <div className="relative flex-1 flex flex-col bg-white rounded-lg p-3">
        <div className="p-5 flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Lịch phỏng vấn</h1>
        </div>
        <SchedulerWrapper
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
