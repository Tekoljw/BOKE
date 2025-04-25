
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AgentCommission: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">佣金报表</h1>
        <p className="text-muted-foreground">查看佣金统计信息</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>佣金统计</CardTitle>
          <CardDescription>
            佣金统计数据（待开发）
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

export default AgentCommission;
