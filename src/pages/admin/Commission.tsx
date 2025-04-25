
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AdminCommission: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">佣金结算</h1>
        <p className="text-muted-foreground">代理商佣金提现审核管理</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>佣金申请列表</CardTitle>
          <CardDescription>
            代理商佣金提现申请（待开发）
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

export default AdminCommission;
