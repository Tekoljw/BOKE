
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const ManufacturerDetail: React.FC = () => {
  const navigate = useNavigate();

  // Mock data for manufacturer categories and details
  const manufacturerCategories = [
    {
      id: 'live',
      name: '真人厂商',
      manufacturers: [
        {
          id: 'evo',
          name: 'Evolution',
          icon: '🎲',
          description: '全球最大的线上真人游戏供应商',
          fullDescription: `Evolution Gaming 是全球最大的线上真人游戏供应商，成立于2006年。
            公司专注于提供高质量的真人娱乐场游戏，包括百家乐、轮盘、二十一点等多种游戏。
            Evolution的游戏以其高清视频质量、专业荷官和创新gameplay而闻名于业界。`,
          games: [
            { id: '1', name: '闪电百家乐', type: '真人游戏' },
            { id: '2', name: '无限二十一点', type: '真人游戏' },
            { id: '3', name: '飞速轮盘', type: '真人游戏' },
          ]
        },
        {
          id: 'ag',
          name: 'AG Gaming',
          icon: '🎰',
          description: '亚洲顶级真人娱乐场供应商',
          fullDescription: 'AG Gaming提供优质的真人娱乐场体验...',
          games: [
            { id: '4', name: 'AG百家乐', type: '真人游戏' },
            { id: '5', name: 'AG龙虎', type: '真人游戏' },
          ]
        }
      ]
    },
    {
      id: 'slots',
      name: '电子游戏',
      manufacturers: [
        {
          id: 'pg',
          name: 'PG Soft',
          icon: '🎮',
          description: '创新型电子游戏开发商',
          fullDescription: 'PG Soft专注于移动优先的游戏开发...',
          games: [
            { id: '6', name: '幸运财神', type: '电子游戏' },
            { id: '7', name: '玛雅财富', type: '电子游戏' },
          ]
        },
        {
          id: 'cq9',
          name: 'CQ9 Gaming',
          icon: '🎯',
          description: '专业电子游戏开发商',
          fullDescription: 'CQ9 Gaming提供丰富多样的电子游戏...',
          games: [
            { id: '8', name: '龙王捕鱼', type: '电子游戏' },
            { id: '9', name: '战神黄忠', type: '电子游戏' },
          ]
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate(-1)}
              className="p-2"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold">游戏厂商</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="live" className="w-full">
          <TabsList className="flex flex-wrap gap-2 mb-6">
            {manufacturerCategories.map((category) => (
              <TabsTrigger key={category.id} value={category.id}>
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {manufacturerCategories.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <Tabs defaultValue={category.manufacturers[0]?.id} className="w-full">
                <TabsList className="flex flex-wrap gap-2 mb-6">
                  {category.manufacturers.map((manufacturer) => (
                    <TabsTrigger key={manufacturer.id} value={manufacturer.id}
                      className="flex items-center gap-2">
                      <span>{manufacturer.icon}</span>
                      <span>{manufacturer.name}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>

                {category.manufacturers.map((manufacturer) => (
                  <TabsContent key={manufacturer.id} value={manufacturer.id}
                    className="bg-white rounded-lg shadow p-6">
                    <div className="space-y-8">
                      <div>
                        <h2 className="text-2xl font-bold mb-2">{manufacturer.name}</h2>
                        <p className="text-gray-600 mb-4">{manufacturer.description}</p>
                        <div className="text-gray-600 whitespace-pre-line">
                          {manufacturer.fullDescription}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold mb-4">游戏列表</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {manufacturer.games.map((game) => (
                            <div key={game.id} className="bg-gray-50 rounded-lg p-4">
                              <h4 className="font-semibold">{game.name}</h4>
                              <p className="text-sm text-gray-500">{game.type}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-center space-x-4">
                        <Button variant="outline">查看演示</Button>
                        <Button>技术对接</Button>
                      </div>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default ManufacturerDetail;
