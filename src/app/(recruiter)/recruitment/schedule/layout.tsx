import { SchedulerProvider } from "~/context/schedular-provider";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <SchedulerProvider weekStartsOn="monday">{children}</SchedulerProvider>
  );
}
