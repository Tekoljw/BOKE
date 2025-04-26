
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { generateRandomMerchants } from '@/utils/mockData';

const AgentCommission: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [merchants] = React.useState(() => generateRandomMerchants(20));

  const handleLoadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
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
        </CardContent>
      </Card>
    </div>
  );
};

export default AgentCommission;
