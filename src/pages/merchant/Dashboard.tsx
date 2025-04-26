import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Users, TrendingUp, TrendingDown, Wallet, Coins } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";

const MerchantDashboard: React.FC = () => {
  const [selectedVendor, setSelectedVendor] = useState("all");
  const [timeFrame, setTimeFrame] = useState("today");
  const [gameRecordsVendor, setGameRecordsVendor] = useState("all");
  const [topGamesVendor, setTopGamesVendor] = useState("all");
  const [visibleVendorsInChart, setVisibleVendorsInChart] = useState<string[]>([]);
  
  const vendors = [
    { id: "all", name: "全部" },
    { id: "vendor1", name: "波克棋牌" },
    { id: "vendor2", name: "开元棋牌" },
    { id: "vendor3", name: "乐游棋牌" },
    ...Array.from({ length: 47 }, (_, i) => ({
      id: `vendor${i + 4}`,
      name: `厂商 ${i + 4}`
    }))
  ];
  
  const handleVendorChange = (value: string) => {
    setSelectedVendor(value);
  };
  
  const toggleVendorInChart = (vendorId: string) => {
    setVisibleVendorsInChart(prev => 
      prev.includes(vendorId) 
        ? prev.filter(id => id !== vendorId) 
        : [...prev, vendorId]
    );
  };
  
  const getStatsData = () => {
    return [
      { title: "玩家总输分", value: timeFrame === "accumulated" ? "¥1,250,845" : "¥58,942", icon: <TrendingDown className="text-red-500" /> },
      { title: "玩家总赢分", value: timeFrame === "accumulated" ? "¥1,050,230" : "¥42,126", icon: <TrendingUp className="text-green-500" /> },
      { title: "商户盈利", value: timeFrame === "accumulated" ? "¥200,615" : "¥16,816", icon: <Wallet className="text-blue-500" /> },
      { title: "厂商分成", value: timeFrame === "accumulated" ? "¥50,153" : "¥4,204", icon: <Coins className="text-yellow-500" /> },
      { title: "活跃用户", value: timeFrame === "accumulated" ? "8,450" : "125", icon: <Users className="text-purple-500" /> },
    ];
  };
  
  const profitTrendData = [
    { date: "04-01", vendor1: 1200, vendor2: 800, vendor3: 500 },
    { date: "04-02", vendor1: 1400, vendor2: 1000, vendor3: 600 },
    { date: "04-03", vendor1: 1100, vendor2: 1200, vendor3: 700 },
    { date: "04-04", vendor1: 1600, vendor2: 900, vendor3: 800 },
    { date: "04-05", vendor1: 1800, vendor2: 1100, vendor3: 750 },
    { date: "04-06", vendor1: 2000, vendor2: 1300, vendor3: 950 },
    { date: "04-07", vendor1: 1900, vendor2: 1400, vendor3: 1050 },
    { date: "04-08", vendor1: 2200, vendor2: 1600, vendor3: 1100 },
    { date: "04-09", vendor1: 2400, vendor2: 1500, vendor3: 900 },
    { date: "04-10", vendor1: 2100, vendor2: 1700, vendor3: 1200 },
    { date: "04-11", vendor1: 2300, vendor2: 1800, vendor3: 1300 },
    { date: "04-12", vendor1: 2500, vendor2: 1900, vendor3: 1400 },
    { date: "04-13", vendor1: 2700, vendor2: 2000, vendor3: 1500 },
    { date: "04-14", vendor1: 2600, vendor2: 2100, vendor3: 1600 },
    { date: "04-15", vendor1: 2800, vendor2: 2200, vendor3: 1700 },
    { date: "04-16", vendor1: 3000, vendor2: 2400, vendor3: 1900 },
    { date: "04-17", vendor1: 2900, vendor2: 2300, vendor3: 1800 },
    { date: "04-18", vendor1: 3100, vendor2: 2500, vendor3: 2000 },
    { date: "04-19", vendor1: 3300, vendor2: 2700, vendor3: 2100 },
    { date: "04-20", vendor1: 3200, vendor2: 2600, vendor3: 2200 },
    { date: "04-21", vendor1: 3400, vendor2: 2800, vendor3: 2300 },
    { date: "04-22", vendor1: 3600, vendor2: 3000, vendor3: 2500 },
    { date: "04-23", vendor1: 3500, vendor2: 2900, vendor3: 2400 },
    { date: "04-24", vendor1: 3700, vendor2: 3100, vendor3: 2600 },
    { date: "04-25", vendor1: 3900, vendor2: 3300, vendor3: 2800 },
    { date: "04-26", vendor1: 3800, vendor2: 3200, vendor3: 2700 },
    { date: "04-27", vendor1: 4000, vendor2: 3400, vendor3: 2900 },
    { date: "04-28", vendor1: 4200, vendor2: 3600, vendor3: 3100 },
    { date: "04-29", vendor1: 4100, vendor2: 3500, vendor3: 3000 },
    { date: "04-30", vendor1: 4300, vendor2: 3700, vendor3: 3200 },
  ];
  
  const gameRecordsByVendor = {
    all: [
      { id: '1', player: '玩家001', game: '斗地主', vendor: '波克棋牌', bet: 1000, win: 1500, time: '15:32' },
      { id: '2', player: '玩家158', game: '麻将', vendor: '开元棋牌', bet: 800, win: 0, time: '15:28' },
      { id: '3', player: '玩家042', game: '德州扑克', vendor: '乐游棋牌', bet: 2000, win: 3800, time: '15:15' },
      { id: '4', player: '玩家287', game: '二八杠', vendor: '波克棋牌', bet: 500, win: 0, time: '15:05' },
      { id: '5', player: '玩家124', game: '三张牌', vendor: '开元棋牌', bet: 1200, win: 0, time: '14:58' },
    ],
    vendor1: [
      { id: '1', player: '玩家001', game: '斗地主', vendor: '波克棋牌', bet: 1000, win: 1500, time: '15:32' },
      { id: '4', player: '玩家287', game: '二八杠', vendor: '波克棋牌', bet: 500, win: 0, time: '15:05' },
    ],
    vendor2: [
      { id: '2', player: '玩家158', game: '麻将', vendor: '开元棋牌', bet: 800, win: 0, time: '15:28' },
      { id: '5', player: '玩家124', game: '三张牌', vendor: '开元棋牌', bet: 1200, win: 0, time: '14:58' },
    ],
    vendor3: [
      { id: '3', player: '玩家042', game: '德州扑克', vendor: '乐游棋牌', bet: 2000, win: 3800, time: '15:15' },
    ],
  };
  
  const topGamesByVendor = {
    all: [
      { name: '斗地主', vendor: '波克棋牌', plays: 284, profit: 15800 },
      { name: '麻将', vendor: '开元棋牌', plays: 215, profit: 12300 },
      { name: '德州扑克', vendor: '乐游棋牌', plays: 182, profit: 9500 },
      { name: '二八杠', vendor: '波克棋牌', plays: 156, profit: 8200 },
    ],
    vendor1: [
      { name: '斗地主', vendor: '波克棋牌', plays: 284, profit: 15800 },
      { name: '二八杠', vendor: '波克棋牌', plays: 156, profit: 8200 },
      { name: '跑得快', vendor: '波克棋牌', plays: 135, profit: 7200 },
      { name: '象棋', vendor: '波克棋牌', plays: 112, profit: 6100 },
    ],
    vendor2: [
      { name: '麻将', vendor: '开元棋牌', plays: 215, profit: 12300 },
      { name: '炸金花', vendor: '开元棋牌', plays: 142, profit: 7800 },
    ],
    vendor3: [
      { name: '德州扑克', vendor: '乐游棋牌', plays: 182, profit: 9500 },
      { name: '21点', vendor: '乐游棋牌', plays: 125, profit: 6800 },
    ],
  };
  
  const statsData = getStatsData();
  
  const recentGameRecords = gameRecordsByVendor[gameRecordsVendor as keyof typeof gameRecordsByVendor] || gameRecordsByVendor.all;
  
  const topGames = topGamesByVendor[topGamesVendor as keyof typeof topGamesByVendor] || topGamesByVendor.all;
  
  const vendorColors: {[key: string]: string} = {
    vendor1: "#8B5CF6",
    vendor2: "#0EA5E9",
    vendor3: "#F97316",
    vendor4: "#10B981",
    vendor5: "#EC4899",
    vendor6: "#EF4444",
    vendor7: "#F59E0B",
    vendor8: "#6366F1",
    vendor9: "#14B8A6",
    vendor10: "#D946EF",
  };
  
  const getVendorColor = (vendorId: string) => {
    if (vendorColors[vendorId]) return vendorColors[vendorId];
    
    const hash = vendorId.split('').reduce((acc, char) => {
      return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);
    
    const h = hash % 360;
    const s = 70 + (hash % 20);
    const l = 40 + (hash % 20);
    
    return `hsl(${h}, ${s}%, ${l}%)`;
  };
  
  const displayedVendors = visibleVendorsInChart.length > 0 
    ? visibleVendorsInChart 
    : vendors.slice(1, 6).map(v => v.id);
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">商户仪表盘</h1>
        <p className="text-muted-foreground">欢迎回来，查看您的经营数据</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-4">
          <label className="text-sm text-muted-foreground mb-1 block">厂商线路</label>
          <Select value={selectedVendor} onValueChange={handleVendorChange}>
            <SelectTrigger>
              <SelectValue placeholder="选择厂商"/>
            </SelectTrigger>
            <SelectContent>
              <ScrollArea className="h-72">
                {vendors.map(vendor => (
                  <SelectItem key={vendor.id} value={vendor.id}>
                    {vendor.name}
                  </SelectItem>
                ))}
              </ScrollArea>
            </SelectContent>
          </Select>
        </div>
        
        <div className="md:col-span-8">
          <label className="text-sm text-muted-foreground mb-1 block">时间范围</label>
          <Tabs value={timeFrame} onValueChange={setTimeFrame}>
            <TabsList className="w-full grid grid-cols-4">
              <TabsTrigger value="today">今日</TabsTrigger>
              <TabsTrigger value="yesterday">昨日</TabsTrigger>
              <TabsTrigger value="month">本月</TabsTrigger>
              <TabsTrigger value="accumulated">累积</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {statsData.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardDescription>{stat.title}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="text-2xl font-bold">{stat.value}</div>
                {stat.icon}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div>
              <CardTitle>最近30天盈利趋势</CardTitle>
              <CardDescription>按天统计的游戏盈利</CardDescription>
            </div>
            <div className="flex flex-wrap gap-2">
              <Select
                value="chart-options"
                disabled
              >
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="显示厂商" />
                </SelectTrigger>
                <SelectContent>
                  <ScrollArea className="h-72">
                    {vendors.slice(1).map(vendor => (
                      <div key={vendor.id} className="flex items-center px-2 py-1.5">
                        <div 
                          className="w-3 h-3 rounded-full mr-2" 
                          style={{ backgroundColor: getVendorColor(vendor.id) }}
                        />
                        <span className="text-sm">{vendor.name}</span>
                      </div>
                    ))}
                  </ScrollArea>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={profitTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={(value) => `¥${value}`} />
                <Legend />
                {displayedVendors.map((vendorId) => {
                  const vendor = vendors.find(v => v.id === vendorId);
                  if (!vendor) return null;
                  return (
                    <Line
                      key={vendorId}
                      type="monotone"
                      dataKey={vendorId}
                      name={vendor.name}
                      stroke={getVendorColor(vendorId)}
                      strokeWidth={2}
                      dot={{ r: 2 }}
                      activeDot={{ r: 6 }}
                    />
                  );
                })}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <CardTitle>最近游戏记录</CardTitle>
              <div className="w-full md:w-40">
                <Select value={gameRecordsVendor} onValueChange={setGameRecordsVendor}>
                  <SelectTrigger>
                    <SelectValue placeholder="选择厂商"/>
                  </SelectTrigger>
                  <SelectContent>
                    <ScrollArea className="h-72">
                      {vendors.map(vendor => (
                        <SelectItem key={vendor.id} value={vendor.id}>
                          {vendor.name}
                        </SelectItem>
                      ))}
                    </ScrollArea>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <CardDescription>近期玩家游戏记录</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>玩家</TableHead>
                  <TableHead>游戏</TableHead>
                  <TableHead>厂商</TableHead>
                  <TableHead>下注</TableHead>
                  <TableHead>赢取</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentGameRecords.map(record => (
                  <TableRow key={record.id}>
                    <TableCell>{record.player}</TableCell>
                    <TableCell>{record.game}</TableCell>
                    <TableCell>{record.vendor}</TableCell>
                    <TableCell>{record.bet}</TableCell>
                    <TableCell className={record.win > 0 ? "text-green-500" : "text-red-500"}>
                      {record.win > 0 ? `+${record.win}` : record.win}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <CardTitle>热门游戏</CardTitle>
              <div className="w-full md:w-40">
                <Select value={topGamesVendor} onValueChange={setTopGamesVendor}>
                  <SelectTrigger>
                    <SelectValue placeholder="选择厂商"/>
                  </SelectTrigger>
                  <SelectContent>
                    <ScrollArea className="h-72">
                      {vendors.map(vendor => (
                        <SelectItem key={vendor.id} value={vendor.id}>
                          {vendor.name}
                        </SelectItem>
                      ))}
                    </ScrollArea>
                  </SelectContent>
                </Select>
              </div>
            </div>
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
                        {game.vendor} · {game.plays} 场次
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
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>账户信息</CardTitle>
            <CardDescription>您的商户账户详情</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
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
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">商户币种</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-md font-medium">USDT</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>账户余额</CardTitle>
            <CardDescription>您的账户余额信息</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">商户余额 (USDT)</span>
                <span className="text-green-600 font-bold">$35,250</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">分数余额</span>
                <span className="font-bold">2,580,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">赠分余额</span>
                <span className="text-blue-600 font-bold">120,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">上次买分时间</span>
                <span>2024-04-22 14:30</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>线路分成</CardTitle>
            <CardDescription>已开通的厂商线路信息</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>厂商名称</TableHead>
                  <TableHead>运营游戏数量</TableHead>
                  <TableHead>当前状态</TableHead>
                  <TableHead>本月盈利</TableHead>
                  <TableHead>厂商分成费率</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>波克棋牌</TableCell>
                  <TableCell>42</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-md text-sm">正常</span>
                  </TableCell>
                  <TableCell className="text-green-600">¥125,800</TableCell>
                  <TableCell>70%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>开元棋牌</TableCell>
                  <TableCell>38</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-md text-sm">正常</span>
                  </TableCell>
                  <TableCell className="text-green-600">¥98,500</TableCell>
                  <TableCell>65%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>乐游棋牌</TableCell>
                  <TableCell>35</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-md text-sm">维护中</span>
                  </TableCell>
                  <TableCell className="text-green-600">¥85,200</TableCell>
                  <TableCell>60%</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MerchantDashboard;
