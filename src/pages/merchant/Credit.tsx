
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const MerchantCredit: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">买分管理</h1>
        <p className="text-muted-foreground">管理玩家买分</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>买分管理</CardTitle>
          <CardDescription>
            玩家买分管理功能（待开发）
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

export default MerchantCredit;
