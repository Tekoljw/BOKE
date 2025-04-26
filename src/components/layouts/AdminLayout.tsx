import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  BarChart2, 
  Users, 
  Settings, 
  Menu,
  Home,
  FileText,
  Shield,
  LogOut,
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import UserMenu from '../UserMenu';

const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    { path: '/admin', label: '仪表盘', icon: <Home /> },
    { path: '/admin/agents', label: '代理商管理', icon: <Users /> },
    { path: '/admin/merchants', label: '商户管理', icon: <Users /> },
    { path: '/admin/games', label: '游戏管理', icon: <Shield /> },
    { path: '/admin/game-records', label: '游戏记录', icon: <FileText /> },
    { path: '/admin/win-control', label: '输赢控制', icon: <Shield /> },
    { path: '/admin/statistics', label: '数据统计', icon: <BarChart2 /> },
    { path: '/admin/system', label: '系统管理', icon: <Settings /> },
    { path: '/admin/reports', label: '经营报表', icon: <FileText /> },
    { path: '/admin/commission', label: '佣金结算', icon: <FileText /> },
  ];

  const handleLogout = () => {
    // Handle logout logic
    navigate('/login');
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <div className={`bg-sidebar text-white ${sidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 overflow-y-auto`}>
        <div className="flex items-center justify-between p-4">
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/530e81e8-804d-48ef-8b67-b896a5b21c01.png" 
              alt="波克棋牌" 
              className="h-8 w-auto"
            />
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(prev => !prev)}
            className="text-white hover:bg-sidebar-accent"
          >
            <Menu />
          </Button>
        </div>
        <div className="mt-6 space-y-1 px-3">
          {navigationItems.map((item, index) => (
            <Link
              to={item.path}
              key={index}
              className={`sidebar-menu-item ${location.pathname === item.path ? 'active' : ''}`}
            >
              {item.icon}
              {sidebarOpen && <span>{item.label}</span>}
            </Link>
          ))}
        </div>
        <div className="absolute bottom-4 left-0 right-0 px-3">
          <button 
            onClick={handleLogout}
            className="sidebar-menu-item w-full justify-center"
          >
            <LogOut size={20} />
            {sidebarOpen && <span>退出登录</span>}
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <header className="bg-white border-b h-16 flex items-center justify-between px-6">
          <div className="text-xl font-semibold">管理员控制面板</div>
          <UserMenu />
        </header>
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
