
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AdminGames: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">游戏管理</h1>
        <p className="text-muted-foreground">管理平台游戏列表和开关状态</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>游戏列表</CardTitle>
          <CardDescription>
            平台游戏列表（待开发）
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

export default AdminGames;
