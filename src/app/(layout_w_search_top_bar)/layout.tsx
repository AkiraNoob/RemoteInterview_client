import TopBar from "~/components/TopBar";

export default function LayoutWSearchTopBar({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <TopBar withSearch />
      {children}
    </div>
  );
}
