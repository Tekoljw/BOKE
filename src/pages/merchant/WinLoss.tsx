
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { WinLossFilters } from '@/components/reports/WinLossFilters';
import { WinLossTable } from '@/components/reports/WinLossTable';
import { WinLossRecord, VendorOption, GameOption } from '@/types/report';

// 模拟数据，实际应该从API获取
const mockVendors: VendorOption[] = [
  { id: "1", name: "厂商A" },
  { id: "2", name: "厂商B" },
];

const mockGames: GameOption[] = [
  { id: "1", name: "游戏A", vendorId: "1" },
  { id: "2", name: "游戏B", vendorId: "1" },
  { id: "3", name: "游戏C", vendorId: "2" },
];

const mockRecords: WinLossRecord[] = [
  {
    id: "1",
    timestamp: "2024-04-26 10:30:00",
    username: "player1",
    gameType: "德州扑克",
    roomType: "普通场",
    tableNumber: "T001",
    initialAmount: 1000,
    validBetAmount: 500,
    winLossAmount: 200,
    roundId: "R123456",
  },
  // ... Add more mock records
];

const MerchantWinLoss = () => {
  const [selectedVendor, setSelectedVendor] = useState(mockVendors[0]?.id);
  const [selectedGame, setSelectedGame] = useState(mockGames[0]?.id);
  const [loading, setLoading] = useState(false);
  const [records, setRecords] = useState<WinLossRecord[]>(mockRecords);

  const handleSearch = (filters: any) => {
    console.log('Search filters:', filters);
    // Implement search logic here
  };

  const handleLoadMore = () => {
    setLoading(true);
    // Simulate loading more data
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">输赢报表</h1>
        <p className="text-muted-foreground">查看商户游戏输赢统计</p>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <Tabs defaultValue={selectedVendor} className="space-y-6">
            <TabsList className="w-full h-auto flex-wrap">
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
                    <TabsList className="w-full h-auto flex-wrap">
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

                  <WinLossFilters onSearch={handleSearch} />
                  
                  <WinLossTable
                    records={records}
                    loading={loading}
                    onLoadMore={handleLoadMore}
                    hasMore={true}
                  />
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default MerchantWinLoss;
