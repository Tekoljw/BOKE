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
  Globe,
  ArrowDownUp,
  Gift,
  Wallet,
  Code,
  Gamepad2,
  Paintbrush,
  Layers,
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import UserMenu from '../UserMenu';
import { useIsMobile } from '@/hooks/use-mobile';

const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [language, setLanguage] = useState<'zh' | 'en'>('zh');

  React.useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [isMobile]);

  const navigationItems = [
    { path: '/admin', label: '仪表盘', icon: <Home /> },
    { path: '/admin/agents', label: '代理商管理', icon: <Users /> },
    { path: '/admin/merchants', label: '商户管理', icon: <Users /> },
    { path: '/admin/win-control', label: '输赢控制', icon: <Shield /> },
    { path: '/admin/win-loss', label: '输赢报表', icon: <BarChart2 /> },
    { path: '/admin/game-logs', label: '对局日志', icon: <FileText /> },
    { path: '/admin/transactions', label: '上下分记录', icon: <ArrowDownUp /> },
    { path: '/admin/recharge-records', label: '商户充值记录', icon: <Wallet /> },
    { path: '/admin/bonus-management', label: '商户赠分管理', icon: <Gift /> },
    { path: '/admin/bonus-rules', label: '赠分规则配置', icon: <Gift /> },
    { path: '/admin/commission', label: '代理佣金订单', icon: <FileText /> },
    { path: '/admin/api', label: 'API管理', icon: <Code /> },
    { path: '/admin/demo-games', label: '游戏管理', icon: <Gamepad2 /> },
    { path: '/admin/game-customization', label: '自研游戏定制', icon: <Paintbrush /> },
    { path: '/admin/vendor-intro', label: '厂商介绍配置', icon: <Layers /> },
    { path: '/admin/permissions', label: '账号权限管理', icon: <Shield /> },
  ];

  const handleLogout = () => {
    navigate('/login');
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'zh' ? 'en' : 'zh');
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div 
        className={`
          fixed md:relative bg-sidebar text-white z-50 h-full
          transition-all duration-300 ease-in-out
          ${sidebarOpen ? 'w-64' : 'w-20'} 
          ${isMobile ? (sidebarOpen ? 'translate-x-0' : '-translate-x-full') : 'translate-x-0'}
        `}
      >
        <div className="flex items-center justify-between p-4">
          {sidebarOpen && (
            <Link to="/" className="flex items-center">
              <img 
                src="/lovable-uploads/f9035fa0-ee25-47a2-b30b-46149ba3914e.png" 
                alt="波克棋牌" 
                className="h-8 w-auto rounded-lg"
              />
            </Link>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(prev => !prev)}
            className="text-white hover:bg-sidebar-accent ml-auto"
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
          <div className="flex items-center gap-4">
            {isMobile && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(true)}
                className="md:hidden"
              >
                <Menu className="h-5 w-5" />
              </Button>
            )}
            <div className="text-xl font-semibold">管理员控制面板</div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/">
                <Home className="mr-1 h-4 w-4" />
                <span>首页</span>
              </Link>
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={toggleLanguage}
            >
              <Globe className="mr-1 h-4 w-4" />
              <span>{language === 'zh' ? '中/EN' : 'EN/中'}</span>
            </Button>
            <UserMenu />
          </div>
        </header>
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
