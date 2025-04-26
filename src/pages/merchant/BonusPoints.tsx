
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Award, Gift, Info } from "lucide-react";
import type { VendorBonus } from '@/types/bonus';

const MerchantBonusPoints: React.FC = () => {
  const { toast } = useToast();
  
  // Mock data - replace with API call
  const vendorBonuses: VendorBonus[] = [
    {
      vendorId: '1',
      vendorName: 'CQ9',
      bonusTypes: [
        {
          id: '1',
          title: '平台活动赠分',
          type: 'activity',
          availableAmount: 5000,
        },
        {
          id: '2',
          title: '每个月返佣',
          type: 'monthly',
          availableAmount: 10000,
          rules: [
            { depositAmount: 10000, bonusAmount: 3000 },
            { depositAmount: 20000, bonusAmount: 10000 },
            { depositAmount: 50000, bonusAmount: 50000 },
          ]
        }
      ]
    },
    {
      vendorId: '2',
      vendorName: '开元棋牌',
      bonusTypes: [
        {
          id: '3',
          title: '平台活动赠分',
          type: 'activity',
          availableAmount: 3000,
        },
        {
          id: '4',
          title: '每个月返佣',
          type: 'monthly',
          availableAmount: 8000,
          rules: [
            { depositAmount: 1000, bonusAmount: 3000 },
            { depositAmount: 2000, bonusAmount: 10000 },
            { depositAmount: 5000, bonusAmount: 50000 },
          ]
        }
      ]
    }
  ];

  const handleClaimBonus = (vendorName: string, bonusTitle: string) => {
    toast({
      title: "赠分领取成功",
      description: `已成功领取 ${vendorName} - ${bonusTitle} 赠分`,
    });
  };

  return (
    <div className="space-y-4">
      <div className="mb-2">
        <h1 className="text-2xl font-bold">赠分领取</h1>
        <p className="text-sm text-muted-foreground">查看和领取各个平台的赠分奖励</p>
      </div>

      <div className="grid gap-2">
        {vendorBonuses.map((vendor) => (
          <Card key={vendor.vendorId} className="p-3">
            <h2 className="text-base font-medium mb-2 flex items-center gap-1.5">
              <Award className="h-4 w-4 text-brand-accent" />
              {vendor.vendorName}
            </h2>
            
            <div className="space-y-2">
              {vendor.bonusTypes.map((bonus) => (
                <div key={bonus.id} className="border rounded-md p-2">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <Gift className="h-4 w-4 shrink-0 text-brand-DEFAULT" />
                      <h3 className="text-sm font-medium truncate">{bonus.title}</h3>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <div className="text-right">
                        <div className="text-xs text-muted-foreground">可领取金额</div>
                        <div className="text-base font-bold text-brand-accent">
                          {bonus.availableAmount}
                        </div>
                      </div>
                      <Button 
                        size="sm"
                        onClick={() => handleClaimBonus(vendor.vendorName, bonus.title)}
                        disabled={bonus.availableAmount <= 0}
                      >
                        领取
                      </Button>
                    </div>
                  </div>

                  {bonus.rules && (
                    <Accordion type="single" collapsible className="pt-1">
                      <AccordionItem value="rules" className="border-0">
                        <AccordionTrigger className="py-1 hover:no-underline">
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Info className="h-3 w-3" />
                            查看规则
                          </span>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-1 text-xs">
                            {bonus.rules.map((rule, index) => (
                              <div 
                                key={index}
                                className="flex items-center justify-between py-1 border-b last:border-0"
                              >
                                <span>本月完成上分 {rule.depositAmount}U</span>
                                <span className="font-medium text-brand-accent">
                                  赠送 {rule.bonusAmount}U
                                </span>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  )}
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MerchantBonusPoints;
