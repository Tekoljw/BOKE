
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Settings, AlertCircle, Ban } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

// Mock data for current rates and operation logs
const mockCurrentRates = {
  global: 55,
  blockedIps: ['192.168.1.1', '192.168.1.2'],
  players: {
    'player001': 2,
    'player002': 1,
  }
};

const mockOperationLogs = [
  { id: 1, type: 'global', value: 55, operator: 'admin', time: '2024-04-26 10:30:45' },
  { id: 2, type: 'ip', ipAddress: '192.168.1.1', action: 'block', operator: 'admin', time: '2024-04-26 09:15:22' },
  { id: 3, type: 'player', playerId: 'player001', value: 2, operator: 'admin', time: '2024-04-25 14:45:36' },
];

const playerLevels = [
  { value: "1", label: "等级1 - 轻度追杀" },
  { value: "2", label: "等级2 - 中度追杀" },
  { value: "3", label: "等级3 - 重度追杀" }
];

const MerchantWinControl: React.FC = () => {
  const { toast } = useToast();
  
  // States for global control
  const [globalRate, setGlobalRate] = useState<string>('');
  const [currentGlobalRate, setCurrentGlobalRate] = useState<number | null>(null);
  
  // States for IP control
  const [ipAddress, setIpAddress] = useState<string>('');
  const [ipSearching, setIpSearching] = useState(false);
  const [isIpBlocked, setIsIpBlocked] = useState<boolean>(false);
  
  // States for player control
  const [playerId, setPlayerId] = useState<string>('');
  const [playerSearching, setPlayerSearching] = useState(false);
  const [playerLevel, setPlayerLevel] = useState<string>('');
  const [currentPlayerLevel, setCurrentPlayerLevel] = useState<string | null>(null);
  
  // State for operation logs
  const [logs, setLogs] = useState(mockOperationLogs);
  const [globalLogs, setGlobalLogs] = useState<typeof mockOperationLogs>([]);
  const [ipLogs, setIpLogs] = useState<typeof mockOperationLogs>([]);
  const [playerLogs, setPlayerLogs] = useState<typeof mockOperationLogs>([]);

  // Load current global rate on component mount
  useEffect(() => {
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
      const isBlocked = mockCurrentRates.blockedIps.includes(ipAddress);
      setIsIpBlocked(isBlocked);
      setIpSearching(false);
      
      if (!isBlocked) {
        toast({
          title: "IP未在黑名单中",
          description: "可以将该IP加入黑名单",
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
      const level = mockCurrentRates.players[playerId as keyof typeof mockCurrentRates.players];
      setCurrentPlayerLevel(level ? String(level) : null);
      setPlayerLevel(level ? String(level) : '');
      setPlayerSearching(false);
      
      if (!level) {
        toast({
          title: "未找到该玩家的追杀记录",
          description: "可以为该玩家设置追杀等级",
        });
      }
    }, 500);
  };

  // Handle form submission
  const handleSubmit = (type: 'global' | 'ip' | 'player') => {
    if (type === 'global') {
      const numRate = Number(globalRate);
      if (isNaN(numRate) || numRate < 0 || numRate > 100) {
        toast({
          title: "无效的概率值",
          description: "请输入0-100之间的数值",
          variant: "destructive",
        });
        return;
      }
    }

    // Create new log entry
    const newLog = {
      id: Date.now(),
      type,
      operator: 'merchant',
      time: new Date().toLocaleString('zh-CN'),
    } as any;

    if (type === 'global') {
      newLog.value = Number(globalRate);
    } else if (type === 'ip') {
      newLog.ipAddress = ipAddress;
      newLog.action = 'block';
    } else {
      newLog.playerId = playerId;
      newLog.value = Number(playerLevel);
    }

    // Update logs
    const updatedLogs = [newLog, ...logs];
    setLogs(updatedLogs);

    // Update filtered logs
    if (type === 'global') {
      setGlobalLogs([newLog, ...globalLogs]);
      setCurrentGlobalRate(Number(globalRate));
    } else if (type === 'ip') {
      setIpLogs([newLog, ...ipLogs]);
      setIsIpBlocked(true);
    } else {
      setPlayerLogs([newLog, ...playerLogs]);
      setCurrentPlayerLevel(playerLevel);
    }

    toast({
      title: "设置成功",
      description: `${type === 'global' ? '全线' : type === 'ip' ? 'IP黑名单' : '玩家追杀等级'}已更新`,
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
              <TabsTrigger value="ip">IP黑名单</TabsTrigger>
              <TabsTrigger value="player">玩家追杀</TabsTrigger>
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
                
                {isIpBlocked && (
                  <div className="flex items-center space-x-2 text-red-500">
                    <Ban className="h-4 w-4" />
                    <span>IP: <strong>{ipAddress}</strong> 已在黑名单中</span>
                  </div>
                )}
                
                <Button 
                  onClick={() => handleSubmit('ip')}
                  disabled={!ipAddress || isIpBlocked}
                  className="w-full"
                >
                  加入黑名单
                </Button>
              </div>
              
              {ipLogs.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-3">黑名单记录</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>IP地址</TableHead>
                        <TableHead>操作</TableHead>
                        <TableHead>操作人</TableHead>
                        <TableHead>操作时间</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {ipLogs.map(log => (
                        <TableRow key={log.id}>
                          <TableCell>{log.ipAddress}</TableCell>
                          <TableCell>加入黑名单</TableCell>
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
                
                {currentPlayerLevel !== null && (
                  <div className="flex items-center space-x-2">
                    <Settings className="h-4 w-4 text-blue-500" />
                    <span>玩家ID: <strong>{playerId}</strong> 当前追杀等级：<strong>{currentPlayerLevel}</strong></span>
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label>追杀等级设置</Label>
                  <RadioGroup 
                    value={playerLevel} 
                    onValueChange={setPlayerLevel}
                    className="flex flex-col space-y-2"
                  >
                    {playerLevels.map((level) => (
                      <div key={level.value} className="flex items-center space-x-2">
                        <RadioGroupItem value={level.value} id={`level-${level.value}`} />
                        <Label htmlFor={`level-${level.value}`}>{level.label}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
                <Button 
                  onClick={() => handleSubmit('player')}
                  disabled={!playerId || !playerLevel}
                  className="w-full"
                >
                  设置追杀等级
                </Button>
              </div>
              
              {playerLogs.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-3">操作记录</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>玩家ID</TableHead>
                        <TableHead>追杀等级</TableHead>
                        <TableHead>操作人</TableHead>
                        <TableHead>操作时间</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {playerLogs.map(log => (
                        <TableRow key={log.id}>
                          <TableCell>{log.playerId}</TableCell>
                          <TableCell>等级{log.value}</TableCell>
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

