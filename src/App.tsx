
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import MerchantLayout from './components/layouts/MerchantLayout';
import MerchantDashboard from './pages/merchant/Dashboard';
import MerchantPlayers from './pages/merchant/Players';
import MerchantWinLoss from './pages/merchant/WinLoss';
import MerchantGameLogs from './pages/merchant/GameLogs';
import MerchantTransactions from './pages/merchant/Transactions';
import MerchantCredit from './pages/merchant/Credit';
import MerchantApi from './pages/merchant/Api';
import AdminLayout from './components/layouts/AdminLayout';
import AdminDashboard from './pages/admin/Dashboard';
import AdminMerchants from './pages/admin/Merchants';
import AdminAgents from './pages/admin/Agents';
import AdminGames from './pages/admin/Games';
import AdminStatistics from './pages/admin/Statistics';
import AdminCommission from './pages/admin/Commission';
import AdminWinControl from './pages/admin/WinControl';
import AdminSystem from './pages/admin/System';
import AdminReports from './pages/admin/Reports';
import AdminGameRecords from './pages/admin/GameRecords';
import AgentLayout from './components/layouts/AgentLayout';
import AgentDashboard from './pages/agent/Dashboard';
import AgentMerchants from './pages/agent/Merchants';
import AgentSettlements from './pages/agent/Settlements';
import AgentCommission from './pages/agent/Commission';
import AgentCommissionDetails from './pages/agent/CommissionDetails';
import LandingPage from './pages/public/LandingPage';
import GameCatalog from './pages/public/GameCatalog';
import ManufacturerDetail from './pages/ManufacturerDetail';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/games" element={<GameCatalog />} />
      <Route path="/manufacturer/:id" element={<ManufacturerDetail />} />
      
      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Admin Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="merchants" element={<AdminMerchants />} />
        <Route path="agents" element={<AdminAgents />} />
        <Route path="games" element={<AdminGames />} />
        <Route path="statistics" element={<AdminStatistics />} />
        <Route path="commission" element={<AdminCommission />} />
        <Route path="win-control" element={<AdminWinControl />} />
        <Route path="system" element={<AdminSystem />} />
        <Route path="reports" element={<AdminReports />} />
        <Route path="game-records" element={<AdminGameRecords />} />
      </Route>
      
      {/* Agent Routes */}
      <Route path="/agent" element={<AgentLayout />}>
        <Route index element={<AgentCommission />} />
        <Route path="merchants" element={<AgentMerchants />} />
        <Route path="settlements" element={<AgentSettlements />} />
        <Route path="commission-details" element={<AgentCommissionDetails />} />
      </Route>
      
      {/* Merchant Routes */}
      <Route path="/merchant" element={<MerchantLayout />}>
        <Route index element={<MerchantDashboard />} />
        <Route path="players" element={<MerchantPlayers />} />
        <Route path="win-loss" element={<MerchantWinLoss />} />
        <Route path="game-logs" element={<MerchantGameLogs />} />
        <Route path="transactions" element={<MerchantTransactions />} />
        <Route path="credit" element={<MerchantCredit />} />
        <Route path="api" element={<MerchantApi />} />
      </Route>
      
      {/* Catch all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
