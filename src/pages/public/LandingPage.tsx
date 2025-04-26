import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Globe } from 'lucide-react';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const LandingPage: React.FC = () => {
  const [language, setLanguage] = useState<'cn' | 'en'>('cn');
  const [activeTab, setActiveTab] = useState('all');

  const mockVendors = [
    {
      id: '1',
      name: 'Evolution Gaming',
      category: 'live',
      description: '全球最大的线上真人游戏供应商',
      image: '/placeholder.svg'
    },
    {
      id: '2',
      name: 'Pragmatic Play',
      category: 'slots',
      description: '顶级老虎机游戏开发商',
      image: '/placeholder.svg'
    },
    // Add more vendors here
  ];

  const categories = [
    { id: 'all', name: '全部' },
    { id: 'live', name: '真人游戏' },
    { id: 'slots', name: '电子游戏' },
    { id: 'poker', name: '棋牌游戏' },
  ];

  // Modify the mockGames to include more games for the homepage
  const mockHotGames = [
    { id: '1', name: '闪电百家乐', type: '真人游戏', image: '/placeholder.svg' },
    { id: '2', name: '无限二十一点', type: '真人游戏', image: '/placeholder.svg' },
    { id: '3', name: '飞速轮盘', type: '真人游戏', image: '/placeholder.svg' },
    { id: '4', name: '经典炸金花', type: '棋牌游戏', image: '/placeholder.svg' },
    { id: '5', name: '德州扑克', type: '棋牌游戏', image: '/placeholder.svg' },
    { id: '6', name: '斗地主', type: '棋牌游戏', image: '/placeholder.svg' },
    { id: '7', name: '二人麻将', type: '棋牌游戏', image: '/placeholder.svg' },
    { id: '8', name: '龙虎斗', type: '真人游戏', image: '/placeholder.svg' },
    { id: '9', name: '三公', type: '棋牌游戏', image: '/placeholder.svg' },
    { id: '10', name: '抢庄牛牛', type: '棋牌游戏', image: '/placeholder.svg' },
    { id: '11', name: '超级水果机', type: '电子游戏', image: '/placeholder.svg' },
    { id: '12', name: '森林宝藏', type: '电子游戏', image: '/placeholder.svg' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-primary text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img 
              src="/lovable-uploads/530e81e8-804d-48ef-8b67-b896a5b21c01.png" 
              alt="波克棋牌" 
              className="h-8 w-auto"
            />
            <span className="text-2xl font-bold">波克棋牌</span>
          </div>
          <div className="flex gap-4 items-center">
            <Button 
              variant="outline" 
              className="bg-sidebar text-white hover:bg-sidebar-accent flex items-center space-x-2"
              onClick={() => setLanguage(language === 'cn' ? 'en' : 'cn')}
            >
              <Globe className="h-4 w-4" />
              <span>{language === 'cn' ? '中文' : 'English'}</span>
            </Button>
            <Link to="/games">
              <Button variant="outline" className="bg-white text-primary hover:bg-gray-100">
                登录
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary/70 text-white py-20">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-5xl font-bold mb-6">全球领先的棋牌游戏联运平台</h1>
          <p className="text-xl mb-10 max-w-2xl mx-auto">
            一站式接入上百款热门棋牌游戏，为您的平台带来更多玩家和收益
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/games">
              <Button className="bg-white text-primary hover:bg-gray-100 px-6 py-6 text-lg">
                游戏体验Demo
              </Button>
            </Link>
            <Link to="/docs">
              <Button className="bg-secondary text-white hover:bg-secondary/80 px-6 py-6 text-lg">
                API接入文档
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Hot Games Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">热门游戏</h2>
            <Link to="/games" className="text-primary hover:text-primary/80 flex items-center gap-2">
              查看更多游戏体验Demo
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {mockHotGames.map((game) => (
              <Link to={`/games`} key={game.id} className="group">
                <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
                  <div className="h-40 bg-gray-200 flex items-center justify-center">
                    <img src={game.image} alt={game.name} className="w-20 h-20" />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{game.name}</h3>
                    <p className="text-gray-600 text-sm">{game.type}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Manufacturer Information */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">热门游戏厂商</h2>
            <Link to="/manufacturer/1" className="text-primary hover:text-primary/80 flex items-center gap-2">
              查看更多
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {mockVendors
              .filter(vendor => activeTab === 'all' || vendor.category === activeTab)
              .map((vendor) => (
                <Link to={`/manufacturer/${vendor.id}`} key={vendor.id}>
                  <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
                    <div className="h-40 bg-gray-200 flex items-center justify-center">
                      <img src={vendor.image} alt={vendor.name} className="w-20 h-20" />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold mb-2">{vendor.name}</h3>
                      <p className="text-gray-600 text-sm">{vendor.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">平台优势</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">快速接入</h3>
              <p className="text-gray-600">简单API对接，最快24小时内完成游戏接入</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">灵活分成</h3>
              <p className="text-gray-600">定制化分成方案，多级代理模式最大化您的利润</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">安全可靠</h3>
              <p className="text-gray-600">全球顶级安全防护，7*24小时技术支持</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">联系我们</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-bold mb-4">商务总监 Toney</h3>
              <p className="text-gray-600 flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                @Toney
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-bold mb-4">商务总监 Lion</h3>
              <p className="text-gray-600 flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                @Lion
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-bold mb-4">商务总监 Hersinber</h3>
              <p className="text-gray-600 flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                @Hersinber
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Updated contacts */}
      <footer className="bg-gray-800 text-white py-10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">棋牌游戏联运中心</h3>
              <p className="text-gray-400">
                为全球游戏平台提供优质的棋牌游戏解决方案
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">联系我们</h3>
              <div className="space-y-2 text-gray-400">
                <p className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  商务总监 Toney @Toney
                </p>
                <p className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  商务总监 Lion @Lion
                </p>
                <p className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  商务总监 Hersinber @Hersinber
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">快速链接</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/games" className="hover:text-white">游戏大厅</Link></li>
                <li><Link to="/login" className="hover:text-white">登录</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>© 2024 棋牌游戏联运中心. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
