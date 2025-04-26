// User Interfaces
export interface User {
  id: string;
  username: string;
  role: 'admin' | 'agent' | 'merchant';
  email: string;
  status: 'active' | 'inactive' | 'frozen';
  createdAt: string;
}

export interface Agent extends User {
  role: 'agent';
  commissionRate: number;
  totalMerchants: number;
  totalCommission: number;
  pendingCommission: number;
}

export interface Merchant extends User {
  role: 'merchant';
  agentId: string;
  agentName: string;
  gamePoints: number;
  usdtBalance: number;
  feeRate: number;
  featured: boolean;
  telegramId?: string;
  totalDeposit?: number;
  monthlyDeposit?: number;
  totalCommission?: number;
  monthlyCommission?: number;
}

// Game Interfaces
export interface GameVendor {
  id: string;
  name: string;
  logo: string;
  status: 'active' | 'inactive';
  gamesCount: number;
  createdAt: string;
}

export interface GameType {
  id: string;
  name: string;
  icon: string;
}

export interface Game {
  id: string;
  name: string;
  vendorId: string;
  vendorName: string;
  typeId: string;
  typeName: string;
  thumbnail: string;
  isActive: boolean;
  createdAt: string;
}

export interface GameRecord {
  id: string;
  gameId: string;
  gameName: string;
  merchantId: string;
  merchantName: string;
  playerId: string;
  playerName: string;
  betAmount: number;
  winAmount: number;
  netProfit: number;
  timestamp: string;
}

// Dashboard Interfaces
export interface DashboardStats {
  activeUsers: number;
  totalRevenue: number;
  totalGames: number;
  profitToday: number;
}

export interface ChartData {
  date: string;
  value: number;
  category?: string;
}

// Commission and Profit Interfaces
export interface CommissionRecord {
  id: string;
  agentId: string;
  agentName: string;
  amount: number;
  status: 'pending' | 'approved' | 'rejected' | 'paid';
  createdAt: string;
  paidAt?: string;
}

export interface ProfitRecord {
  id: string;
  date: string;
  merchantRevenue: number;
  agentCommission: number;
  platformProfit: number;
}

// System Interfaces
export interface SystemSettings {
  allowedIPs: string[];
  apiDocs: string;
  demoDownloadUrl: string;
  domain: string;
}

// Player Interfaces
export interface Player {
  id: string;
  name: string;
  merchantId: string;
  totalBets: number;
  totalWins: number;
  netProfit: number;
  status: 'active' | 'blacklisted';
  createdAt: string;
}
