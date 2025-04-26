
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { type Merchant } from '@/types';
import { generateRandomMerchants } from '@/utils/mockData';
import { useIsMobile } from '@/hooks/use-mobile';

type CurrencyTab = 'all' | 'usdt' | 'cny' | 'usd' | 'mmk' | 'rm';

const AgentMerchants: React.FC = () => {
  const [activeTab, setActiveTab] = useState<CurrencyTab>('all');
  const [isLoading, setIsLoading] = useState(false);
  const isMobile = useIsMobile();
  const [merchants, setMerchants] = React.useState<Merchant[]>(() => generateRandomMerchants(50));

  const handleLoadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      const newMerchants = generateRandomMerchants(10);
      setMerchants(prev => [...prev, ...newMerchants]);
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
          <CardDescription>按币种查看商户信息</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as CurrencyTab)}>
            <TabsList className="mb-4 flex overflow-x-auto whitespace-nowrap">
              <TabsTrigger value="all">全部</TabsTrigger>
              <TabsTrigger value="usdt">USDT</TabsTrigger>
              <TabsTrigger value="cny">CNY</TabsTrigger>
              <TabsTrigger value="usd">USD</TabsTrigger>
              <TabsTrigger value="mmk">MMK</TabsTrigger>
              <TabsTrigger value="rm">RM</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-0">
              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="whitespace-nowrap">商户ID</TableHead>
                      <TableHead className="whitespace-nowrap">商户名称</TableHead>
                      <TableHead className="whitespace-nowrap">商户TG</TableHead>
                      <TableHead className="whitespace-nowrap">商户充值总额</TableHead>
                      <TableHead className="whitespace-nowrap">本月充值总额</TableHead>
                      <TableHead className="whitespace-nowrap">商户买分费率</TableHead>
                      <TableHead className="whitespace-nowrap">为我贡献总佣金</TableHead>
                      <TableHead className="whitespace-nowrap">本月为我贡献佣金</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {merchants.map((merchant) => (
                      <TableRow key={merchant.id}>
                        <TableCell className="whitespace-nowrap">{merchant.id}</TableCell>
                        <TableCell className="whitespace-nowrap">{merchant.username}</TableCell>
                        <TableCell className="whitespace-nowrap">{merchant.telegramId}</TableCell>
                        <TableCell className="whitespace-nowrap text-blue-600 font-medium">
                          {merchant.totalDeposit?.toLocaleString()}
                        </TableCell>
                        <TableCell className="whitespace-nowrap text-green-600 font-medium">
                          {merchant.monthlyDeposit?.toLocaleString()}
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          {(merchant.feeRate * 100).toFixed(2)}%
                        </TableCell>
                        <TableCell className="whitespace-nowrap text-purple-600 font-medium">
                          {merchant.totalCommission?.toLocaleString()}
                        </TableCell>
                        <TableCell className="whitespace-nowrap text-orange-600 font-medium">
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
