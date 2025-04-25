
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AgentMerchants: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">商户管理</h1>
        <p className="text-muted-foreground">查看代理商下属商户的费率和经营情况</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>商户列表</CardTitle>
          <CardDescription>
            代理商下属商户列表（待开发）
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

export default AgentMerchants;
