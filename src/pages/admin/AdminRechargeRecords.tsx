
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AdminRechargeRecords: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">商户充值记录</h1>
        <p className="text-muted-foreground">查看所有商户的充值记录</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>商户充值记录</CardTitle>
          <CardDescription>
            平台商户充值记录列表
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

export default AdminRechargeRecords;
