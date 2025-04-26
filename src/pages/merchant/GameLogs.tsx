
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { GameLogsFilter } from '@/components/reports/GameLogsFilter';
import { GameLogsViewer } from '@/components/reports/GameLogsViewer';
import { VendorOption, GameOption } from '@/types/report';

// Mock data - replace with API data later
const mockVendors: VendorOption[] = [
  { id: "1", name: "厂商A" },
  { id: "2", name: "厂商B" },
];

const mockGames: GameOption[] = [
  { id: "1", name: "游戏A", vendorId: "1" },
  { id: "2", name: "游戏B", vendorId: "1" },
  { id: "3", name: "游戏C", vendorId: "2" },
];

const MerchantGameLogs: React.FC = () => {
  const [selectedVendor, setSelectedVendor] = useState(mockVendors[0]?.id);
  const [selectedGame, setSelectedGame] = useState(mockGames[0]?.id);
  const [logs, setLogs] = useState<string>('');

  const handleSearch = (filters: { roundId: string; startDate?: Date; endDate?: Date }) => {
    console.log('Search filters:', filters);
    // Mock log data for demonstration
    setLogs(`局号: ${filters.roundId}\n开始时间: ${filters.startDate?.toLocaleString()}\n结束时间: ${filters.endDate?.toLocaleString()}\n\n模拟日志数据...`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">对局日志</h1>
        <p className="text-muted-foreground">查看商户游戏对局日志</p>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <Tabs defaultValue={selectedVendor} className="space-y-6">
            <TabsList className="w-full justify-start h-auto flex-wrap">
              {mockVendors.map((vendor) => (
                <TabsTrigger
                  key={vendor.id}
                  value={vendor.id}
                  onClick={() => setSelectedVendor(vendor.id)}
                >
                  {vendor.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {mockVendors.map((vendor) => (
              <TabsContent key={vendor.id} value={vendor.id}>
                <div className="space-y-6">
                  <Tabs defaultValue={selectedGame}>
                    <TabsList className="w-full justify-start h-auto flex-wrap">
                      {mockGames
                        .filter((game) => game.vendorId === vendor.id)
                        .map((game) => (
                          <TabsTrigger
                            key={game.id}
                            value={game.id}
                            onClick={() => setSelectedGame(game.id)}
                          >
                            {game.name}
                          </TabsTrigger>
                        ))}
                    </TabsList>
                  </Tabs>

                  <GameLogsFilter onSearch={handleSearch} />
                  <GameLogsViewer logs={logs} />
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default MerchantGameLogs;
