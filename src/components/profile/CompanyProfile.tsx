import { Building2, Globe, Newspaper } from "lucide-react";
import JobList from "../JobsList";
import CompanyProfileDescription from "./CompanyProfileDescription";
import CompanyReview from "./CompanyReview";

export default function CompanyProfile() {
  return (
    <div className="">
      <img
        src="/avatar.jpg"
        alt="avatar"
        className="w-full aspect-[4] object-fill"
      />

      <div className="space-y-5 mx-auto">
        <div className="bg-white border-t-2 border-b-2 border-other_divider">
          <div className="max-w-[1200px] p-5 flex gap-10 mx-auto">
            <img
              src="/avatar.jpg"
              alt="avatar"
              className="rounded-md overflow-hidden w-[80px] aspect-square"
            />
            <div className="flex-1 space-y-5 flex flex-col justify-around">
              <p className="text-3xl font-semibold">Tên công ty</p>
              <div className="flex items-center gap-5">
                <div className="flex items-center gap-1">
                  <Globe size={18} className="" />
                  <a href="#" className="hover:underline underline-offset-2">
                    trangwebcongty.com
                  </a>
                </div>
                <div className="flex items-center gap-1">
                  <Building2 size={18} />
                  <p>500-1000 thành viên</p>
                </div>
                <div className="flex items-center gap-1">
                  <Newspaper size={18} />
                  <p>10+ bài tuyển dụng</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <CompanyProfileDescription />

        <div className="rounded-lg flex-1">
          <div className="max-w-[1200px] mx-auto">
            <p className="text-2xl font-semibold text-c-primary mb-5">
              Danh sách bài tuyển dụng đang mở
            </p>
            <JobList />
          </div>
        </div>

        <CompanyReview />
      </div>
    </div>
  );
}
