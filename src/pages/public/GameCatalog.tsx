
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";

// Mock data for vendors and games
const mockVendors = [
  { id: '1', name: '皇家棋牌', logo: '' },
  { id: '2', name: '天天游戏', logo: '' },
  { id: '3', name: '乐游棋牌', logo: '' },
  { id: '4', name: '扑克之星', logo: '' },
  { id: '5', name: '众博棋牌', logo: '' },
];

const mockGameTypes = [
  { id: '1', name: '象棋', icon: '' },
  { id: '2', name: '麻将', icon: '' },
  { id: '3', name: '扑克', icon: '' },
  { id: '4', name: '斗地主', icon: '' },
];

const mockGames = [
  { id: '1', name: '经典象棋', vendorId: '1', typeId: '1', thumbnail: '', isActive: true },
  { id: '2', name: '四川麻将', vendorId: '1', typeId: '2', thumbnail: '', isActive: true },
  { id: '3', name: '德州扑克', vendorId: '2', typeId: '3', thumbnail: '', isActive: true },
  { id: '4', name: '欢乐斗地主', vendorId: '2', typeId: '4', thumbnail: '', isActive: true },
  { id: '5', name: '广东麻将', vendorId: '3', typeId: '2', thumbnail: '', isActive: true },
  { id: '6', name: '国际象棋', vendorId: '3', typeId: '1', thumbnail: '', isActive: true },
  { id: '7', name: '二人麻将', vendorId: '4', typeId: '2', thumbnail: '', isActive: true },
  { id: '8', name: '掼蛋', vendorId: '4', typeId: '3', thumbnail: '', isActive: true },
  { id: '9', name: '军棋', vendorId: '5', typeId: '1', thumbnail: '', isActive: true },
  { id: '10', name: '三张牌', vendorId: '5', typeId: '3', thumbnail: '', isActive: true },
  { id: '11', name: '万人场斗地主', vendorId: '1', typeId: '4', thumbnail: '', isActive: true },
  { id: '12', name: '21点', vendorId: '2', typeId: '3', thumbnail: '', isActive: true },
];

const GameCatalog: React.FC = () => {
  const { vendorId } = useParams<{ vendorId?: string }>();
  const [selectedVendor, setSelectedVendor] = useState<string | undefined>(vendorId);
  const [selectedType, setSelectedType] = useState<string | undefined>();
  const navigate = useNavigate();
  
  // Filter games based on selected vendor and type
  const filteredGames = mockGames.filter(game => {
    if (selectedVendor && game.vendorId !== selectedVendor) return false;
    if (selectedType && game.typeId !== selectedType) return false;
    return true;
  });
  
  // Update the URL when vendor changes
  useEffect(() => {
    if (selectedVendor) {
      navigate(`/games/${selectedVendor}`);
    } else {
      navigate('/games');
    }
  }, [selectedVendor, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-primary text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">棋牌游戏联运中心</Link>
          <div className="flex gap-4">
            <Link to="/login">
              <Button variant="outline" className="bg-white text-primary hover:bg-gray-100">
                登录
              </Button>
            </Link>
          </div>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">游戏大厅</h1>
        
        {/* Vendors Filter */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">游戏厂商</h2>
          <div className="flex flex-wrap gap-3">
            <Button 
              variant={!selectedVendor ? "default" : "outline"}
              onClick={() => setSelectedVendor(undefined)}
            >
              全部
            </Button>
            {mockVendors.map(vendor => (
              <Button
                key={vendor.id}
                variant={selectedVendor === vendor.id ? "default" : "outline"}
                onClick={() => setSelectedVendor(vendor.id)}
              >
                {vendor.name}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Game Types Filter */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">游戏类型</h2>
          <div className="flex flex-wrap gap-3">
            <Button 
              variant={!selectedType ? "default" : "outline"}
              onClick={() => setSelectedType(undefined)}
            >
              全部
            </Button>
            {mockGameTypes.map(type => (
              <Button
                key={type.id}
                variant={selectedType === type.id ? "default" : "outline"}
                onClick={() => setSelectedType(type.id)}
              >
                {type.name}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Games Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredGames.map(game => (
            <div key={game.id} className="game-card">
              <div className="bg-gray-200 game-card-image flex items-center justify-center">
                <span className="text-gray-500">游戏图片</span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{game.name}</h3>
                <p className="text-sm text-gray-500 mb-4">
                  {mockVendors.find(v => v.id === game.vendorId)?.name} · 
                  {mockGameTypes.find(t => t.id === game.typeId)?.name}
                </p>
                <Button variant="default" className="w-full">
                  立即游戏
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        {filteredGames.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">暂无游戏</p>
          </div>
        )}
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>© 2024 棋牌游戏联运中心. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default GameCatalog;
