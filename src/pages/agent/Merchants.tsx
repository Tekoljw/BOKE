
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { type Merchant } from '@/types';

type CurrencyTab = 'all' | 'usdt' | 'cny' | 'usd' | 'mmk' | 'rm';

const AgentMerchants: React.FC = () => {
  const [activeTab, setActiveTab] = useState<CurrencyTab>('all');
  const [isLoading, setIsLoading] = useState(false);

  // Temporary mock data
  const merchants: Merchant[] = [
    {
      id: "M001",
      username: "merchant1",
      telegramId: "@merchant1",
      role: "merchant",
      email: "merchant1@example.com",
      status: "active",
      createdAt: "2024-01-01",
      agentId: "A001",
      agentName: "agent1",
      gamePoints: 10000,
      usdtBalance: 5000,
      feeRate: 0.05,
      featured: true,
      totalDeposit: 100000,
      monthlyDeposit: 15000,
      totalCommission: 5000,
      monthlyCommission: 750,
    }
  ];

  const handleLoadMore = () => {
    setIsLoading(true);
    // Simulate loading delay
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">我的商户</h1>
        <p className="text-muted-foreground">查看代理商下属商户的费率和经营情况</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>商户列表</CardTitle>
          <CardDescription>
            按币种查看商户信息
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as CurrencyTab)}>
            <TabsList className="mb-4">
              <TabsTrigger value="all">全部</TabsTrigger>
              <TabsTrigger value="usdt">USDT</TabsTrigger>
              <TabsTrigger value="cny">CNY</TabsTrigger>
              <TabsTrigger value="usd">USD</TabsTrigger>
              <TabsTrigger value="mmk">MMK</TabsTrigger>
              <TabsTrigger value="rm">RM</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-0">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>商户ID</TableHead>
                      <TableHead>商户名称</TableHead>
                      <TableHead>商户TG</TableHead>
                      <TableHead>商户充值总额</TableHead>
                      <TableHead>本月充值总额</TableHead>
                      <TableHead>商户买分费率</TableHead>
                      <TableHead>为我贡献总佣金</TableHead>
                      <TableHead>本月为我贡献佣金</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {merchants.map((merchant) => (
                      <TableRow key={merchant.id}>
                        <TableCell>{merchant.id}</TableCell>
                        <TableCell>{merchant.username}</TableCell>
                        <TableCell>{merchant.telegramId}</TableCell>
                        <TableCell className="text-blue-600 font-medium">
                          {merchant.totalDeposit?.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-green-600 font-medium">
                          {merchant.monthlyDeposit?.toLocaleString()}
                        </TableCell>
                        <TableCell>{(merchant.feeRate * 100).toFixed(2)}%</TableCell>
                        <TableCell className="text-purple-600 font-medium">
                          {merchant.totalCommission?.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-orange-600 font-medium">
                          {merchant.monthlyCommission?.toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

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
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AgentMerchants;
