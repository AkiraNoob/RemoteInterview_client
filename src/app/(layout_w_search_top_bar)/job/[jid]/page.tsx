import CompanyDescription from "~/components/CompanyDescription";
import DetailedJobDescription from "~/components/DetailedJobDescription";
import JobsSuggestion from "~/components/JobsSuggestion";
import ShortenedJobDescription from "~/components/ShortenedJobDescription";
import RecruitmentDetailProvider from "./provider";

const Page = () => {
  return (
    <RecruitmentDetailProvider>
      <div className="mt-5">
        <div className="flex max-w-[1200px] mx-auto gap-6 mt-10">
          <div className="space-y-6 flex-1">
            <ShortenedJobDescription />
            <DetailedJobDescription />
          </div>
          <div className="space-y-6">
            <CompanyDescription />
            <JobsSuggestion />
          </div>
        </div>
      </div>
    </RecruitmentDetailProvider>
  );
};

export default Page;
