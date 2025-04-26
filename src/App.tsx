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

const queryClient = new QueryClient();

const App = () => (
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
            <Route path="settlements" element={<AgentSettlements />} />
          </Route>
          
          {/* Merchant Routes */}
          <Route path="/merchant" element={<MerchantLayout />}>
            <Route index element={<MerchantDashboard />} />
            <Route path="game-records" element={<MerchantGameRecords />} />
            <Route path="players" element={<MerchantPlayers />} />
            <Route path="blacklist" element={<MerchantBlacklist />} />
            <Route path="control" element={<MerchantControl />} />
          </Route>
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
