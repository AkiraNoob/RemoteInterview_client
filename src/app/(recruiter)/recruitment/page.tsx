"use client";
import AddRecruitmentButton from "~/components/recruiter-component/AddRecruitmentButton";
import RecruitmentControlledTable from "~/components/recruiter-component/RecruitmentControlledTable";
import useAccessCompany from "~/hook/useAccessCompany";

export default function Page() {
  useAccessCompany();

  return (
    <div className="w-full min-h-[calc(100svh-72px)] space-y-4">
      <div className="bg-white p-4 w-full flex justify-between">
        <h3 className="text-xl font-semibold">Tin tuyển dụng</h3>
        <AddRecruitmentButton />
      </div>
      <div className="max-w-[1300px] mx-auto space-y-4 w-full">
        <RecruitmentControlledTable />
      </div>
    </div>
  );
}
