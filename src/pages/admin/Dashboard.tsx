
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ImportantNotices } from '@/components/dashboard/ImportantNotices';
import { PromotionStats, ProfitStats } from '@/components/dashboard/DashboardStats';
import { RankingList } from '@/components/dashboard/RankingList';

const AdminDashboard: React.FC = () => {
  const [timeFrame, setTimeFrame] = useState('today');
  const [chartView, setChartView] = useState<'daily' | 'monthly'>('daily');
  
  const dailyData = [
    { date: "04-20", vendor1: 2500, vendor2: 1800, vendor3: 1200 },
    { date: "04-21", vendor1: 2800, vendor2: 2000, vendor3: 1500 },
    { date: "04-22", vendor1: 2600, vendor2: 1900, vendor3: 1300 },
    { date: "04-23", vendor1: 3000, vendor2: 2200, vendor3: 1600 },
    { date: "04-24", vendor1: 2900, vendor2: 2100, vendor3: 1400 },
    { date: "04-25", vendor1: 3200, vendor2: 2400, vendor3: 1800 },
    { date: "04-26", vendor1: 3500, vendor2: 2600, vendor3: 2000 },
  ];

  const monthlyData = [
    { month: "1月", vendor1: 75000, vendor2: 55000, vendor3: 35000 },
    { month: "2月", vendor1: 82000, vendor2: 58000, vendor3: 38000 },
    { month: "3月", vendor1: 88000, vendor2: 62000, vendor3: 42000 },
    { month: "4月", vendor1: 95000, vendor2: 68000, vendor3: 45000 },
  ];

  const vendors = [
    { id: 'vendor1', name: '波克棋牌', amount: 95000 },
    { id: 'vendor2', name: '开元棋牌', amount: 68000 },
    { id: 'vendor3', name: '乐游棋牌', amount: 45000 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">平台仪表盘</h1>
        <p className="text-muted-foreground">平台数据概览和关键指标</p>
      </div>

      <ImportantNotices />
      
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>推广情况</CardTitle>
            <CardDescription>商户和代理推广数据统计</CardDescription>
          </CardHeader>
          <CardContent>
            <PromotionStats />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>盈利情况</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={timeFrame} onValueChange={setTimeFrame}>
              <TabsList>
                <TabsTrigger value="today">今日</TabsTrigger>
                <TabsTrigger value="yesterday">昨日</TabsTrigger>
                <TabsTrigger value="month">本月</TabsTrigger>
                <TabsTrigger value="lastMonth">上月</TabsTrigger>
                <TabsTrigger value="year">今年</TabsTrigger>
              </TabsList>
              <TabsContent value={timeFrame}>
                <ProfitStats timeFrame={timeFrame} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>收入趋势</CardTitle>
              <CardDescription>按时间统计的收入数据</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button 
                variant={chartView === 'daily' ? 'default' : 'outline'} 
                onClick={() => setChartView('daily')}
              >
                日
              </Button>
              <Button 
                variant={chartView === 'monthly' ? 'default' : 'outline'} 
                onClick={() => setChartView('monthly')}
              >
                月
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartView === 'daily' ? dailyData : monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey={chartView === 'daily' ? 'date' : 'month'} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="vendor1" name="波克棋牌" fill="#8B5CF6" />
                  <Bar dataKey="vendor2" name="开元棋牌" fill="#0EA5E9" />
                  <Bar dataKey="vendor3" name="乐游棋牌" fill="#F97316" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>热门线路</CardTitle>
              <CardDescription>按上分金额排序</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {vendors.map((vendor, index) => (
                  <div key={vendor.id} className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">{vendor.name}</div>
                      <div className="text-sm text-muted-foreground">
                        上分金额 (USDT)
                      </div>
                    </div>
                    <div className="text-right font-medium">
                      ${vendor.amount.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <RankingList />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
