import TopBar from "~/components/TopBar";

export default async function LayoutWSearchTopBar({
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
