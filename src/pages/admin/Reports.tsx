
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AdminReports: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">经营报表</h1>
        <p className="text-muted-foreground">查看每日经营情况，分成和佣金计算，平台利润</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>经营报表</CardTitle>
          <CardDescription>
            每日经营报表（待开发）
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

export default AdminReports;
