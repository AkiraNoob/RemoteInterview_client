"use client";

import dayjs from "dayjs";
import { ExternalLink, Search } from "lucide-react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { PATH_NAME } from "~/constants/pathName";
import cookieCommons from "~/helpers/cookieCommon";
import useGetListRecruitmentOfAUser from "~/hook/useGetListRecruitmentOfAUser";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function RecruitmentControlledTable() {
  const {
    query: { data },
  } = useGetListRecruitmentOfAUser({
    data: {
      employerId: cookieCommons.getUserId() as string,
      pageSize: 100,
    },
  });

  return (
    <>
      <div className="flex-1 flex items-center gap-2 pl-1 pr-4 bg-white rounded-lg">
        <Input
          className={"border-none focus-visible:ring-0 shadow-none"}
          placeholder="Nhập tiêu đề tuyển dụng để tìm kiếm (Nhấn enter để tìm kiếm)"
        />
        <Search />
      </div>

      <Table className="bg-white rounded-lg">
        <TableHeader>
          <TableRow>
            <TableHead>Tiêu đề tuyển dụng</TableHead>
            <TableHead>Ngày hết hạn</TableHead>
            <TableHead>Số lượng CV ứng tuyển</TableHead>
            {/* <TableHead className="flex items-center gap-1">
              Hiệu suất
              <Tooltip>
                <TooltipContent>
                  <p>Tỉ lệ CV ứng tuyển / Số lượng ứng viên xem tin</p>
                </TooltipContent>
                <TooltipTrigger>
                  <Info size={14} />
                </TooltipTrigger>
              </Tooltip>
            </TableHead>  */}
            <TableHead className="text-center">Báo cáo chi tiết</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data.map((item) => (
            <TableRow>
              <TableCell className="font-medium">{item.title}</TableCell>
              <TableCell>
                {dayjs(item.timeStamp).format("dd/mm/yyyy")}
              </TableCell>
              <TableCell>{item.numberOfApplicant}</TableCell>
              {/* <TableCell>74%</TableCell> */}
              <TableCell className="flex items-center">
                <Link
                  href={PATH_NAME.RECRUITER_RECRUITMENT_DETAIL.replace(
                    "[rid]",
                    item.id
                  )}
                >
                  <Button
                    variant={"custom"}
                    size={"icon"}
                    className="mx-auto rounded-full bg-transparent border border-c-primary hover:border-none text-c-primary hover:text-white"
                  >
                    <ExternalLink size={20} />
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
