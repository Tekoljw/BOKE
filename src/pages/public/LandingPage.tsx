
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-primary text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold">棋牌游戏联运中心</div>
          <div className="flex gap-4">
            <Link to="/games">
              <Button variant="ghost" className="text-white hover:bg-primary/80">
                游戏大厅
              </Button>
            </Link>
            <Link to="/login">
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
                浏览游戏
              </Button>
            </Link>
            <Link to="/register">
              <Button className="bg-secondary text-white hover:bg-secondary/80 px-6 py-6 text-lg">
                立即注册
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Features */}
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
      
      {/* Game Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">热门游戏分类</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['棋牌游戏', '街机游戏', '捕鱼游戏', '真人游戏'].map((category, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-40 bg-gray-300"></div>
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold">{category}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-16 bg-secondary/10">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-6">准备开始您的游戏联运之旅？</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-600">
            加入我们，享受顶级的游戏内容和技术支持
          </p>
          <Link to="/register">
            <Button className="bg-secondary text-white hover:bg-secondary/80 px-8 py-6 text-lg">
              立即注册
            </Button>
          </Link>
        </div>
      </section>
      
      {/* Footer */}
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
              <p className="text-gray-400">邮箱: contact@example.com</p>
              <p className="text-gray-400">电话: +1 123 456 7890</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">快速链接</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/games" className="hover:text-white">游戏大厅</Link></li>
                <li><Link to="/login" className="hover:text-white">登录</Link></li>
                <li><Link to="/register" className="hover:text-white">注册</Link></li>
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
