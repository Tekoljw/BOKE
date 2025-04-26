
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Gamepad2 } from "lucide-react";

// Mock data for vendors and games
const mockVendors = Array.from({ length: 50 }, (_, i) => ({
  id: `v${i + 1}`,
  name: `厂商 ${i + 1}`,
  logo: `/placeholder.svg`,
  gameCount: Math.floor(Math.random() * 10) + 1,
  status: Math.random() > 0.3 ? 'active' : 'inactive'
}));

const generateMockGames = (vendorId: string) => {
  const gamesCount = Math.floor(Math.random() * 8) + 1;
  return Array.from({ length: gamesCount }, (_, i) => ({
    id: `g${vendorId}-${i + 1}`,
    vendorId,
    name: `游戏 ${vendorId}-${i + 1}`,
    type: ['老虎机', '棋牌', '真人', '彩票', '电竞'][Math.floor(Math.random() * 5)],
    thumbnail: `/placeholder.svg`,
    demoUrl: `https://demo-${vendorId}-${i + 1}.example.com`,
    status: Math.random() > 0.2 ? 'active' : 'inactive',
    featured: Math.random() > 0.7
  }));
};

const AdminDemoGames: React.FC = () => {
  const [selectedVendor, setSelectedVendor] = useState(mockVendors[0]?.id);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentGames, setCurrentGames] = useState(generateMockGames(mockVendors[0]?.id));

  // Filter vendors based on search term
  const filteredVendors = searchTerm 
    ? mockVendors.filter(v => v.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : mockVendors;

  const handleVendorSelect = (vendorId: string) => {
    setSelectedVendor(vendorId);
    setCurrentGames(generateMockGames(vendorId));
  };

  const toggleGameStatus = (gameId: string) => {
    setCurrentGames(games => games.map(game => 
      game.id === gameId 
        ? {...game, status: game.status === 'active' ? 'inactive' : 'active'} 
        : game
    ));
  };

  const toggleGameFeatured = (gameId: string) => {
    setCurrentGames(games => games.map(game => 
      game.id === gameId 
        ? {...game, featured: !game.featured} 
        : game
    ));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">游戏管理</h1>
        <p className="text-muted-foreground">管理游戏和厂商的展示配置（注：此处配置不仅对商户生效，同时对官网游戏Demo页面生效）</p>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <div className="mb-6">
            <div className="flex gap-4 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="搜索厂商..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline">
                刷新列表
              </Button>
            </div>
          </div>

          <Tabs defaultValue={selectedVendor} onValueChange={handleVendorSelect}>
            <TabsList className="w-full flex-wrap h-auto justify-start">
              {filteredVendors.map((vendor) => (
                <TabsTrigger key={vendor.id} value={vendor.id}>
                  {vendor.name}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={selectedVendor} className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>游戏ID</TableHead>
                    <TableHead>游戏名称</TableHead>
                    <TableHead>游戏类型</TableHead>
                    <TableHead>演示链接</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead>推荐</TableHead>
                    <TableHead>操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentGames.map((game) => (
                    <TableRow key={game.id}>
                      <TableCell>{game.id}</TableCell>
                      <TableCell className="flex items-center gap-2">
                        <Gamepad2 className="h-4 w-4" />
                        {game.name}
                      </TableCell>
                      <TableCell>{game.type}</TableCell>
                      <TableCell>
                        <a 
                          href={game.demoUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-blue-600 hover:underline"
                        >
                          演示链接
                        </a>
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          game.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {game.status === 'active' ? '已启用' : '已禁用'}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          game.featured ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {game.featured ? '已推荐' : '未推荐'}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => toggleGameStatus(game.id)}
                          >
                            {game.status === 'active' ? '禁用' : '启用'}
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => toggleGameFeatured(game.id)}
                          >
                            {game.featured ? '取消推荐' : '设为推荐'}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDemoGames;
