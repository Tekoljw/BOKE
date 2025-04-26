
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AdminBonusManagement: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">商户赠分管理</h1>
        <p className="text-muted-foreground">管理商户赠分规则和分配</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>商户赠分管理</CardTitle>
          <CardDescription>
            平台商户赠分管理功能
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

export default AdminBonusManagement;
