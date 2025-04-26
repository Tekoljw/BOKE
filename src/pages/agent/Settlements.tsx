
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import type { SettlementRecord } from '@/types/commission';
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { CalendarDays, Check, X } from 'lucide-react';

const AgentSettlements: React.FC = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Mock data - replace with real API call
  const mockSettlements: SettlementRecord[] = [
    {
      id: 'SET-001',
      timestamp: '2024-04-26 10:30:00',
      amount: 5000,
      balanceBefore: 8000,
      balanceAfter: 3000,
      status: 'success',
    },
    {
      id: 'SET-002',
      timestamp: '2024-04-25 15:45:00',
      amount: 3000,
      balanceBefore: 11000,
      balanceAfter: 8000,
      status: 'success',
    },
    {
      id: 'SET-003',
      timestamp: '2024-04-24 09:15:00',
      amount: 2000,
      balanceBefore: 2000,
      balanceAfter: 2000,
      status: 'failed',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">结算记录</h1>
        <p className="text-muted-foreground">佣金提现历史记录</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5" />
            结算列表
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="text-sm font-medium mb-2 block">开始日期</label>
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="flex-1">
                <label className="text-sm font-medium mb-2 block">结束日期</label>
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>订单ID</TableHead>
                    <TableHead>时间</TableHead>
                    <TableHead>结算金额</TableHead>
                    <TableHead>结算前余额</TableHead>
                    <TableHead>结算后余额</TableHead>
                    <TableHead>状态</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockSettlements.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">{record.id}</TableCell>
                      <TableCell>{record.timestamp}</TableCell>
                      <TableCell>{record.amount.toFixed(2)}</TableCell>
                      <TableCell>{record.balanceBefore.toFixed(2)}</TableCell>
                      <TableCell>{record.balanceAfter.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={record.status === 'success' ? 'default' : 'destructive'}
                          className="flex w-20 justify-center items-center gap-1"
                        >
                          {record.status === 'success' ? (
                            <>
                              <Check className="h-3 w-3" />
                              成功
                            </>
                          ) : (
                            <>
                              <X className="h-3 w-3" />
                              失败
                            </>
                          )}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AgentSettlements;
