
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const MerchantControl: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">追杀控制</h1>
        <p className="text-muted-foreground">管理玩家追杀系统</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>追杀设置</CardTitle>
          <CardDescription>
            玩家追杀控制（待开发）
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

export default MerchantControl;
