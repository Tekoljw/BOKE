
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AdminSelfGames: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">自研游戏管理</h1>
        <p className="text-muted-foreground">游戏开关，房间杀率配置</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>自研游戏管理</CardTitle>
          <CardDescription>
            平台自研游戏管理功能
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

export default AdminSelfGames;
