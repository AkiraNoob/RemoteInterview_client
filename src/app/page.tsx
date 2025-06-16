import JobsSearchInput from "~/components/JobsSearchInput";
import NewRecruitments from "~/components/NewRecruitments";
import TopBar from "~/components/TopBar";

export default function Page() {
  return (
    <div>
      <TopBar />
      <div className="max-w-[1170px] mx-auto">
        <JobsSearchInput className="my-5" />
        <NewRecruitments />
      </div>
    </div>
  );
}
