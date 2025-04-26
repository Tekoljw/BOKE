
import React, { useState } from 'react';
import { Calendar, Search, User, Ban, ChevronDown, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Alert, AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

// Sample data for vendors
const vendors = [
  { id: "all", name: "全部线路" },
  { id: "vendor1", name: "波克棋牌" },
  { id: "vendor2", name: "龙虎大战" },
  { id: "vendor3", name: "百人牛牛" },
];

// Enhanced player data type
interface Player {
  id: string;
  balance: number;
  totalDeposit: number;
  totalWithdraw: number;
  totalLoss: number;
  totalWin: number;
  netProfit: number;
  lastGameTime: Date;
  totalGameTime: number;
  isBlacklisted: boolean;
}

// Sample data generator
const generatePlayers = (count: number): Player[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `player${i + 1}`,
    balance: Math.floor(Math.random() * 10000),
    totalDeposit: Math.floor(Math.random() * 50000),
    totalWithdraw: Math.floor(Math.random() * 40000),
    totalLoss: Math.floor(Math.random() * 30000),
    totalWin: Math.floor(Math.random() * 35000),
    netProfit: Math.floor(Math.random() * 10000 - 5000),
    lastGameTime: new Date(Date.now() - Math.floor(Math.random() * 10 * 24 * 60 * 60 * 1000)),
    totalGameTime: Math.floor(Math.random() * 1000),
    isBlacklisted: Math.random() > 0.9
  }));
};

const playerData = generatePlayers(100);

const MerchantPlayers: React.FC = () => {
  const isMobile = useIsMobile();
  const [selectedVendor, setSelectedVendor] = useState<string>("all");
  const [searchPlayerId, setSearchPlayerId] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [displayCount, setDisplayCount] = useState<number>(50);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [blacklistDialogOpen, setBlacklistDialogOpen] = useState<boolean>(false);
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);
  const [selectedAction, setSelectedAction] = useState<'add' | 'remove' | null>(null);
  
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
  
  const handleBlacklistAction = (playerId: string, action: 'add' | 'remove') => {
    setSelectedPlayer(playerId);
    setSelectedAction(action);
    setBlacklistDialogOpen(true);
  };

  const handleConfirmBlacklist = () => {
    if (selectedPlayer && selectedAction) {
      // This would be replaced with an actual API call in a real application
      console.log(`${selectedAction === 'add' ? 'Adding to' : 'Removing from'} blacklist: ${selectedPlayer}`);
    }
    setBlacklistDialogOpen(false);
    setSelectedPlayer(null);
    setSelectedAction(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">玩家管理</h1>
        <p className="text-muted-foreground">管理玩家账号及资金</p>
      </div>
      
      {/* Vendor Tabs - Full width row */}
      <Card className="p-2">
        <Tabs value={selectedVendor} onValueChange={setSelectedVendor}>
          <TabsList className="w-full justify-start overflow-auto">
            {vendors.map((vendor) => (
              <TabsTrigger key={vendor.id} value={vendor.id} className="min-w-[120px]">
                {vendor.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </Card>
      
      {/* Search Controls */}
      <div className={cn(
        "flex gap-4",
        isMobile ? "flex-col" : "items-center justify-between"
      )}>
        <Tabs defaultValue="today" className="w-full md:w-auto">
          <TabsList>
            <TabsTrigger value="today">今日</TabsTrigger>
            <TabsTrigger value="yesterday">昨日</TabsTrigger>
            <TabsTrigger value="month">本月</TabsTrigger>
            <TabsTrigger value="all">累积</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className={cn(
          "flex gap-4",
          isMobile ? "flex-col" : "items-center"
        )}>
          {/* Date Selector */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className={cn(
                "justify-start text-left",
                isMobile ? "w-full" : "w-[240px]"
              )}>
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
              />
            </PopoverContent>
          </Popover>
          
          {/* Player ID Search */}
          <div className="relative w-full md:w-[240px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="搜索玩家ID" 
              className="pl-10" 
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
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[180px]">玩家ID</TableHead>
                  <TableHead className="text-right">分数余额</TableHead>
                  <TableHead className="text-right">累积上分</TableHead>
                  <TableHead className="text-right">累积下分</TableHead>
                  <TableHead className="text-right">总输分</TableHead>
                  <TableHead className="text-right">总赢分</TableHead>
                  <TableHead className="text-right">玩家盈利</TableHead>
                  <TableHead className="text-right">最后游戏</TableHead>
                  <TableHead className="text-right">游戏时长</TableHead>
                  <TableHead className="text-center">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {displayedPlayers.length > 0 ? (
                  displayedPlayers.map((player) => (
                    <TableRow key={player.id}>
                      <TableCell>
                        <div className="flex items-center">
                          <User className="mr-2 h-4 w-4 text-muted-foreground" />
                          {player.id}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">{player.balance.toLocaleString()}</TableCell>
                      <TableCell className="text-right">{player.totalDeposit.toLocaleString()}</TableCell>
                      <TableCell className="text-right">{player.totalWithdraw.toLocaleString()}</TableCell>
                      <TableCell className="text-right">{player.totalLoss.toLocaleString()}</TableCell>
                      <TableCell className="text-right">{player.totalWin.toLocaleString()}</TableCell>
                      <TableCell className={cn(
                        "text-right font-medium",
                        player.netProfit >= 0 ? "text-green-500" : "text-red-500"
                      )}>
                        {player.netProfit.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right">
                        {format(player.lastGameTime, "MM-dd HH:mm")}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          {Math.floor(player.totalGameTime / 60)}小时
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Button
                          variant={player.isBlacklisted ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleBlacklistAction(player.id, player.isBlacklisted ? 'remove' : 'add')}
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
                    <TableCell colSpan={10} className="h-24 text-center">
                      未找到玩家记录
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
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

      {/* Blacklist Confirmation Dialog */}
      <AlertDialog open={blacklistDialogOpen} onOpenChange={setBlacklistDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {selectedAction === 'add' ? '确认设置黑名单' : '确认解除黑名单'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {selectedAction === 'add' 
                ? '确定要将该玩家加入黑名单吗？加入黑名单后玩家将无法登录游戏。' 
                : '确定要将该玩家从黑名单中移除吗？移除后玩家将可以正常登录游戏。'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmBlacklist}>
              确认
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default MerchantPlayers;
