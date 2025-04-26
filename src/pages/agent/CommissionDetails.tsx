import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { useIsMobile } from '@/hooks/useIsMobile';
import { Input } from '@/components/ui/input';

interface CommissionRecord {
  id: string;
  merchantId: string;
  merchantName: string;
  timestamp: string;
  depositAmount: number;
  commission: number;
  status: 'success' | 'pending';
}

// Mock data generator with correct typing
const generateMockCommissions = (count: number): CommissionRecord[] => {
  return Array.from({ length: count }, (_, i) => {
    const depositAmount = Math.floor(Math.random() * 10000) + 1000;
    const commissionRate = 0.05 + Math.random() * 0.05; // 5-10% commission
    return {
      id: `COM${String(i + 1).padStart(3, '0')}`,
      merchantId: `M${String(Math.floor(Math.random() * 100) + 1).padStart(3, '0')}`,
      merchantName: `商户${Math.floor(Math.random() * 100) + 1}`,
      timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleString('zh-CN'),
      depositAmount,
      commission: Math.round(depositAmount * commissionRate),
      status: Math.random() > 0.1 ? 'success' : 'pending' as 'success' | 'pending'
    };
  });
};

const AgentCommissionDetails: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const isMobile = useIsMobile();
  const [commissions, setCommissions] = useState<CommissionRecord[]>(() => generateMockCommissions(10));

  const handleLoadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setCommissions(prev => [...prev, ...generateMockCommissions(5)]);
      setIsLoading(false);
    }, 1000);
  };

  const handleSearch = () => {
    setIsLoading(true);
    setTimeout(() => {
      // Mock search functionality
      setCommissions(generateMockCommissions(8));
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">佣金明细</h1>
        <p className="text-muted-foreground">查看商户充值佣金明细</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>佣金明细列表</CardTitle>
          <CardDescription>
            查看每个商户的充值记录和产生的佣金
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Search filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <Input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full md:w-48"
              placeholder="开始时间"
            />
            <Input
              type="date" 
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full md:w-48"
              placeholder="结束时间"
            />
            <Button onClick={handleSearch}>查询</Button>
          </div>

          {/* Mobile view */}
          {isMobile ? (
            <div className="space-y-4">
              {commissions.map((record) => (
                <Card key={record.id} className="p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">商户ID</span>
                      <span>{record.merchantId}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">商户名称</span>
                      <span>{record.merchantName}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">充值时间</span>
                      <span>{record.timestamp}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">充值金额</span>
                      <span className="text-blue-600 font-medium">{record.depositAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">我的佣金</span>
                      <span className="text-green-600 font-medium">{record.commission.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">状态</span>
                      <span className={`inline-block px-2 py-1 rounded-full text-sm ${
                        record.status === 'success' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {record.status === 'success' ? '已结算' : '待结算'}
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            /* Desktop view */
            <div className="rounded-md border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="whitespace-nowrap">商户ID</TableHead>
                    <TableHead className="whitespace-nowrap">商户名称</TableHead>
                    <TableHead className="whitespace-nowrap">充值时间</TableHead>
                    <TableHead className="whitespace-nowrap">充值金额</TableHead>
                    <TableHead className="whitespace-nowrap">我的佣金</TableHead>
                    <TableHead className="whitespace-nowrap">状态</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {commissions.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="whitespace-nowrap">{record.merchantId}</TableCell>
                      <TableCell className="whitespace-nowrap">{record.merchantName}</TableCell>
                      <TableCell className="whitespace-nowrap">{record.timestamp}</TableCell>
                      <TableCell className="whitespace-nowrap text-blue-600 font-medium">
                        {record.depositAmount.toLocaleString()}
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-green-600 font-medium">
                        {record.commission.toLocaleString()}
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        <span className={`inline-block px-2 py-1 rounded-full text-sm ${
                          record.status === 'success' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {record.status === 'success' ? '已结算' : '待结算'}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          <div className="mt-4 flex justify-center">
            <Button 
              variant="outline" 
              onClick={handleLoadMore}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  加载中...
                </>
              ) : (
                '加载更多'
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AgentCommissionDetails;
