import { Clock4, DollarSign, Hourglass, MapPin, Send } from "lucide-react";
import { Button } from "./ui/button";

export default function ShortenedJobDescription() {
  return (
    <div className="rounded-lg p-5 bg-white space-y-4">
      <h3 className="text-xl font-bold">Tên công việc</h3>
      <div className="flex gap-14 items-center">
        <div className="flex items-center gap-3">
          <div className="rounded-full p-2 bg-c-primary text-c-text-dark">
            <DollarSign />
          </div>
          <div>
            <p className="text-other_helper_text text-sm">Mức lương</p>
            <p className="font-semibold text-md text-c-text-light">
              Lên tới xx triệu
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="rounded-full p-2 bg-c-primary text-c-text-dark">
            <MapPin />
          </div>
          <div>
            <p className="text-other_helper_text text-sm">Địa điểm</p>
            <p className="font-semibold text-md text-c-text-light">
              Quận x / TP. Hồ Chí Minh
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="rounded-full p-2 bg-c-primary text-c-text-dark">
            <Hourglass />
          </div>
          <div>
            <p className="text-other_helper_text text-sm">Kinh nghiệm</p>
            <p className="font-semibold text-md text-c-text-light">
              Tối thiểu x năm
            </p>
          </div>
        </div>
      </div>

      <div className="bg-other-rested-bg w-fit flex items-center gap-2 px-2 rounded-md">
        <Clock4 size={20} fill="#7f878f" className="text-white" />
        <p className="text-md text-c-text-light">Hạn nộp hồ sơ: 05/07/2025</p>
      </div>

      <Button className="w-full" variant={"custom"}>
        <Send color="#ffffff" />
        Ứng tuyển ngay
      </Button>
    </div>
  );
}
