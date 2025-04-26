
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LineCosts from '@/components/admin/line-management/LineCosts';
import ExchangeRates from '@/components/admin/line-management/ExchangeRates';

const LineManagement: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">线路管理</h1>
        <p className="text-muted-foreground">管理线路成本与汇率配置</p>
      </div>
      
      <Card>
        <Tabs defaultValue="costs" className="w-full">
          <TabsList className="w-full justify-start border-b rounded-none h-12 bg-transparent p-0">
            <TabsTrigger 
              value="costs"
              className="data-[state=active]:bg-background rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
            >
              线路成本
            </TabsTrigger>
            <TabsTrigger 
              value="rates"
              className="data-[state=active]:bg-background rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
            >
              汇率配置
            </TabsTrigger>
          </TabsList>
          <TabsContent value="costs" className="p-6">
            <LineCosts />
          </TabsContent>
          <TabsContent value="rates" className="p-6">
            <ExchangeRates />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default LineManagement;
