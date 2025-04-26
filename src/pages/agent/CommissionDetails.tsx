
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { CalendarDays } from 'lucide-react';
import type { CommissionRecord } from '@/types/commission';

const CommissionDetails: React.FC = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Mock data - replace with real API call
  const mockCommissionRecords: CommissionRecord[] = [
    {
      id: 'COM-001',
      merchantId: 'M001',
      merchantName: '商户A',
      timestamp: '2024-04-26 10:30:00',
      depositAmount: 10000,
      commission: 500,
      status: 'success'
    },
    {
      id: 'COM-002',
      merchantId: 'M002',
      merchantName: '商户B',
      timestamp: '2024-04-25 15:45:00',
      depositAmount: 5000,
      commission: 250,
      status: 'success'
    },
    {
      id: 'COM-003',
      merchantId: 'M003',
      merchantName: '商户C',
      timestamp: '2024-04-24 09:15:00',
      depositAmount: 8000,
      commission: 400,
      status: 'pending'
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">佣金明细</h1>
        <p className="text-muted-foreground">查看商户充值佣金记录</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5" />
            佣金记录
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
                    <TableHead>商户ID</TableHead>
                    <TableHead>商户名称</TableHead>
                    <TableHead>时间</TableHead>
                    <TableHead>充值金额</TableHead>
                    <TableHead>我的佣金</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockCommissionRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">{record.merchantId}</TableCell>
                      <TableCell>{record.merchantName}</TableCell>
                      <TableCell>{record.timestamp}</TableCell>
                      <TableCell>{record.depositAmount.toFixed(2)}</TableCell>
                      <TableCell>{record.commission.toFixed(2)}</TableCell>
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

export default CommissionDetails;
