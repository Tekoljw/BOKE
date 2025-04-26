
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

// Mock vendors
const mockVendors = [
  { id: 'V001', name: 'CQ9' },
  { id: 'V002', name: '开元棋牌' },
  { id: 'V003', name: '捕鱼王' },
  { id: 'V004', name: 'PG电子' }
];

// Bonus rules by vendor
const mockBonusRules = {
  'V001': [
    { depositAmount: 1000, bonusAmount: 3000 },
    { depositAmount: 2000, bonusAmount: 10000 },
    { depositAmount: 5000, bonusAmount: 50000 },
  ],
  'V002': [
    { depositAmount: 1500, bonusAmount: 4500 },
    { depositAmount: 3000, bonusAmount: 15000 },
    { depositAmount: 6000, bonusAmount: 60000 },
  ],
  'V003': [
    { depositAmount: 1200, bonusAmount: 3600 },
    { depositAmount: 2400, bonusAmount: 12000 },
    { depositAmount: 6000, bonusAmount: 60000 },
  ],
  'V004': [
    { depositAmount: 800, bonusAmount: 2400 },
    { depositAmount: 1600, bonusAmount: 8000 },
    { depositAmount: 4000, bonusAmount: 40000 },
  ]
};

const AdminBonusRules: React.FC = () => {
  const { toast } = useToast();
  const [isRulesDialogOpen, setIsRulesDialogOpen] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState<string>('');
  const [vendorRules, setVendorRules] = useState<{depositAmount: number, bonusAmount: number}[]>([]);

  const handleOpenRulesDialog = (vendorId: string) => {
    setSelectedVendor(vendorId);
    setVendorRules(mockBonusRules[vendorId as keyof typeof mockBonusRules] || []);
    setIsRulesDialogOpen(true);
  };

  const handleSaveRules = () => {
    toast({
      title: "赠分规则已保存",
      description: `已成功保存 ${mockVendors.find(v => v.id === selectedVendor)?.name} 的自动赠分规则`,
    });
    setIsRulesDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">赠分规则配置</h1>
        <p className="text-muted-foreground">配置不同厂商线路的自动赠分规则</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockVendors.map((vendor) => (
          <Card key={vendor.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{vendor.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {(mockBonusRules[vendor.id as keyof typeof mockBonusRules] || []).map((rule, index) => (
                  <div key={index} className="text-sm flex justify-between items-center">
                    <span>本月完成上分 {rule.depositAmount}U</span>
                    <span className="font-medium text-green-600">赠送 {rule.bonusAmount}U</span>
                  </div>
                ))}
                <Button 
                  variant="outline" 
                  className="w-full mt-2"
                  onClick={() => handleOpenRulesDialog(vendor.id)}
                >
                  配置规则
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bonus Rules Dialog */}
      <Dialog open={isRulesDialogOpen} onOpenChange={setIsRulesDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {mockVendors.find(v => v.id === selectedVendor)?.name} 自动赠分规则配置
            </DialogTitle>
            <DialogDescription>
              配置该厂商线路的自动赠分规则
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            {vendorRules.map((rule, index) => (
              <div key={index} className="flex items-end gap-4">
                <div className="grid w-full items-center gap-1.5">
                  <label className="text-sm text-muted-foreground">上分金额 (U)</label>
                  <Input 
                    type="number" 
                    value={rule.depositAmount} 
                    onChange={(e) => {
                      const newRules = [...vendorRules];
                      newRules[index].depositAmount = parseInt(e.target.value);
                      setVendorRules(newRules);
                    }}
                  />
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <label className="text-sm text-muted-foreground">赠分金额 (U)</label>
                  <Input 
                    type="number" 
                    value={rule.bonusAmount} 
                    onChange={(e) => {
                      const newRules = [...vendorRules];
                      newRules[index].bonusAmount = parseInt(e.target.value);
                      setVendorRules(newRules);
                    }}
                  />
                </div>
              </div>
            ))}
            
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => setVendorRules([...vendorRules, {depositAmount: 0, bonusAmount: 0}])}
            >
              添加规则
            </Button>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsRulesDialogOpen(false)}>
                取消
              </Button>
              <Button onClick={handleSaveRules}>保存规则</Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminBonusRules;
