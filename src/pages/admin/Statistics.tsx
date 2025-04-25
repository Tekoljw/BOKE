
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AdminStatistics: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">数据统计</h1>
        <p className="text-muted-foreground">活跃统计、在线统计、输赢统计</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>统计数据</CardTitle>
          <CardDescription>
            平台数据统计（待开发）
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="py-8 text-center text-muted-foreground">
            此功能正在开发中...
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminStatistics;
