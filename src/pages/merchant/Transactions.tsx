
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { TransactionFilter } from '@/components/reports/TransactionFilter';
import { TransactionTable } from '@/components/reports/TransactionTable';
import { VendorOption, TransactionType, TransactionRecord } from '@/types/report';

// Mock data - replace with API data later
const mockVendors: VendorOption[] = [
  { id: "1", name: "厂商A" },
  { id: "2", name: "厂商B" },
];

const mockTransactions: TransactionRecord[] = [
  {
    id: "TX001",
    timestamp: "2024-04-26 10:30:00",
    merchantId: "merchant001", // Added merchantId
    username: "player1",
    type: "deposit",
    beforeAmount: 1000,
    changeAmount: 500,
    afterAmount: 1500,
    platformBalanceChange: 500,
    merchantBalanceChange: -500,
  },
  {
    id: "TX002",
    timestamp: "2024-04-26 11:45:00",
    merchantId: "merchant002", // Added merchantId
    username: "player2",
    type: "withdraw",
    beforeAmount: 2000,
    changeAmount: -800,
    afterAmount: 1200,
    platformBalanceChange: -800,
    merchantBalanceChange: 800,
  },
  {
    id: "TX003",
    timestamp: "2024-04-26 12:15:00",
    merchantId: "merchant001", // Added merchantId
    username: "player1",
    type: "deposit",
    beforeAmount: 1500,
    changeAmount: 300,
    afterAmount: 1800,
    platformBalanceChange: 300,
    merchantBalanceChange: -300,
  },
];

const MerchantTransactions: React.FC = () => {
  const [selectedVendor, setSelectedVendor] = useState(mockVendors[0]?.id);
  const [selectedType, setSelectedType] = useState<TransactionType>("deposit");
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState<TransactionRecord[]>(mockTransactions);

  const handleSearch = (filters: { roundId: string; startDate?: Date; endDate?: Date }) => {
    console.log('Search filters:', filters);
    // Mock filtering logic
    setTransactions(mockTransactions.filter(tx => 
      tx.type === selectedType && 
      (!filters.roundId || tx.id.includes(filters.roundId))
    ));
  };

  const handleLoadMore = () => {
    setLoading(true);
    // Simulate loading more data
    setTimeout(() => {
      // Add more mock data
      setTransactions(prev => [
        ...prev,
        {
          id: `TX00${prev.length + 1}`,
          timestamp: "2024-04-26 13:30:00",
          merchantId: `merchant00${prev.length % 2 + 1}`, // Added merchantId
          username: `player${prev.length % 3 + 1}`,
          type: selectedType,
          beforeAmount: 2000,
          changeAmount: selectedType === "deposit" ? 500 : -500,
          afterAmount: selectedType === "deposit" ? 2500 : 1500,
          platformBalanceChange: selectedType === "deposit" ? 500 : -500,
          merchantBalanceChange: selectedType === "deposit" ? -500 : 500,
        }
      ]);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">上下分记录</h1>
        <p className="text-muted-foreground">查看玩家上下分记录</p>
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
                  <Tabs defaultValue={selectedType} onValueChange={(value) => setSelectedType(value as TransactionType)}>
                    <TabsList className="w-full justify-start h-auto flex-wrap">
                      <TabsTrigger value="deposit">上分</TabsTrigger>
                      <TabsTrigger value="withdraw">下分</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="deposit" className="pt-6">
                      <TransactionFilter onSearch={handleSearch} />
                      <TransactionTable
                        records={transactions.filter(tx => tx.type === "deposit")}
                        loading={loading}
                        onLoadMore={handleLoadMore}
                        hasMore={true}
                      />
                    </TabsContent>
                    
                    <TabsContent value="withdraw" className="pt-6">
                      <TransactionFilter onSearch={handleSearch} />
                      <TransactionTable
                        records={transactions.filter(tx => tx.type === "withdraw")}
                        loading={loading}
                        onLoadMore={handleLoadMore}
                        hasMore={true}
                      />
                    </TabsContent>
                  </Tabs>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default MerchantTransactions;
