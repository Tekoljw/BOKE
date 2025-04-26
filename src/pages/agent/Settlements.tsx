
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface SettlementRecord {
  id: string;
  timestamp: string;
  amount: number;
  beforeBalance: number;
  afterBalance: number;
  status: 'success' | 'failed';
}

const mockSettlements: SettlementRecord[] = Array.from({ length: 10 }, (_, i) => {
  const amount = Math.floor(Math.random() * 10000);
  const beforeBalance = Math.floor(Math.random() * 50000);
  return {
    id: `S${String(i + 1).padStart(3, '0')}`,
    timestamp: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
    amount,
    beforeBalance,
    afterBalance: beforeBalance - amount,
    status: Math.random() > 0.1 ? 'success' : 'failed',
  };
});

const AgentSettlements: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">结算记录</h1>
        <p className="text-muted-foreground">查看佣金结算历史记录</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>结算列表</CardTitle>
          <CardDescription>
            佣金结算历史记录
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="whitespace-nowrap">订单ID</TableHead>
                  <TableHead className="whitespace-nowrap">时间</TableHead>
                  <TableHead className="whitespace-nowrap">金额</TableHead>
                  <TableHead className="whitespace-nowrap">结算前余额</TableHead>
                  <TableHead className="whitespace-nowrap">结算后余额</TableHead>
                  <TableHead className="whitespace-nowrap">状态</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockSettlements.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="whitespace-nowrap">{record.id}</TableCell>
                    <TableCell className="whitespace-nowrap">
                      {new Date(record.timestamp).toLocaleString('zh-CN')}
                    </TableCell>
                    <TableCell className="whitespace-nowrap text-blue-600 font-medium">
                      {record.amount.toLocaleString()}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {record.beforeBalance.toLocaleString()}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {record.afterBalance.toLocaleString()}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      <span className={`inline-block px-2 py-1 rounded-full text-sm ${
                        record.status === 'success' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {record.status === 'success' ? '成功' : '失败'}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AgentSettlements;
