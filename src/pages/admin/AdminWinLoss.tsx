
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AdminWinLoss: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">输赢报表</h1>
        <p className="text-muted-foreground">查看所有商户的游戏输赢统计数据</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>输赢报表</CardTitle>
          <CardDescription>
            平台输赢报表列表
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

export default AdminWinLoss;
