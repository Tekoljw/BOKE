import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BalanceCard from '@/components/merchant/BalanceCard';
import { Coins, Users, DollarSign, Percent } from 'lucide-react';
import type { CommissionStats, MerchantStats } from '@/types/commission';

const MyCommission: React.FC = () => {
  const [showSettlement, setShowSettlement] = useState(false);
  const [usdtAddress, setUsdtAddress] = useState('');

  // Mock data - replace with real API calls
  const commissionStats: CommissionStats = {
    unsettled: 1000,
    totalSettled: 5000,
    todayEarnings: 100,
    monthlyEarnings: 800,
    lastMonthEarnings: 750,
    totalEarnings: 6000
  };

  const merchantStats: MerchantStats = {
    totalMerchants: 50,
    activeMerchants: 30,
    thirtyDayVolume: 100000
  };

  const handleSettlement = () => {
    // Handle settlement submission
    console.log('Settlement requested for address:', usdtAddress);
    setShowSettlement(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">我的佣金</h1>
          <p className="text-muted-foreground">查看佣金统计和商户业绩</p>
        </div>
        <Button onClick={() => setShowSettlement(true)}>
          结算佣金
        </Button>
      </div>
      
      {/* Commission Rate Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Percent className="h-5 w-5" />
            我的佣金比例
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="text-3xl font-bold">10%</div>
            <p className="text-muted-foreground">
              佣金计算方式 = 商户充值买分金额（USDT）× 我的佣金比例
            </p>
          </div>
        </CardContent>
      </Card>
      
      {/* Commission Stats Cards */}
      <div>
        <h2 className="text-xl font-semibold mb-4">佣金统计</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <BalanceCard 
            title="未结算佣金" 
            amount={commissionStats.unsettled}
            icon={<Coins className="h-5 w-5" />}
          />
          <BalanceCard 
            title="已结算佣金总额" 
            amount={commissionStats.totalSettled}
            icon={<DollarSign className="h-5 w-5" />}
          />
          <BalanceCard 
            title="今日佣金收入" 
            amount={commissionStats.todayEarnings}
            icon={<Coins className="h-5 w-5" />}
          />
          <BalanceCard 
            title="本月佣金收入" 
            amount={commissionStats.monthlyEarnings}
            icon={<Coins className="h-5 w-5" />}
          />
          <BalanceCard 
            title="上月佣金收入" 
            amount={commissionStats.lastMonthEarnings}
            icon={<Coins className="h-5 w-5" />}
          />
          <BalanceCard 
            title="累积佣金收入" 
            amount={commissionStats.totalEarnings}
            icon={<Coins className="h-5 w-5" />}
          />
        </div>
      </div>

      {/* Merchant Performance Card */}
      <div>
        <h2 className="text-xl font-semibold mb-4">推广业绩</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <BalanceCard 
            title="总商户数量" 
            amount={merchantStats.totalMerchants}
            icon={<Users className="h-5 w-5" />}
          />
          <BalanceCard 
            title="活跃商户数量" 
            amount={merchantStats.activeMerchants}
            icon={<Users className="h-5 w-5" />}
          >
            <p className="mt-2 text-sm text-muted-foreground">
              30天内充值买分总量: {merchantStats.thirtyDayVolume.toLocaleString()}
            </p>
          </BalanceCard>
        </div>
      </div>

      {/* Settlement Dialog */}
      <Dialog open={showSettlement} onOpenChange={setShowSettlement}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>佣金结算</DialogTitle>
            <DialogDescription>
              请输入您的USDT地址（仅支持TRC20）
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="usdtAddress">USDT地址 (TRC20)</Label>
              <Input
                id="usdtAddress"
                placeholder="请输入您的TRC20地址"
                value={usdtAddress}
                onChange={(e) => setUsdtAddress(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSettlement(false)}>
              取消
            </Button>
            <Button onClick={handleSettlement}>
              确认结算
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyCommission;
