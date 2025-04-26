
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AdminTransactions: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">上下分记录</h1>
        <p className="text-muted-foreground">查看所有商户的上下分交易记录</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>上下分记录</CardTitle>
          <CardDescription>
            平台上下分交易记录列表
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

export default AdminTransactions;
