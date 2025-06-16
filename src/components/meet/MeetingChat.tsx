import dayjs from "dayjs";
import { SendHorizontal, X } from "lucide-react";
import { useState } from "react";
import { Input } from "../ui/input";
import { Sidebar, SidebarContent, useSidebar } from "../ui/sidebar";

export default function MeetingChat() {
  const { toggleSidebar } = useSidebar();
  const [content, setContent] = useState("");

  const msg: {
    senderId: string;
    senderName: string;
    content: string;
    isOwner: boolean;
    timeStamp: string;
  }[] = new Array(10).fill({
    senderId: "1",
    senderName: "Phương",
    content: "alo",
    isOwner: true,
    timeStamp: new Date().toISOString(),
  });

  return (
    <Sidebar
      side="right"
      variant="floating"
      className="bg-transperant h-[calc(100dvh-80px)] py-5 pr-5"
      wrapperClassname="meeting-chat"
    >
      <SidebarContent className="rounded-lg px-5 py-3 flex flex-col">
        <div className="flex items-center justify-between mb-5">
          <p className="text-lg">Tin nhắn</p>
          <X className="cursor-pointer" onClick={toggleSidebar} />
        </div>

        <div className="flex-1 space-y-4">
          {msg.map((item, index) =>
            item.senderId === msg?.[index - 1]?.senderId ? (
              <p key={index} className="text-sm -mt-3">
                {item.content}
              </p>
            ) : (
              <div key={index} className="space-y-1">
                <p className="font-medium text-sm">
                  {item.isOwner ? "Bạn" : item.senderName}
                  <span className="font-normal text-xs ml-2">
                    {dayjs(item.timeStamp).format("HH:mm")}
                  </span>
                </p>
                <p className="text-sm">{item.content}</p>
              </div>
            )
          )}
        </div>

        <div className="flex items-center gap-2 px-3 border rounded-lg">
          <Input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Gửi tin nhắn"
            className={"border-none focus-visible:ring-0 shadow-none"}
          />
          <SendHorizontal className="text-other_helper_text/70" />
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
