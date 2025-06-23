"use client";

import { Check, X } from "lucide-react";
import { useParams } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import useGetApplyingForARecruitment from "~/hook/useGetApplyingForARecruitment";
import { useRespondApplication } from "~/hook/useRespondApplication";
import { UserRecruitmentStatusEnum } from "~/types/recruitment.types";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

const hashStatus = {
  [UserRecruitmentStatusEnum.Approved]: "Đã chấp thuận",
  [UserRecruitmentStatusEnum.Rejected]: "Đã từ chối",
  [UserRecruitmentStatusEnum.Pending]: "Chờ xừ lý",
};

export default function ApplyingList() {
  const params = useParams();
  const recruitmentId = params?.rid;

  const {
    query: { data },
  } = useGetApplyingForARecruitment({
    data: {
      recruitmentId: recruitmentId as string,
      pageSize: 100,
    },
  });

  const {
    mutation: { mutate },
  } = useRespondApplication({});

  console.log(data);

  return (
    <div className="">
      <Table className="bg-white rounded-lg">
        <TableHeader>
          <TableRow>
            <TableHead>Tên ứng viên</TableHead>
            <TableHead>Ngày sinh</TableHead>
            <TableHead>CV</TableHead>
            <TableHead className="text-center">Trạng thái</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!data || (data?.data.length === 0 && <p>Chưa có dữ liệu</p>)}
          {data?.data.map((item) => (
            <TableRow key={item.userId}>
              <TableCell className="font-medium">
                {item.user.fullName}
              </TableCell>
              <TableCell>{item.user.email}</TableCell>
              <TableCell>
                <a
                  href={item.cv.fileUrl}
                  target="_blank"
                  className="underline cursor-pointer"
                >
                  {item.cv.fileName}
                </a>
              </TableCell>
              <TableCell className="text-center">
                {hashStatus[item.status]}
              </TableCell>
              {item.status === UserRecruitmentStatusEnum.Pending && (
                <>
                  <TableCell className="flex items-center justify-center gap-2">
                    <Tooltip>
                      <TooltipContent>Chấp thuận ứng viên</TooltipContent>
                      <TooltipTrigger asChild>
                        <Button
                          onClick={() =>
                            mutate({
                              applicationId: item.id,
                              status: UserRecruitmentStatusEnum.Approved,
                            })
                          }
                          size={"icon"}
                          className="rounded-full bg-c-success hover:bg-c-success-foreground"
                        >
                          <Check />
                        </Button>
                      </TooltipTrigger>
                    </Tooltip>
                    <Tooltip>
                      <TooltipContent>Từ chối ứng viên</TooltipContent>
                      <TooltipTrigger asChild>
                        <Button
                          onClick={() =>
                            mutate({
                              applicationId: item.id,
                              status: UserRecruitmentStatusEnum.Rejected,
                            })
                          }
                          size={"icon"}
                          className="rounded-full bg-c-error hover:bg-c-error-foreground"
                        >
                          <X />
                        </Button>
                      </TooltipTrigger>
                    </Tooltip>
                  </TableCell>
                </>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
