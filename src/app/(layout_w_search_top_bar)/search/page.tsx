import HomepageJobFilter from "~/components/HomepageJobFilter";
import JobList from "~/components/JobsList";

export default function HomePage() {
  return (
    <div className="mt-5">
      <div className="flex max-w-[1400px] mx-auto gap-10 mt-10">
        <HomepageJobFilter />
        <div className="flex-1">
          <JobList />
        </div>
      </div>
    </div>
  );
}
