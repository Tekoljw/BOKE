
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const MerchantBalances: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">玩家分数</h1>
        <p className="text-muted-foreground">查看和管理玩家分数</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>玩家分数列表</CardTitle>
          <CardDescription>
            玩家分数数据（待开发）
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

export default MerchantBalances;
