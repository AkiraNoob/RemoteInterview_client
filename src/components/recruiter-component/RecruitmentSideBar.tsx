import { BriefcaseBusiness, Settings } from "lucide-react";
import { Button } from "../ui/button";

const items = [
  {
    title: "Tin tuyển dụng",
    url: "/recruitment",
    icon: <BriefcaseBusiness />,
  },
  {
    title: "Lịch phỏng vấn",
    url: "/recruitment/schedule",
    icon: <BriefcaseBusiness />,
  },
  {
    title: "Cài đặt",
    url: "#",
    icon: <Settings />,
  },
];

export default function RecruitmentSideBar() {
  return (
    <div className="border-r min-w-[200px] px-2 pt-2 bg-white min-h-[calc(100svh-72px)]">
      <div className="space-y-3 flex flex-col">
        {items.map((item, index) => (
          <Button
            key={index}
            className="text-md text-left block text-c-text-light bg-transparent hover:bg-foreground/10"
          >
            <a href={item.url} className="flex items-center gap-4">
              {item.icon}
              <span>{item.title}</span>
            </a>
          </Button>
        ))}
      </div>
    </div>
  );
}
