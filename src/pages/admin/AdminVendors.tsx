
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AdminVendors: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">线路厂商管理</h1>
        <p className="text-muted-foreground">开关线路商，并可以配置赠分规则</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>线路厂商管理</CardTitle>
          <CardDescription>
            平台线路厂商管理功能
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

export default AdminVendors;
