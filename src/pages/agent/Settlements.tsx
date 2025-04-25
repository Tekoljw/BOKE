
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AgentSettlements: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">结算记录</h1>
        <p className="text-muted-foreground">佣金结算历史记录</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>结算列表</CardTitle>
          <CardDescription>
            佣金结算历史（待开发）
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

export default AgentSettlements;
