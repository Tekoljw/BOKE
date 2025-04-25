
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AdminSystem: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">系统管理</h1>
        <p className="text-muted-foreground">白名单配置、API文档配置、接入demo下载、域名更换</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>系统配置</CardTitle>
          <CardDescription>
            系统配置（待开发）
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

export default AdminSystem;
