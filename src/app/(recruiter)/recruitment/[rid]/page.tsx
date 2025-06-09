import DetailRecruitmentControlledTabs from "~/components/recruiter-component/DetailRecruitmentControlledTabs";
import DetailRecruitmentInfo from "~/components/recruiter-component/DetailRecruitmentInfo";
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";

import { Breadcrumb } from "~/components/ui/breadcrumb";

export default function Page() {
  return (
    <div className="max-w-[1300px] w-full mx-auto space-y-4 pt-5">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/recruitment">Tuyển dụng</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Tiêu đề tuyển dụng</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="space-y-4">
        <DetailRecruitmentInfo />
        <DetailRecruitmentControlledTabs />
      </div>
    </div>
  );
}
