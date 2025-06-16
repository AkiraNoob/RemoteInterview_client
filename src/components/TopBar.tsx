import { AvatarImage } from "@radix-ui/react-avatar";
import {
  CalendarCheck,
  ChevronDown,
  ChevronsRight,
  UserRound,
} from "lucide-react";
import JobsSearchInput from "./JobsSearchInput";
import Notifications from "./Notifications";
import { Avatar } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Separator } from "./ui/separator";

export default function TopBar({
  withSearch = false,
}: {
  withSearch?: boolean;
}) {
  return (
    <div className="flex items-center justify-between bg-c-primary px-5">
      <div className="shrink-0">
        <img
          src="/large_logo_w_text-removebg-preview.png"
          alt="logo"
          className="h-[72px]"
        />
      </div>
      {withSearch && <JobsSearchInput className="my-2 border-none" />}
      <div className="flex items-center gap-4 shrink-0">
        <Notifications />
        <ProfileDropdownMenu />
        <Separator orientation="vertical" className="!h-10 bg-c-text-dark" />
        <div className="text-c-text-dark">
          <p className="font-normal text-sm select-none">
            Bạn là nhà tuyển dụng?
          </p>
          <p className="font-semibold text-lg flex items-center gap-1 cursor-pointer hover:underline hover:underline-offset-3">
            Đăng tuyển ngay <ChevronsRight size={20} className="mt-[1px]" />
          </p>
        </div>
      </div>
    </div>
  );
}

export const ProfileDropdownMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full cursor-pointer relative border border-c-text-dark p-[1px] bg-white">
        <Avatar className="h-[46px] w-[46px] relative ">
          <AvatarImage src="/avatar.jpg" width={46} height={46} />
        </Avatar>
        <div className="absolute -bottom-1 -right-0.5 rounded-full border border-other_divider bg-c-text-dark">
          <ChevronDown size={14} className="text-c-dark-primary" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <div className="flex gap-4 p-2 items-center">
          <Avatar className="h-[46px] w-[46px] relative">
            <AvatarImage src="/avatar.jpg" width={46} height={46} />
          </Avatar>
          <div>
            <p className="text-lg font-semibold">Nguyễn Đức Phương</p>
            <p className="text-sm font-normal text-c-text-light/80">
              21521307@gm.uit.edu.vn
            </p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <UserRound />
          Trang cá nhân
        </DropdownMenuItem>
        <DropdownMenuItem>
          <CalendarCheck />
          Lịch phỏng vấn
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <div className="w-full">
          <Button className="w-full" variant={"ghost"}>
            Đăng xuất
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
