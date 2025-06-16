import { ExternalLink } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export default function ViewingList() {
  return (
    <div className="">
      <Table className="bg-white rounded-lg">
        <TableHeader>
          <TableRow>
            <TableHead>Tên ứng viên</TableHead>
            <TableHead>Số lần xem</TableHead>
            <TableHead>Lần xem gần nhất</TableHead>
            <TableHead>Ngành nghề hứng thú</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Họ và tên</TableCell>
            <TableCell>2</TableCell>
            <TableCell>dd/mm/yyyy</TableCell>
            <TableCell>
              <div className="flex flex-wrap items-center gap-4">
                <Badge variant={"light"}>IT</Badge>
                <Badge variant={"light"}>BA</Badge>
              </div>
            </TableCell>
            <TableCell className="flex items-center gap-2">
              <Tooltip>
                <TooltipContent>Xem trang cá nhân</TooltipContent>
                <TooltipTrigger asChild>
                  <Button
                    size={"icon"}
                    className="rounded-full bg-c-success hover:bg-c-success-foreground"
                  >
                    <ExternalLink />
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
