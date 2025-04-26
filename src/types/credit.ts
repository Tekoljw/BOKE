
export interface AccountBalance {
  usdt: number;
  totalPoints: number;
  bonusPoints: number;
}

export interface VendorBalance {
  vendorId: string;
  vendorName: string;
  points: number;
}

export interface RechargeRecord {
  id: string;
  timestamp: string;
  beforeBalance: number;
  amount: number;
  afterBalance: number;
  status: 'success' | 'timeout';
}
