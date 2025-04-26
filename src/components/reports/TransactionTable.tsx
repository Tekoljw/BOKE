
import { useState } from 'react';
import { TransactionRecord } from '@/types/report';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

interface TransactionTableProps {
  records: TransactionRecord[];
  loading: boolean;
  onLoadMore: () => void;
  hasMore: boolean;
}

export function TransactionTable({ records, loading, onLoadMore, hasMore }: TransactionTableProps) {
  const [selectedTransaction, setSelectedTransaction] = useState<TransactionRecord | null>(null);

  // Format amount with color based on positive/negative value
  const formatAmount = (amount: number) => {
    const isPositive = amount > 0;
    const classes = isPositive ? 'text-green-600' : 'text-red-600';
    return (
      <span className={classes}>
        {isPositive ? '+' : ''}{amount.toFixed(2)}
      </span>
    );
  };

  // Mobile view transaction card
  const TransactionCard = ({ record }: { record: TransactionRecord }) => (
    <div className="bg-white rounded-lg border shadow-sm p-4 space-y-2 mb-2">
      <div className="flex justify-between">
        <span className="text-sm font-medium">订单号: {record.id}</span>
        <span className="text-sm text-muted-foreground">{record.timestamp}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-sm">玩家账号: {record.username}</span>
        <span className="text-sm">
          类型: {record.type === 'deposit' ? '上分' : '下分'}
        </span>
      </div>
      <div className="flex justify-between">
        <span className="text-sm">账变前: {record.beforeAmount.toFixed(2)}</span>
        <span className="text-sm">
          账变: {formatAmount(record.changeAmount)}
        </span>
        <span className="text-sm">账变后: {record.afterAmount.toFixed(2)}</span>
      </div>
    </div>
  );

  return (
    <div>
      {/* Desktop view */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>订单号</TableHead>
              <TableHead>时间</TableHead>
              <TableHead>玩家账号</TableHead>
              <TableHead>类型</TableHead>
              <TableHead>账变前金额</TableHead>
              <TableHead>账变金额</TableHead>
              <TableHead>账变后金额</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  暂无数据
                </TableCell>
              </TableRow>
            ) : (
              records.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>{record.id}</TableCell>
                  <TableCell>{record.timestamp}</TableCell>
                  <TableCell>{record.username}</TableCell>
                  <TableCell>
                    {record.type === 'deposit' ? '上分' : '下分'}
                  </TableCell>
                  <TableCell>{record.beforeAmount.toFixed(2)}</TableCell>
                  <TableCell>{formatAmount(record.changeAmount)}</TableCell>
                  <TableCell>{record.afterAmount.toFixed(2)}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Mobile view */}
      <div className="md:hidden space-y-4">
        {records.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            暂无数据
          </div>
        ) : (
          records.map((record) => <TransactionCard key={record.id} record={record} />)
        )}
      </div>

      {records.length > 0 && hasMore && (
        <div className="mt-6 text-center">
          <Button 
            onClick={onLoadMore} 
            variant="outline" 
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                加载中...
              </>
            ) : (
              '查看更多'
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
