
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AdminDashboard: React.FC = () => {
  // Mock data for the dashboard
  const statsData = [
    { title: "总商户数", value: 125, change: "+12%", status: "positive" },
    { title: "总代理商数", value: 38, change: "+5%", status: "positive" },
    { title: "今日活跃玩家", value: 2845, change: "+18%", status: "positive" },
    { title: "今日总流水", value: "¥285,942", change: "-3%", status: "negative" },
  ];
  
  const revenueData = [
    { name: "1月", revenue: 12500, profit: 3750 },
    { name: "2月", revenue: 15000, profit: 4500 },
    { name: "3月", revenue: 18000, profit: 5400 },
    { name: "4月", revenue: 22000, profit: 6600 },
    { name: "5月", revenue: 19500, profit: 5850 },
    { name: "6月", revenue: 25000, profit: 7500 },
  ];
  
  const gamePerformance = [
    { name: "斗地主", plays: 1250, revenue: 15000 },
    { name: "麻将", plays: 950, revenue: 12000 },
    { name: "德州扑克", plays: 850, revenue: 10500 },
    { name: "二八杠", plays: 720, revenue: 9000 },
    { name: "三张牌", plays: 650, revenue: 8200 },
  ];
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">平台仪表盘</h1>
        <p className="text-muted-foreground">平台数据概览和关键指标</p>
      </div>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardDescription>{stat.title}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-end">
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className={`text-sm ${stat.status === 'positive' ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.change}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Revenue Chart */}
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>收入趋势</CardTitle>
          <CardDescription>近6个月平台总收入和利润</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => `¥${value}`} />
                <Bar dataKey="revenue" name="总收入" fill="#0F6FFF" />
                <Bar dataKey="profit" name="利润" fill="#FF6B00" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Popular Games */}
        <Card>
          <CardHeader>
            <CardTitle>热门游戏</CardTitle>
            <CardDescription>按游戏参与度排序</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {gamePerformance.map((game, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">{game.name}</div>
                    <div className="text-sm text-muted-foreground">{game.plays} 场次</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">¥{game.revenue.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">收入</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>最近活动</CardTitle>
            <CardDescription>系统最新活动记录</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: "新商户注册", time: "10分钟前", description: "商户 'GameZone' 完成注册" },
                { title: "佣金结算", time: "1小时前", description: "代理商 'TopAgent' 佣金 ¥12,500 已结算" },
                { title: "系统更新", time: "3小时前", description: "系统维护完成，所有游戏恢复运行" },
                { title: "新游戏上线", time: "昨天", description: "德州扑克专业版已上线" },
                { title: "代理商报表", time: "2天前", description: "月度代理商报表已生成" },
              ].map((activity, index) => (
                <div key={index} className="flex">
                  <div className="mr-4 flex h-full w-[2px] bg-border">
                    <div className="mt-2 h-2 w-2 rounded-full bg-primary"></div>
                  </div>
                  <div>
                    <div className="font-medium">{activity.title}</div>
                    <div className="text-sm text-muted-foreground">{activity.time}</div>
                    <div className="text-sm mt-1">{activity.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
