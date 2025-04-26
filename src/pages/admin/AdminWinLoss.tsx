
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { WinLossFilters } from '@/components/reports/WinLossFilters';
import { WinLossTable } from '@/components/reports/WinLossTable';
import { WinLossRecord, VendorOption, GameOption } from '@/types/report';

// Mock data
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
    merchantId: "merchant001", // Added merchantId
    username: "player1",
    gameType: "德州扑克",
    roomType: "普通场",
    tableNumber: "T001",
    initialAmount: 1000,
    validBetAmount: 500,
    winLossAmount: 200,
    roundId: "R123456",
  },
];

const AdminWinLoss = () => {
  const [selectedVendor, setSelectedVendor] = useState(mockVendors[0]?.id);
  const [selectedGame, setSelectedGame] = useState(mockGames[0]?.id);
  const [loading, setLoading] = useState(false);
  const [records, setRecords] = useState<WinLossRecord[]>(mockRecords);

  const handleSearch = (filters: any) => {
    console.log('Search filters:', filters);
  };

  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">输赢报表</h1>
        <p className="text-muted-foreground">查看所有商户的游戏输赢统计数据</p>
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

export default AdminWinLoss;
