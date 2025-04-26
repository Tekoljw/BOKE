
import React, { useState } from 'react';
import { Calendar, Search, User, Ban, ChevronDown } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

// Sample data for vendors
const vendors = [
  { id: "all", name: "全部线路" },
  { id: "vendor1", name: "波克棋牌" },
  { id: "vendor2", name: "龙虎大战" },
  { id: "vendor3", name: "百人牛牛" },
];

// Sample data for players
const generatePlayers = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: `player${i + 1}`,
    balance: Math.floor(Math.random() * 10000),
    totalDeposit: Math.floor(Math.random() * 50000),
    totalWithdraw: Math.floor(Math.random() * 40000),
    isBlacklisted: Math.random() > 0.9
  }));
};

const playerData = generatePlayers(100);

const MerchantPlayers: React.FC = () => {
  const [selectedVendor, setSelectedVendor] = useState<string>("all");
  const [searchPlayerId, setSearchPlayerId] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [displayCount, setDisplayCount] = useState<number>(50);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  
  // Filter players based on search criteria
  const filteredPlayers = playerData.filter(player => {
    return player.id.toLowerCase().includes(searchPlayerId.toLowerCase());
  });
  
  // Display only a portion of the filtered players
  const displayedPlayers = filteredPlayers.slice(0, displayCount);
  
  const handleLoadMore = () => {
    setLoadingMore(true);
    // Simulate loading delay
    setTimeout(() => {
      setDisplayCount(prev => Math.min(prev + 50, filteredPlayers.length));
      setLoadingMore(false);
    }, 1000);
  };
  
  const handleToggleBlacklist = (playerId: string) => {
    // This would be replaced with an actual API call in a real application
    console.log(`Toggle blacklist for player: ${playerId}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">玩家管理</h1>
        <p className="text-muted-foreground">管理玩家账号及资金</p>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="min-w-[200px]">
            <Select value={selectedVendor} onValueChange={setSelectedVendor}>
              <SelectTrigger>
                <SelectValue placeholder="选择厂商线路" />
              </SelectTrigger>
              <SelectContent>
                {vendors.map((vendor) => (
                  <SelectItem key={vendor.id} value={vendor.id}>
                    {vendor.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <Tabs defaultValue="today" className="ml-2">
            <TabsList>
              <TabsTrigger value="today">今日</TabsTrigger>
              <TabsTrigger value="yesterday">昨日</TabsTrigger>
              <TabsTrigger value="month">本月</TabsTrigger>
              <TabsTrigger value="all">累积</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <div className="flex gap-4">
          {/* Date Selector */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[240px] justify-start text-left">
                <Calendar className="mr-2 h-4 w-4" />
                {selectedDate ? (
                  format(selectedDate, "yyyy-MM-dd")
                ) : (
                  <span>选择日期</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
          
          {/* Player ID Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="搜索玩家ID" 
              className="pl-10 w-[240px]" 
              value={searchPlayerId}
              onChange={(e) => setSearchPlayerId(e.target.value)}
            />
          </div>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>玩家列表</CardTitle>
          <CardDescription>
            查看和管理玩家账号信息
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>玩家ID</TableHead>
                <TableHead className="text-right">分数余额</TableHead>
                <TableHead className="text-right">累积上分</TableHead>
                <TableHead className="text-right">累积下分</TableHead>
                <TableHead className="text-center">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayedPlayers.length > 0 ? (
                displayedPlayers.map((player) => (
                  <TableRow key={player.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <User className="mr-2 h-4 w-4 text-muted-foreground" />
                        {player.id}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">{player.balance.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{player.totalDeposit.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{player.totalWithdraw.toLocaleString()}</TableCell>
                    <TableCell className="text-center">
                      <Button
                        variant={player.isBlacklisted ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleToggleBlacklist(player.id)}
                        className={player.isBlacklisted ? "bg-red-500 hover:bg-red-600" : ""}
                      >
                        <Ban className="mr-1 h-4 w-4" />
                        {player.isBlacklisted ? "解除黑名单" : "设置黑名单"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    未找到玩家记录
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
        {filteredPlayers.length > displayCount && (
          <CardFooter className="flex justify-center border-t pt-6">
            <Button 
              variant="outline" 
              onClick={handleLoadMore}
              disabled={loadingMore}
              className="w-[200px]"
            >
              {loadingMore ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  正在加载...
                </>
              ) : (
                <>
                  <ChevronDown className="mr-2 h-4 w-4" />
                  查看更多 ({filteredPlayers.length - displayCount})
                </>
              )}
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default MerchantPlayers;
