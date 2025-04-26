
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const MerchantWinControl: React.FC = () => {
  const { toast } = useToast();
  const [globalRate, setGlobalRate] = useState<string>('');
  const [ipAddress, setIpAddress] = useState<string>('');
  const [ipRate, setIpRate] = useState<string>('');
  const [playerId, setPlayerId] = useState<string>('');
  const [playerRate, setPlayerRate] = useState<string>('');

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

    // Here you would integrate with your backend
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
            <TabsList>
              <TabsTrigger value="global">全线控制</TabsTrigger>
              <TabsTrigger value="ip">IP控制</TabsTrigger>
              <TabsTrigger value="player">玩家控制</TabsTrigger>
            </TabsList>

            <TabsContent value="global" className="space-y-4">
              <div className="grid gap-4">
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
            </TabsContent>

            <TabsContent value="ip" className="space-y-4">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ipAddress">IP地址</Label>
                  <Input
                    id="ipAddress"
                    placeholder="请输入IP地址"
                    value={ipAddress}
                    onChange={(e) => setIpAddress(e.target.value)}
                  />
                </div>
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
                  />
                </div>
                <Button onClick={() => handleSubmit('ip')}>保存设置</Button>
              </div>
            </TabsContent>

            <TabsContent value="player" className="space-y-4">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="playerId">玩家ID</Label>
                  <Input
                    id="playerId"
                    placeholder="请输入玩家ID"
                    value={playerId}
                    onChange={(e) => setPlayerId(e.target.value)}
                  />
                </div>
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
                  />
                </div>
                <Button onClick={() => handleSubmit('player')}>保存设置</Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default MerchantWinControl;
