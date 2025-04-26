export interface WinLossRecord {
  id: string;
  timestamp: string;
  merchantId: string; // Added merchantId
  username: string;
  gameType: string;
  roomType: string;
  tableNumber: string;
  initialAmount: number;
  validBetAmount: number;
  winLossAmount: number;
  roundId: string;
}

export interface GameOption {
  id: string;
  name: string;
  vendorId: string;
}

export interface VendorOption {
  id: string;
  name: string;
}

export type TransactionType = 'deposit' | 'withdraw';

export interface TransactionRecord {
  id: string;
  timestamp: string;
  merchantId: string; // Added merchantId
  username: string;
  type: TransactionType;
  beforeAmount: number;
  changeAmount: number;
  afterAmount: number;
  platformBalanceChange: number;
  merchantBalanceChange: number;
}
