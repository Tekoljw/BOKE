
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const MerchantDashboard: React.FC = () => {
  // Mock data for the dashboard
  const statsData = [
    { title: "今日流水", value: "¥58,942", change: "+8%", status: "positive" },
    { title: "在线玩家", value: 125, change: "+15%", status: "positive" },
    { title: "游戏分数余额", value: "125,000", change: "-3%", status: "negative" },
    { title: "USDT余额", value: "$15,280", change: "+2%", status: "positive" },
  ];
  
  const revenueData = [
    { name: "00:00", revenue: 1200 },
    { name: "03:00", revenue: 800 },
    { name: "06:00", revenue: 600 },
    { name: "09:00", revenue: 1500 },
    { name: "12:00", revenue: 2500 },
    { name: "15:00", revenue: 3200 },
    { name: "18:00", revenue: 4500 },
    { name: "21:00", revenue: 3800 },
  ];
  
  const recentGameRecords = [
    { id: '1', player: '玩家001', game: '斗地主', bet: 1000, win: 1500, time: '15:32' },
    { id: '2', player: '玩家158', game: '麻将', bet: 800, win: 0, time: '15:28' },
    { id: '3', player: '玩家042', game: '德州扑克', bet: 2000, win: 3800, time: '15:15' },
    { id: '4', player: '玩家287', game: '二八杠', bet: 500, win: 0, time: '15:05' },
    { id: '5', player: '玩家124', game: '三张牌', bet: 1200, win: 0, time: '14:58' },
  ];
  
  const topGames = [
    { name: '斗地主', plays: 284, profit: 15800 },
    { name: '麻将', plays: 215, profit: 12300 },
    { name: '德州扑克', plays: 182, profit: 9500 },
    { name: '二八杠', plays: 156, profit: 8200 },
  ];
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">商户仪表盘</h1>
        <p className="text-muted-foreground">欢迎回来，查看您的经营数据</p>
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
      <Card>
        <CardHeader>
          <CardTitle>今日流水趋势</CardTitle>
          <CardDescription>按小时统计的游戏流水</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => `¥${value}`} />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  name="流水"
                  stroke="#0F6FFF" 
                  strokeWidth={2} 
                  dot={{ r: 4 }} 
                  activeDot={{ r: 6 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Game Records */}
        <Card>
          <CardHeader>
            <CardTitle>最近游戏记录</CardTitle>
            <CardDescription>近期玩家游戏记录</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>玩家</TableHead>
                  <TableHead>游戏</TableHead>
                  <TableHead>下注</TableHead>
                  <TableHead>赢取</TableHead>
                  <TableHead>时间</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentGameRecords.map(record => (
                  <TableRow key={record.id}>
                    <TableCell>{record.player}</TableCell>
                    <TableCell>{record.game}</TableCell>
                    <TableCell>{record.bet}</TableCell>
                    <TableCell className={record.win > 0 ? "text-green-500" : "text-red-500"}>
                      {record.win > 0 ? `+${record.win}` : record.win}
                    </TableCell>
                    <TableCell>{record.time}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        {/* Top Games */}
        <Card>
          <CardHeader>
            <CardTitle>热门游戏</CardTitle>
            <CardDescription>按玩家参与度排序</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {topGames.map((game, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <span className="font-semibold">{game.name}</span>
                      <span className="text-sm text-muted-foreground ml-2">
                        {game.plays} 场次
                      </span>
                    </div>
                    <div className="text-sm font-medium">
                      营收: ¥{game.profit}
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-primary h-2.5 rounded-full" 
                      style={{ width: `${(game.plays / topGames[0].plays) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Account Info */}
      <Card>
        <CardHeader>
          <CardTitle>账户信息</CardTitle>
          <CardDescription>您的商户账户详情</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">基本信息</h3>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">商户名称</span>
                  <span>GamePalace</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">代理商</span>
                  <span>TopAgent</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">注册日期</span>
                  <span>2023-12-15</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">账户状态</span>
                  <span className="badge-active">正常</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">结算信息</h3>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">手续费率</span>
                  <span>5%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">代理商分成</span>
                  <span>25%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">本月已结算</span>
                  <span>¥125,800</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">下次结算日</span>
                  <span>2024-05-01</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MerchantDashboard;
