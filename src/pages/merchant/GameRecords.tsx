
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const MerchantGameRecords: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">游戏记录</h1>
        <p className="text-muted-foreground">查看商户游戏记录</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>游戏记录列表</CardTitle>
          <CardDescription>
            商户游戏记录数据（待开发）
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

export default MerchantGameRecords;
