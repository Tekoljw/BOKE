
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { TransactionFilter } from '@/components/reports/TransactionFilter';
import { TransactionTable } from '@/components/reports/TransactionTable';
import { TransactionRecord } from '@/types/report';

const mockTransactions: TransactionRecord[] = [
  {
    id: "T001",
    timestamp: "2024-04-26 10:30:00",
    merchantId: "merchant001", // Added merchantId
    username: "player1",
    type: "deposit",
    beforeAmount: 1000,
    changeAmount: 500,
    afterAmount: 1500,
    platformBalanceChange: -500,
    merchantBalanceChange: 500
  }
];

const AdminTransactions = () => {
  const [loading, setLoading] = useState(false);
  const [records, setRecords] = useState<TransactionRecord[]>(mockTransactions);

  const handleSearch = (filters: {
    roundId: string;
    startDate?: Date;
    endDate?: Date;
  }) => {
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
        <h1 className="text-3xl font-bold mb-2">上下分记录</h1>
        <p className="text-muted-foreground">查看所有商户的上下分交易记录</p>
      </div>
      
      <Card>
        <CardContent className="p-6 space-y-6">
          <TransactionFilter onSearch={handleSearch} />
          <TransactionTable
            records={records}
            loading={loading}
            onLoadMore={handleLoadMore}
            hasMore={true}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminTransactions;
