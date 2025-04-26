
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AdminGameLogs: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">对局日志</h1>
        <p className="text-muted-foreground">查看所有商户的游戏对局记录</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>对局日志</CardTitle>
          <CardDescription>
            平台游戏对局日志列表
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

export default AdminGameLogs;
