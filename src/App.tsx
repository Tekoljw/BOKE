import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Public Pages
import LandingPage from "./pages/public/LandingPage";
import GameCatalog from "./pages/public/GameCatalog";
import NotFound from "./pages/NotFound";

// Auth Pages
import Login from "./pages/auth/Login";

// Layout Components
import AdminLayout from "./components/layouts/AdminLayout";
import AgentLayout from "./components/layouts/AgentLayout";
import MerchantLayout from "./components/layouts/MerchantLayout";

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard";
import AdminAgents from "./pages/admin/Agents";
import AdminMerchants from "./pages/admin/Merchants";
import AdminGames from "./pages/admin/Games";
import AdminGameRecords from "./pages/admin/GameRecords";
import AdminWinControl from "./pages/admin/WinControl";
import AdminStatistics from "./pages/admin/Statistics";
import AdminSystem from "./pages/admin/System";
import AdminReports from "./pages/admin/Reports";
import AdminCommission from "./pages/admin/Commission";

// Agent Pages
import AgentDashboard from "./pages/agent/Dashboard";
import AgentMerchants from "./pages/agent/Merchants";
import AgentCommission from "./pages/agent/Commission";
import AgentSettlements from "./pages/agent/Settlements";

// Merchant Pages
import MerchantDashboard from "./pages/merchant/Dashboard";
import MerchantGameRecords from "./pages/merchant/GameRecords";
import MerchantPlayers from "./pages/merchant/Players";
import MerchantBlacklist from "./pages/merchant/Blacklist";
import MerchantControl from "./pages/merchant/Control";
import ManufacturerDetail from "./pages/ManufacturerDetail";
import MerchantWinLoss from "./pages/merchant/WinLoss";
import MerchantGameLogs from "./pages/merchant/GameLogs";
import MerchantTransactions from "./pages/merchant/Transactions";
import MerchantBalances from "./pages/merchant/Balances";
import MerchantCredit from "./pages/merchant/Credit";
import MerchantApi from "./pages/merchant/Api";

// Create a client function to ensure a new instance is created for each app mount
function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: 1,
      },
    },
  });
}

const App = () => {
  // Create a new QueryClient for this component instance
  const queryClient = createQueryClient();
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/games/:vendorId?" element={<GameCatalog />} />
            <Route path="/manufacturer/:id" element={<ManufacturerDetail />} />
            
            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="agents" element={<AdminAgents />} />
              <Route path="merchants" element={<AdminMerchants />} />
              <Route path="games" element={<AdminGames />} />
              <Route path="game-records" element={<AdminGameRecords />} />
              <Route path="win-control" element={<AdminWinControl />} />
              <Route path="statistics" element={<AdminStatistics />} />
              <Route path="system" element={<AdminSystem />} />
              <Route path="reports" element={<AdminReports />} />
              <Route path="commission" element={<AdminCommission />} />
            </Route>
            
            {/* Agent Routes */}
            <Route path="/agent" element={<AgentLayout />}>
              <Route index element={<AgentDashboard />} />
              <Route path="merchants" element={<AgentMerchants />} />
              <Route path="commission" element={<AgentCommission />} />
              <Route path="commission-details" element={<CommissionDetails />} />
              <Route path="settlements" element={<AgentSettlements />} />
            </Route>
            
            {/* Merchant Routes */}
            <Route path="/merchant" element={<MerchantLayout />}>
              <Route index element={<MerchantDashboard />} />
              <Route path="players" element={<MerchantPlayers />} />
              <Route path="win-loss" element={<MerchantWinLoss />} />
              <Route path="game-logs" element={<MerchantGameLogs />} />
              <Route path="transactions" element={<MerchantTransactions />} />
              <Route path="balances" element={<MerchantBalances />} />
              <Route path="credit" element={<MerchantCredit />} />
              <Route path="api" element={<MerchantApi />} />
            </Route>
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
