import { Bell, FilePlus2, HeartCrack, PartyPopper } from "lucide-react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Separator } from "./ui/separator";

export enum ENotificationType {
  Rejected = "rejected",
  Approved = "approved",
  NewApply = "newApply",
}

export default function Notifications({ admin }: { admin?: boolean }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size="icon"
          variant={"ghost"}
          className="cursor-pointer rounded-full bg-transparent hover:bg-black/20"
        >
          <Bell className="text-c-text-dark size-4.5" fill="#fef3e2" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[500px] p-0">
        <p className="text-lg font-semibold px-4 py-2">Thông báo</p>
        <Separator />
        <div className="overflow-y-scroll max-h-[600px] ">
          {new Array(10).fill(0).map((item, index) => (
            <NotificationItem
              key={index}
              type={
                admin
                  ? ENotificationType.NewApply
                  : index % 2 === 0
                  ? ENotificationType.Approved
                  : ENotificationType.Rejected
              }
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

function NotificationItem({ type }: { type: ENotificationType }) {
  const hash = {
    [ENotificationType.Approved]: <CVGettingApprovedNotification />,
    [ENotificationType.Rejected]: <CVGettingRejectedNotification />,
    [ENotificationType.NewApply]: <GetRecruitmentApplyingNotification />,
  };

  return (
    <div className="hover:bg-other-rested-foreground/70 cursor-default transition-all ease-linear">
      {hash[type]}
    </div>
  );
}

function CVGettingRejectedNotification() {
  return (
    <div className="flex items-center gap-4 px-5 py-4">
      <HeartCrack className="shrink-0 text-[#123458]" />
      <div className="space-y-1">
        <p>
          Rất tiếc khi CV của bạn chưa phù hợp với công ty "Tên công ty". Tìm
          kiếm các công việc liên quan khác{" "}
          <span className="underline underline-offset-2 cursor-pointer text-[#123458]">
            tại đây
          </span>
          .
        </p>
        <p className="text-sm text-other_helper_text italic">24 phút trước</p>
      </div>
    </div>
  );
}

function CVGettingApprovedNotification() {
  return (
    <div className="flex items-center gap-4 px-5 py-4">
      <PartyPopper size={32} className="shrink-0 text-c-primary" />
      <div className="space-y-1">
        <p>
          <span className="text-c-primary font-semibold">Chúc mừng!</span> CV
          của bạn đã được công ty "Tên công ty" chấp thuận. Kiểm tra lời mời
          tham gia phỏng vấn{" "}
          <span className="underline underline-offset-2 cursor-pointer text-c-primary">
            tại đây
          </span>
          .
        </p>
        <p className="text-sm text-other_helper_text italic">24 phút trước</p>
      </div>
    </div>
  );
}

function GetRecruitmentApplyingNotification() {
  return (
    <div className="flex items-center gap-4 px-5 py-4">
      <FilePlus2 size={32} className="shrink-0 text-c-primary" />
      <div className="space-y-1">
        <p>
          Một <span className="text-c-primary font-semibold">ứng viên mới</span>{" "}
          vừa ứng tuyển. Kiểm tra ngay{" "}
          <span className="underline underline-offset-2 cursor-pointer text-c-primary">
            tại đây
          </span>
          .
        </p>
        <p className="text-sm text-other_helper_text italic">24 phút trước</p>
      </div>
    </div>
  );
}
