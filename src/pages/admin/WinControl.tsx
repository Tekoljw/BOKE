
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Settings, AlertCircle } from 'lucide-react';

// Mock data for current rates and operation logs
const mockCurrentRates = {
  merchants: {
    'merchant001': 55,
    'merchant002': 58,
  },
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
  { id: 1, type: 'merchant', merchantId: 'merchant001', value: 55, operator: 'admin', time: '2024-04-26 10:30:45' },
  { id: 2, type: 'ip', ipAddress: '192.168.1.1', value: 60, operator: 'admin', time: '2024-04-26 09:15:22' },
  { id: 3, type: 'player', playerId: 'player001', value: 65, operator: 'admin', time: '2024-04-25 14:45:36' },
];

const AdminWinControl: React.FC = () => {
  const { toast } = useToast();
  
  // States for control values
  const [merchantId, setMerchantId] = useState<string>('');
  const [merchantRate, setMerchantRate] = useState<string>('');
  const [ipAddress, setIpAddress] = useState<string>('');
  const [ipRate, setIpRate] = useState<string>('');
  const [playerId, setPlayerId] = useState<string>('');
  const [playerRate, setPlayerRate] = useState<string>('');
  
  // States for displaying current rates
  const [currentMerchantRate, setCurrentMerchantRate] = useState<number | null>(null);
  const [currentIpRate, setCurrentIpRate] = useState<number | null>(null);
  const [currentPlayerRate, setCurrentPlayerRate] = useState<number | null>(null);
  
  // States for search functionality
  const [merchantSearching, setMerchantSearching] = useState(false);
  const [ipSearching, setIpSearching] = useState(false);
  const [playerSearching, setPlayerSearching] = useState(false);
  
  // State for operation logs
  const [logs, setLogs] = useState(mockOperationLogs);
  const [merchantLogs, setMerchantLogs] = useState<typeof mockOperationLogs>([]);
  const [ipLogs, setIpLogs] = useState<typeof mockOperationLogs>([]);
  const [playerLogs, setPlayerLogs] = useState<typeof mockOperationLogs>([]);

  // Load log data on component mount
  React.useEffect(() => {
    // Filter logs by type
    setMerchantLogs(mockOperationLogs.filter(log => log.type === 'merchant'));
    setIpLogs(mockOperationLogs.filter(log => log.type === 'ip'));
    setPlayerLogs(mockOperationLogs.filter(log => log.type === 'player'));
  }, []);

  // Handle merchant search
  const handleMerchantSearch = () => {
    if (!merchantId) {
      toast({
        title: "请输入商户ID",
        variant: "destructive",
      });
      return;
    }
    
    setMerchantSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      const rate = mockCurrentRates.merchants[merchantId as keyof typeof mockCurrentRates.merchants];
      setCurrentMerchantRate(rate || null);
      setMerchantRate(rate ? String(rate) : '');
      setMerchantSearching(false);
      
      if (!rate) {
        toast({
          title: "未找到该商户的控制记录",
          description: "将创建新的控制记录",
        });
      }
    }, 500);
  };

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
  const handleSubmit = (type: 'merchant' | 'ip' | 'player') => {
    const rate = type === 'merchant' ? merchantRate : type === 'ip' ? ipRate : playerRate;
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
      operator: 'admin',
      time: new Date().toLocaleString('zh-CN'),
    } as any;

    if (type === 'merchant') {
      newLog.merchantId = merchantId;
    } else if (type === 'ip') {
      newLog.ipAddress = ipAddress;
    } else {
      newLog.playerId = playerId;
    }

    // Update logs
    const updatedLogs = [newLog, ...logs];
    setLogs(updatedLogs);

    // Update filtered logs
    if (type === 'merchant') {
      setMerchantLogs([newLog, ...merchantLogs]);
      setCurrentMerchantRate(numRate);
    } else if (type === 'ip') {
      setIpLogs([newLog, ...ipLogs]);
      setCurrentIpRate(numRate);
    } else {
      setPlayerLogs([newLog, ...playerLogs]);
      setCurrentPlayerRate(numRate);
    }

    toast({
      title: "设置成功",
      description: `${type === 'merchant' ? '商户' : type === 'ip' ? 'IP' : '玩家'}控制已更新`,
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
          <Tabs defaultValue="merchant" className="space-y-4">
            <TabsList className="flex justify-start">
              <TabsTrigger value="merchant">商户控制</TabsTrigger>
              <TabsTrigger value="ip">IP控制</TabsTrigger>
              <TabsTrigger value="player">玩家控制</TabsTrigger>
            </TabsList>

            <TabsContent value="merchant" className="space-y-4">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="merchantId">商户ID</Label>
                  <div className="flex gap-2">
                    <Input
                      id="merchantId"
                      placeholder="请输入商户ID"
                      value={merchantId}
                      onChange={(e) => setMerchantId(e.target.value)}
                    />
                    <Button 
                      variant="secondary" 
                      className="shrink-0"
                      onClick={handleMerchantSearch}
                      disabled={merchantSearching}
                    >
                      {merchantSearching ? "搜索中..." : "搜索"}
                      {!merchantSearching && <Search className="ml-2 h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                
                {currentMerchantRate !== null && (
                  <div className="flex items-center space-x-2">
                    <Settings className="h-4 w-4 text-blue-500" />
                    <span>商户ID: <strong>{merchantId}</strong> 当前杀率：<strong>{currentMerchantRate}%</strong></span>
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="merchantRate">商户杀数设置 (%)</Label>
                  <Input
                    id="merchantRate"
                    type="number"
                    min="0"
                    max="100"
                    placeholder="请输入0-100之间的数值"
                    value={merchantRate}
                    onChange={(e) => setMerchantRate(e.target.value)}
                    disabled={currentMerchantRate === null && !merchantId}
                  />
                </div>
                <Button 
                  onClick={() => handleSubmit('merchant')}
                  disabled={!merchantId}
                >
                  保存设置
                </Button>
              </div>
              
              {merchantLogs.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-3">操作记录</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>商户ID</TableHead>
                        <TableHead>设定值</TableHead>
                        <TableHead>操作人</TableHead>
                        <TableHead>操作时间</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {merchantLogs.map(log => (
                        <TableRow key={log.id}>
                          <TableCell>{log.merchantId}</TableCell>
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

export default AdminWinControl;
