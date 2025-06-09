import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import ApplyingList from "./ApplyingList";
import ViewingList from "./ViewingList";

export default function DetailRecruitmentControlledTabs() {
  return (
    <Tabs
      defaultValue="applied_cv"
      className="px-2 pb-2 w-full rounded-lg bg-white"
    >
      <TabsList className="bg-transparent h-[50px]">
        <TabsTrigger
          className="text-c-text-light/30 data-[state=active]:text-c-text-light data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-b-[#3D365C] data-[state=active]:rounded-none"
          value="applied_cv"
        >
          CV ứng tuyển
        </TabsTrigger>
        <TabsTrigger
          className="text-c-text-light/30 data-[state=active]:text-c-text-light data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-b-[#3D365C] data-[state=active]:rounded-none"
          value="seen_candidate"
        >
          Ứng viên đã xem tin
        </TabsTrigger>
      </TabsList>
      <TabsContent value="applied_cv">
        <ApplyingList />
      </TabsContent>
      <TabsContent value="seen_candidate">
        <ViewingList />
      </TabsContent>
    </Tabs>
  );
}
