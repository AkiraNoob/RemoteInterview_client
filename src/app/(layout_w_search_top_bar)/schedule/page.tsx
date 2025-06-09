import SchedulerWrapper from "~/components/schedule/_components/view/schedular-view-filteration";

export default function SchedulePage() {
  return (
    <section className="relative flex flex-col p-5 h-[calc(100dvh-72px)] overflow-y-scroll">
      <SchedulerWrapper
        stopDayEventSummary={true}
        classNames={{
          tabs: {
            panel: "p-0",
          },
        }}
      />
    </section>
  );
}
