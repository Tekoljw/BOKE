
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { WinLossRecord } from "@/types/report";
import { useIsMobile } from "@/hooks/useIsMobile";  // Updated import path
import { Card } from "@/components/ui/card";

interface WinLossTableProps {
  records: WinLossRecord[];
  loading: boolean;
  onLoadMore: () => void;
  hasMore: boolean;
}

export function WinLossTable({ records, loading, onLoadMore, hasMore }: WinLossTableProps) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="space-y-4">
        {records.map((record) => (
          <Card key={record.id} className="p-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">用户名</span>
                <span>{record.username}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">游戏类型</span>
                <span>{record.gameType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">房间类型</span>
                <span>{record.roomType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">桌子号</span>
                <span>{record.tableNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">初始金额</span>
                <span>{record.initialAmount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">有效投注额</span>
                <span>{record.validBetAmount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">输赢金额</span>
                <span className={record.winLossAmount >= 0 ? "text-green-600" : "text-red-600"}>
                  {record.winLossAmount}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">局号</span>
                <span>{record.roundId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">时间</span>
                <span>{record.timestamp}</span>
              </div>
            </div>
          </Card>
        ))}
        {hasMore && (
          <div className="flex justify-center pt-4">
            <Button onClick={onLoadMore} disabled={loading}>
              {loading ? "加载中..." : "加载更多"}
            </Button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>账变时间</TableHead>
            <TableHead>用户名</TableHead>
            <TableHead>游戏类型</TableHead>
            <TableHead>房间类型</TableHead>
            <TableHead>桌子号</TableHead>
            <TableHead>初始金额</TableHead>
            <TableHead>有效投注额</TableHead>
            <TableHead>输赢金额</TableHead>
            <TableHead>局号</TableHead>
            <TableHead>详情</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {records.map((record) => (
            <TableRow key={record.id}>
              <TableCell>{record.timestamp}</TableCell>
              <TableCell>{record.username}</TableCell>
              <TableCell>{record.gameType}</TableCell>
              <TableCell>{record.roomType}</TableCell>
              <TableCell>{record.tableNumber}</TableCell>
              <TableCell>{record.initialAmount}</TableCell>
              <TableCell>{record.validBetAmount}</TableCell>
              <TableCell className={record.winLossAmount >= 0 ? "text-green-600" : "text-red-600"}>
                {record.winLossAmount}
              </TableCell>
              <TableCell>{record.roundId}</TableCell>
              <TableCell>
                <Button variant="ghost" size="sm">
                  查看
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {hasMore && (
        <div className="flex justify-center pt-4">
          <Button onClick={onLoadMore} disabled={loading}>
            {loading ? "加载中..." : "加载更多"}
          </Button>
        </div>
      )}
    </div>
  );
}
