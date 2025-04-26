export interface CommissionStats {
  unsettled: number;
  totalSettled: number;
  todayEarnings: number;
  monthlyEarnings: number;
  lastMonthEarnings: number;
  totalEarnings: number;
}

export interface MerchantStats {
  totalMerchants: number;
  activeMerchants: number;
  thirtyDayVolume: number;
}

export interface SettlementFormData {
  usdtAddress: string;
}

export interface SettlementRecord {
  id: string;
  timestamp: string;
  amount: number;
  balanceBefore: number;
  balanceAfter: number;
  status: 'success' | 'failed';
}
