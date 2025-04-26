
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { GameLogsFilter } from '@/components/reports/GameLogsFilter';
import { GameLogsViewer } from '@/components/reports/GameLogsViewer';

const AdminGameLogs = () => {
  const [logs, setLogs] = useState<string>('');

  const handleSearch = (filters: {
    roundId: string;
    startDate?: Date;
    endDate?: Date;
  }) => {
    console.log('Search filters:', filters);
    // Simulated log data
    setLogs(`Round ${filters.roundId} logs from ${filters.startDate} to ${filters.endDate}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">对局日志</h1>
        <p className="text-muted-foreground">查看游戏对局详细日志记录</p>
      </div>
      
      <Card>
        <CardContent className="p-6 space-y-6">
          <GameLogsFilter onSearch={handleSearch} />
          <GameLogsViewer logs={logs} />
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminGameLogs;
