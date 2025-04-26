
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AdminApi: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">API管理</h1>
        <p className="text-muted-foreground">上传SDK、添加api文档链接</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>API管理</CardTitle>
          <CardDescription>
            平台API接口管理功能
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

export default AdminApi;
