import { Bell } from "lucide-react";
import { ProfileDropdownMenu } from "~/components/TopBar";
import RecruitmentSideBar from "~/components/recruiter-component/RecruitmentSideBar";
import { Button } from "~/components/ui/button";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <div className="flex items-center justify-between bg-[#3D365C] pl-5 pr-10">
        <div className="shrink-0 flex gap-1 items-center">
          <div>
            <img
              src="/large_logo_w_text-removebg-preview.png"
              alt="logo"
              className="h-[72px]"
            />
          </div>
        </div>
        <div className="flex items-center gap-4 shrink-0">
          <Button
            size="icon"
            className="cursor-pointer rounded-full bg-transparent"
          >
            <Bell className="text-c-text-dark" fill="#fef3e2" />
          </Button>
          <ProfileDropdownMenu />
        </div>
      </div>
      <div className="flex bg-other-rested-bg">
        <RecruitmentSideBar />
        {children}
      </div>
    </>
  );
}
