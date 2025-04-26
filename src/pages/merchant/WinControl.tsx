
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Settings, AlertCircle } from "lucide-react";

// Mock data for current rates and operation logs
const mockCurrentRates = {
  global: 55,
  ips: {
    '192.168.1.1': 60,
    '192.168.1.2': 58,
  },
  players: {
    'player001': 65,
    'player002': 45,
  }
};

const mockOperationLogs = [
  { id: 1, type: 'global', value: 55, operator: 'admin', time: '2024-04-26 10:30:45' },
  { id: 2, type: 'ip', ipAddress: '192.168.1.1', value: 60, operator: 'admin', time: '2024-04-26 09:15:22' },
  { id: 3, type: 'player', playerId: 'player001', value: 65, operator: 'admin', time: '2024-04-25 14:45:36' },
];

const MerchantWinControl: React.FC = () => {
  const { toast } = useToast();
  
  // States for control values
  const [globalRate, setGlobalRate] = useState<string>('');
  const [ipAddress, setIpAddress] = useState<string>('');
  const [ipRate, setIpRate] = useState<string>('');
  const [playerId, setPlayerId] = useState<string>('');
  const [playerRate, setPlayerRate] = useState<string>('');
  
  // States for displaying current rates
  const [currentGlobalRate, setCurrentGlobalRate] = useState<number | null>(null);
  const [currentIpRate, setCurrentIpRate] = useState<number | null>(null);
  const [currentPlayerRate, setCurrentPlayerRate] = useState<number | null>(null);
  
  // States for search functionality
  const [ipSearching, setIpSearching] = useState(false);
  const [playerSearching, setPlayerSearching] = useState(false);
  
  // State for operation logs
  const [logs, setLogs] = useState(mockOperationLogs);
  const [globalLogs, setGlobalLogs] = useState<typeof mockOperationLogs>([]);
  const [ipLogs, setIpLogs] = useState<typeof mockOperationLogs>([]);
  const [playerLogs, setPlayerLogs] = useState<typeof mockOperationLogs>([]);

  // Load current global rate on component mount
  useEffect(() => {
    // In a real app, this would be an API call
    setCurrentGlobalRate(mockCurrentRates.global);
    
    // Filter logs by type
    setGlobalLogs(mockOperationLogs.filter(log => log.type === 'global'));
    setIpLogs(mockOperationLogs.filter(log => log.type === 'ip'));
    setPlayerLogs(mockOperationLogs.filter(log => log.type === 'player'));
  }, []);

  // Handle IP search
  const handleIpSearch = () => {
    if (!ipAddress) {
      toast({
        title: "请输入IP地址",
        variant: "destructive",
      });
      return;
    }
    
    setIpSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      const rate = mockCurrentRates.ips[ipAddress as keyof typeof mockCurrentRates.ips];
      setCurrentIpRate(rate || null);
      setIpRate(rate ? String(rate) : '');
      setIpSearching(false);
      
      if (!rate) {
        toast({
          title: "未找到该IP地址的控制记录",
          description: "将创建新的控制记录",
        });
      }
    }, 500);
  };
  
  // Handle player search
  const handlePlayerSearch = () => {
    if (!playerId) {
      toast({
        title: "请输入玩家ID",
        variant: "destructive",
      });
      return;
    }
    
    setPlayerSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      const rate = mockCurrentRates.players[playerId as keyof typeof mockCurrentRates.players];
      setCurrentPlayerRate(rate || null);
      setPlayerRate(rate ? String(rate) : '');
      setPlayerSearching(false);
      
      if (!rate) {
        toast({
          title: "未找到该玩家的控制记录",
          description: "将创建新的控制记录",
        });
      }
    }, 500);
  };

  // Handle form submission
  const handleSubmit = (type: 'global' | 'ip' | 'player') => {
    const rate = type === 'global' ? globalRate : type === 'ip' ? ipRate : playerRate;
    const numRate = Number(rate);

    if (isNaN(numRate) || numRate < 0 || numRate > 100) {
      toast({
        title: "无效的概率值",
        description: "请输入0-100之间的数值",
        variant: "destructive",
      });
      return;
    }

    // Create new log entry
    const newLog = {
      id: Date.now(),
      type,
      value: numRate,
      operator: 'merchant',
      time: new Date().toLocaleString('zh-CN'),
    } as any;

    if (type === 'ip') {
      newLog.ipAddress = ipAddress;
    } else if (type === 'player') {
      newLog.playerId = playerId;
    }

    // Update logs
    const updatedLogs = [newLog, ...logs];
    setLogs(updatedLogs);

    // Update filtered logs
    if (type === 'global') {
      setGlobalLogs([newLog, ...globalLogs]);
      setCurrentGlobalRate(numRate);
    } else if (type === 'ip') {
      setIpLogs([newLog, ...ipLogs]);
      setCurrentIpRate(numRate);
    } else {
      setPlayerLogs([newLog, ...playerLogs]);
      setCurrentPlayerRate(numRate);
    }

    toast({
      title: "设置成功",
      description: `${type === 'global' ? '全线' : type === 'ip' ? 'IP' : '玩家'}控制已更新`,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">输赢控制</h1>
        <p className="text-muted-foreground">控制游戏的输赢结果（仅支持开元棋牌）</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>控制系统</CardTitle>
          <CardDescription>
            设置游戏输赢概率，注意：杀率不得低于平台基础概率
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="global" className="space-y-4">
            <TabsList className="flex justify-start">
              <TabsTrigger value="global">全线控制</TabsTrigger>
              <TabsTrigger value="ip">IP控制</TabsTrigger>
              <TabsTrigger value="player">玩家控制</TabsTrigger>
            </TabsList>

            <TabsContent value="global" className="space-y-4">
              <div className="grid gap-4">
                {currentGlobalRate !== null && (
                  <div className="flex items-center space-x-2">
                    <Settings className="h-4 w-4 text-blue-500" />
                    <span>当前全局杀率：<strong>{currentGlobalRate}%</strong></span>
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="globalRate">全局杀数设置 (%)</Label>
                  <Input
                    id="globalRate"
                    type="number"
                    min="0"
                    max="100"
                    placeholder="请输入0-100之间的数值"
                    value={globalRate}
                    onChange={(e) => setGlobalRate(e.target.value)}
                  />
                </div>
                <Button onClick={() => handleSubmit('global')}>保存设置</Button>
              </div>
              
              {globalLogs.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-3">操作记录</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>操作类型</TableHead>
                        <TableHead>设定值</TableHead>
                        <TableHead>操作人</TableHead>
                        <TableHead>操作时间</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {globalLogs.map(log => (
                        <TableRow key={log.id}>
                          <TableCell>全局控制</TableCell>
                          <TableCell>{log.value}%</TableCell>
                          <TableCell>{log.operator}</TableCell>
                          <TableCell>{log.time}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </TabsContent>

            <TabsContent value="ip" className="space-y-4">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ipAddress">IP地址</Label>
                  <div className="flex gap-2">
                    <Input
                      id="ipAddress"
                      placeholder="请输入IP地址"
                      value={ipAddress}
                      onChange={(e) => setIpAddress(e.target.value)}
                    />
                    <Button 
                      variant="secondary" 
                      className="shrink-0"
                      onClick={handleIpSearch}
                      disabled={ipSearching}
                    >
                      {ipSearching ? "搜索中..." : "搜索"}
                      {!ipSearching && <Search className="ml-2 h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                
                {currentIpRate !== null && (
                  <div className="flex items-center space-x-2">
                    <Settings className="h-4 w-4 text-blue-500" />
                    <span>IP: <strong>{ipAddress}</strong> 当前杀率：<strong>{currentIpRate}%</strong></span>
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="ipRate">IP杀数设置 (%)</Label>
                  <Input
                    id="ipRate"
                    type="number"
                    min="0"
                    max="100"
                    placeholder="请输入0-100之间的数值"
                    value={ipRate}
                    onChange={(e) => setIpRate(e.target.value)}
                    disabled={currentIpRate === null && !ipAddress}
                  />
                </div>
                <Button 
                  onClick={() => handleSubmit('ip')}
                  disabled={!ipAddress}
                >
                  保存设置
                </Button>
              </div>
              
              {ipLogs.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-3">操作记录</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>IP地址</TableHead>
                        <TableHead>设定值</TableHead>
                        <TableHead>操作人</TableHead>
                        <TableHead>操作时间</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {ipLogs.map(log => (
                        <TableRow key={log.id}>
                          <TableCell>{log.ipAddress}</TableCell>
                          <TableCell>{log.value}%</TableCell>
                          <TableCell>{log.operator}</TableCell>
                          <TableCell>{log.time}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </TabsContent>

            <TabsContent value="player" className="space-y-4">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="playerId">玩家ID</Label>
                  <div className="flex gap-2">
                    <Input
                      id="playerId"
                      placeholder="请输入玩家ID"
                      value={playerId}
                      onChange={(e) => setPlayerId(e.target.value)}
                    />
                    <Button 
                      variant="secondary" 
                      className="shrink-0"
                      onClick={handlePlayerSearch}
                      disabled={playerSearching}
                    >
                      {playerSearching ? "搜索中..." : "搜索"}
                      {!playerSearching && <Search className="ml-2 h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                
                {currentPlayerRate !== null && (
                  <div className="flex items-center space-x-2">
                    <Settings className="h-4 w-4 text-blue-500" />
                    <span>玩家ID: <strong>{playerId}</strong> 当前杀率：<strong>{currentPlayerRate}%</strong></span>
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="playerRate">玩家杀数设置 (%)</Label>
                  <Input
                    id="playerRate"
                    type="number"
                    min="0"
                    max="100"
                    placeholder="请输入0-100之间的数值"
                    value={playerRate}
                    onChange={(e) => setPlayerRate(e.target.value)}
                    disabled={currentPlayerRate === null && !playerId}
                  />
                </div>
                <Button 
                  onClick={() => handleSubmit('player')}
                  disabled={!playerId}
                >
                  保存设置
                </Button>
              </div>
              
              {playerLogs.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-3">操作记录</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>玩家ID</TableHead>
                        <TableHead>设定值</TableHead>
                        <TableHead>操作人</TableHead>
                        <TableHead>操作时间</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {playerLogs.map(log => (
                        <TableRow key={log.id}>
                          <TableCell>{log.playerId}</TableCell>
                          <TableCell>{log.value}%</TableCell>
                          <TableCell>{log.operator}</TableCell>
                          <TableCell>{log.time}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default MerchantWinControl;
