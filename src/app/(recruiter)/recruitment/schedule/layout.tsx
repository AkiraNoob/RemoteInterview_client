import DecoratedSchedularProvider from "~/components/schedule/provider/DecoratedSchedularProvider";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <DecoratedSchedularProvider>{children}</DecoratedSchedularProvider>;
}
