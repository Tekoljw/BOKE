import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search } from 'lucide-react';

// Mock data
const mockRechargeRecords = [
  {
    id: '1',
    merchantId: 'M001',
    merchantName: '商户A',
    amount: 10000,
    status: 'success',
    createdAt: '2024-04-26 10:30:00'
  },
  {
    id: '2',
    merchantId: 'M002',
    merchantName: '商户B',
    amount: 5000,
    status: 'pending',
    createdAt: '2024-04-25 15:45:00'
  },
];

const AdminRechargeRecords: React.FC = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">商户充值记录</h1>
        <p className="text-muted-foreground">查看所有商户的充值记录</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>充值记录查询</CardTitle>
          <CardDescription>
            按时间范围查询商户充值记录
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-4 items-end">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <label className="text-sm text-muted-foreground">开始时间</label>
                <Input
                  type="datetime-local"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <label className="text-sm text-muted-foreground">结束时间</label>
                <Input
                  type="datetime-local"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
              <Button>
                <Search className="mr-2 h-4 w-4" />
                查询
              </Button>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>商户ID</TableHead>
                    <TableHead>商户名称</TableHead>
                    <TableHead>充值金额</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead>充值时间</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockRechargeRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell>{record.merchantId}</TableCell>
                      <TableCell>{record.merchantName}</TableCell>
                      <TableCell>{record.amount}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-sm ${
                          record.status === 'success' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {record.status === 'success' ? '成功' : '处理中'}
                        </span>
                      </TableCell>
                      <TableCell>{record.createdAt}</TableCell>
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

export default AdminRechargeRecords;
