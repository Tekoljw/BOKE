import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Users, 
  LogOut, 
  Menu,
  Home,
  FileText,
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import UserMenu from '../UserMenu';

const AgentLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    { path: '/agent', label: '仪表盘', icon: <Home /> },
    { path: '/agent/merchants', label: '商户管理', icon: <Users /> },
    { path: '/agent/commission', label: '佣金报表', icon: <FileText /> },
    { path: '/agent/settlements', label: '结算记录', icon: <FileText /> },
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
              src="/lovable-uploads/135f811b-3eaa-41a9-ad61-5cd5143e0d4d.png" 
              alt="波克棋牌" 
              className="h-8 w-auto rounded-lg"
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
          <div className="text-xl font-semibold">代理商控制面板</div>
          <UserMenu />
        </header>
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AgentLayout;
