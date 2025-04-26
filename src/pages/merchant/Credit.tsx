
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Plus, 
  Loader, 
  Wallet, 
  CircleDollarSign, 
  Gift, 
  GamepadIcon, 
  TrendingUp,
  Award
} from "lucide-react";
import BalanceCard from '@/components/merchant/BalanceCard';
import RechargeModal from '@/components/merchant/RechargeModal';
import type { AccountBalance, VendorBalance, RechargeRecord } from '@/types/credit';

const MerchantCredit: React.FC = () => {
  const [showRecharge, setShowRecharge] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(false);

  // Mock data - replace with real API calls
  const balances: AccountBalance = {
    usdt: 1000,
    totalPoints: 100000,
    bonusPoints: 5000
  };

  const vendorBalances: VendorBalance[] = [
    { vendorId: '1', vendorName: '波克棋牌', points: 50000 },
    { vendorId: '2', vendorName: '开元棋牌', points: 30000 },
    { vendorId: '3', vendorName: 'AG棋牌', points: 20000 },
  ];

  const bonusBalances: VendorBalance[] = [
    { vendorId: '1', vendorName: '波克棋牌', points: 2000 },
    { vendorId: '2', vendorName: '开元棋牌', points: 1500 },
    { vendorId: '3', vendorName: 'AG棋牌', points: 1500 },
  ];

  const [records, setRecords] = useState<RechargeRecord[]>([
    {
      id: '1',
      timestamp: '2024-04-26 10:00:00',
      beforeBalance: 800,
      amount: 200,
      afterBalance: 1000,
      status: 'success'
    },
    // ... more mock records
  ]);

  const handleLoadMore = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setRecords(prev => [...prev, {
        id: String(prev.length + 1),
        timestamp: '2024-04-25 09:00:00',
        beforeBalance: 600,
        amount: 200,
        afterBalance: 800,
        status: 'success'
      }]);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">买分管理</h1>
          <p className="text-muted-foreground">管理您的账户余额和充值记录</p>
        </div>
        <Button onClick={() => setShowRecharge(true)}>
          <Plus className="mr-2 h-4 w-4" />
          充值
        </Button>
      </div>

      {/* Balance Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <BalanceCard 
          title="USDT余额" 
          amount={balances.usdt}
          icon={<Wallet className="h-5 w-5 text-brand-secondary" />}
          amountClassName="text-brand-secondary"
        />
        <BalanceCard 
          title="总分数余额" 
          amount={balances.totalPoints} 
          icon={<CircleDollarSign className="h-5 w-5 text-brand-DEFAULT" />}
          amountClassName="text-brand-DEFAULT"
        />
        <BalanceCard 
          title="赠分余额" 
          amount={balances.bonusPoints} 
          icon={<Gift className="h-5 w-5 text-brand-accent" />}
          amountClassName="text-brand-accent"
        />
      </div>

      {/* Points Balance Distribution */}
      <div>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-brand-DEFAULT" />
          分数余额分布
        </h2>
        <div className="grid gap-4 md:grid-cols-4">
          {vendorBalances.map((vendor) => (
            <BalanceCard
              key={vendor.vendorId}
              title={vendor.vendorName}
              amount={vendor.points}
              className="md:col-span-1"
              icon={<GamepadIcon className="h-5 w-5 text-brand-DEFAULT" />}
              amountClassName="text-brand-DEFAULT"
            />
          ))}
        </div>
      </div>

      {/* Bonus Points Distribution */}
      <div>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Award className="h-5 w-5 text-brand-accent" />
          赠分余额分布
        </h2>
        <div className="grid gap-4 md:grid-cols-4">
          {bonusBalances.map((vendor) => (
            <BalanceCard
              key={vendor.vendorId}
              title={vendor.vendorName}
              amount={vendor.points}
              className="md:col-span-1"
              icon={<Gift className="h-5 w-5 text-brand-accent" />}
              amountClassName="text-brand-accent"
            />
          ))}
        </div>
      </div>

      {/* Recharge Records */}
      <div>
        <h2 className="text-xl font-semibold mb-4">充值记录</h2>
        <div className="flex gap-4 mb-4">
          <Input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-40"
          />
          <Input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-40"
          />
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>时间</TableHead>
                <TableHead>充值前余额</TableHead>
                <TableHead>充值金额 (USDT)</TableHead>
                <TableHead>充值后余额</TableHead>
                <TableHead>状态</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {records.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>{record.timestamp}</TableCell>
                  <TableCell>{record.beforeBalance}</TableCell>
                  <TableCell>{record.amount}</TableCell>
                  <TableCell>{record.afterBalance}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      record.status === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {record.status === 'success' ? '成功' : '超时'}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex justify-center mt-4">
          <Button 
            variant="outline" 
            onClick={handleLoadMore}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                加载中...
              </>
            ) : (
              '查看更多'
            )}
          </Button>
        </div>
      </div>

      <RechargeModal
        open={showRecharge}
        onClose={() => setShowRecharge(false)}
        usdtAddress="TRx7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6"
      />
    </div>
  );
};

export default MerchantCredit;
