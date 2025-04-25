
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AgentDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">代理商仪表盘</h1>
        <p className="text-muted-foreground">查看代理商数据统计</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>数据概览</CardTitle>
          <CardDescription>
            代理商数据统计（待开发）
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

export default AgentDashboard;
