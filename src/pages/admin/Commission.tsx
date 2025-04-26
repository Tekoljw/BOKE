
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Check, X } from "lucide-react";

// Mock data for commission orders
const mockCommissionOrders = [
  {
    id: "CO001",
    timestamp: "2025-04-26 14:30:00",
    agentId: "AG001",
    amount: 5000,
    balanceBefore: 15000,
    balanceAfter: 10000,
    status: "pending",
  },
  {
    id: "CO002",
    timestamp: "2025-04-26 13:15:00",
    agentId: "AG002",
    amount: 3000,
    balanceBefore: 8000,
    balanceAfter: 5000,
    status: "approved",
  },
  {
    id: "CO003",
    timestamp: "2025-04-26 12:00:00",
    agentId: "AG003",
    amount: 2000,
    balanceBefore: 6000,
    balanceAfter: 4000,
    status: "rejected",
  },
];

const AdminCommission: React.FC = () => {
  const { toast } = useToast();
  const [selectedOrder, setSelectedOrder] = useState<typeof mockCommissionOrders[0] | null>(null);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);

  const handleOpenReview = (order: typeof mockCommissionOrders[0]) => {
    if (order.status === 'pending') {
      setSelectedOrder(order);
      setIsReviewDialogOpen(true);
    }
  };

  const handleReview = (approved: boolean) => {
    const action = approved ? '通过' : '拒绝';
    toast({
      title: `佣金提现${action}成功`,
      description: `订单 ${selectedOrder?.id} 已${action}`,
    });
    setIsReviewDialogOpen(false);
    setSelectedOrder(null);
  };

  const getStatusDisplay = (status: string) => {
    switch (status) {
      case 'pending':
        return <span className="text-yellow-500">待审核</span>;
      case 'approved':
        return <span className="text-green-500">已通过</span>;
      case 'rejected':
        return <span className="text-red-500">已拒绝</span>;
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">佣金结算</h1>
        <p className="text-muted-foreground">代理商佣金提现审核管理</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>佣金申请列表</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>订单号</TableHead>
                <TableHead>时间</TableHead>
                <TableHead>代理商ID</TableHead>
                <TableHead className="text-right">提现金额 (U)</TableHead>
                <TableHead className="text-right">提现前余额 (U)</TableHead>
                <TableHead className="text-right">提现后余额 (U)</TableHead>
                <TableHead>状态</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockCommissionOrders.map((order) => (
                <TableRow 
                  key={order.id}
                  className={order.status === 'pending' ? 'cursor-pointer hover:bg-muted/50' : ''}
                  onClick={() => handleOpenReview(order)}
                >
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.timestamp}</TableCell>
                  <TableCell>{order.agentId}</TableCell>
                  <TableCell className="text-right">{order.amount.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{order.balanceBefore.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{order.balanceAfter.toLocaleString()}</TableCell>
                  <TableCell>{getStatusDisplay(order.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>审核佣金提现申请</DialogTitle>
            <DialogDescription>
              请审核代理商 {selectedOrder?.agentId} 的佣金提现申请
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">订单号</p>
                <p className="font-medium">{selectedOrder?.id}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">提现金额</p>
                <p className="font-medium">{selectedOrder?.amount} U</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">提现前余额</p>
                <p className="font-medium">{selectedOrder?.balanceBefore} U</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">提现后余额</p>
                <p className="font-medium">{selectedOrder?.balanceAfter} U</p>
              </div>
            </div>

            <DialogFooter className="gap-2">
              <Button 
                variant="outline" 
                onClick={() => handleReview(false)}
                className="w-full sm:w-24"
              >
                <X className="h-4 w-4 mr-2" />
                拒绝
              </Button>
              <Button 
                onClick={() => handleReview(true)}
                className="w-full sm:w-24"
              >
                <Check className="h-4 w-4 mr-2" />
                通过
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminCommission;
