import { Check, X } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export default function ApplyingList() {
  return (
    <div className="">
      <Table className="bg-white rounded-lg">
        <TableHeader>
          <TableRow>
            <TableHead>Tên ứng viên</TableHead>
            <TableHead>Ngày sinh</TableHead>
            <TableHead>Số điện thoại</TableHead>
            <TableHead>CV</TableHead>
            <TableHead className="text-center">Trạng thái</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Họ và tên</TableCell>
            <TableCell>dd/mm/yyyy</TableCell>
            <TableCell>0987xxxxxx</TableCell>
            <TableCell>
              <a className="underline cursor-pointer">File</a>
            </TableCell>
            <TableCell className="text-center">Chưa xử lý</TableCell>
            <TableCell className="flex items-center justify-center gap-2">
              <Tooltip>
                <TooltipContent>Chấp thuận ứng viên</TooltipContent>
                <TooltipTrigger asChild>
                  <Button
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
                    size={"icon"}
                    className="rounded-full bg-c-error hover:bg-c-error-foreground"
                  >
                    <X />
                  </Button>
                </TooltipTrigger>
              </Tooltip>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
