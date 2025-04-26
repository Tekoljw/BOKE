
import React from 'react';
import { useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const ManufacturerDetail: React.FC = () => {
  const { id } = useParams();

  // Mock data - in a real app, this would come from an API
  const manufacturer = {
    id: '1',
    name: 'Evolution Gaming',
    description: '全球最大的线上真人游戏供应商',
    fullDescription: `Evolution Gaming 是全球最大的线上真人游戏供应商，成立于2006年。
      公司专注于提供高质量的真人娱乐场游戏，包括百家乐、轮盘、二十一点等多种游戏。
      Evolution的游戏以其高清视频质量、专业荷官和创新gameplay而闻名于业界。`,
    games: [
      { id: '1', name: '闪电百家乐', type: '真人游戏' },
      { id: '2', name: '无限二十一点', type: '真人游戏' },
      { id: '3', name: '飞速轮盘', type: '真人游戏' },
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>{manufacturer.name}</CardTitle>
              <CardDescription>{manufacturer.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">厂商介绍</h3>
                <p className="text-gray-600 whitespace-pre-line">
                  {manufacturer.fullDescription}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">游戏列表</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {manufacturer.games.map((game) => (
                    <div key={game.id} className="bg-white rounded-lg shadow p-4">
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
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ManufacturerDetail;
