
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Save, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface VendorCostRate {
  currency: string;
  cost: number;
}

interface VendorCost {
  id: number;
  name: string;
  costRates: VendorCostRate[];
}

const MOCK_VENDORS: VendorCost[] = [
  { 
    id: 1, 
    name: "AG Gaming",
    costRates: [
      { currency: "USDT", cost: 0.025 },
      { currency: "CNY", cost: 0.028 },
      { currency: "THB", cost: 0.030 },
      { currency: "IDR", cost: 0.027 },
      { currency: "VND", cost: 0.026 },
    ]
  },
  { 
    id: 2, 
    name: "EVO Gaming",
    costRates: [
      { currency: "USDT", cost: 0.030 },
      { currency: "CNY", cost: 0.032 },
      { currency: "IDR", cost: 0.035 },
      { currency: "VND", cost: 0.033 },
    ]
  },
];

const LineCosts: React.FC = () => {
  const [vendors, setVendors] = useState<VendorCost[]>(MOCK_VENDORS);
  const [editingVendor, setEditingVendor] = useState<number | null>(null);
  const { toast } = useToast();
  
  const handleCostChange = (vendorId: number, currency: string, newCost: string) => {
    setVendors(vendors.map(vendor => 
      vendor.id === vendorId 
        ? {
            ...vendor,
            costRates: vendor.costRates.map(rate =>
              rate.currency === currency
                ? { ...rate, cost: Number(newCost) || 0 }
                : rate
            )
          }
        : vendor
    ));
  };

  const handleSave = (vendorId: number) => {
    // Here you would typically make an API call to save the changes
    setEditingVendor(null);
    toast({
      title: "成功",
      description: "成本费率已更新",
    });
  };

  return (
    <div className="space-y-4">
      <div className="mb-4">
        <h3 className="text-lg font-medium">线路成本配置</h3>
        <p className="text-sm text-muted-foreground">管理各线路厂商的成本费率与支持币种</p>
      </div>
      
      {vendors.map((vendor) => (
        <div key={vendor.id} className="bg-white rounded-lg shadow p-4 mb-4">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-lg font-semibold">{vendor.name}</h4>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => editingVendor === vendor.id 
                ? handleSave(vendor.id)
                : setEditingVendor(vendor.id)
              }
            >
              {editingVendor === vendor.id ? (
                <>
                  <Save className="h-4 w-4 mr-1" />
                  保存
                </>
              ) : (
                <>
                  <Edit className="h-4 w-4 mr-1" />
                  编辑
                </>
              )}
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {vendor.costRates.map((rate) => (
              <div 
                key={rate.currency}
                className="flex flex-col space-y-2 p-3 border rounded-lg"
              >
                <span className="text-sm font-medium text-muted-foreground">
                  {rate.currency}
                </span>
                {editingVendor === vendor.id ? (
                  <Input
                    type="number"
                    value={rate.cost}
                    onChange={(e) => handleCostChange(vendor.id, rate.currency, e.target.value)}
                    className="w-full"
                    step="0.001"
                    min="0"
                    max="1"
                  />
                ) : (
                  <span className="text-lg font-semibold">
                    {(rate.cost * 100).toFixed(2)}%
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default LineCosts;
