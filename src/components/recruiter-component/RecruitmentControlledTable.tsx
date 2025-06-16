import { ExternalLink, Info, Search } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export default function RecruitmentControlledTable() {
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
            <TableHead className="flex items-center gap-1">
              Hiệu suất
              <Tooltip>
                <TooltipContent>
                  <p>Tỉ lệ CV ứng tuyển / Số lượng ứng viên xem tin</p>
                </TooltipContent>
                <TooltipTrigger>
                  <Info size={14} />
                </TooltipTrigger>
              </Tooltip>
            </TableHead>
            <TableHead className="text-center">Báo cáo chi tiết</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Tiêu đề</TableCell>
            <TableCell>dd/mm/yyyy</TableCell>
            <TableCell>14</TableCell>
            <TableCell>74%</TableCell>
            <TableCell className="flex items-center">
              <Button
                variant={"custom"}
                size={"icon"}
                className="mx-auto rounded-full bg-transparent border border-c-primary hover:border-none text-c-primary hover:text-white"
              >
                <ExternalLink size={20} />
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
}
