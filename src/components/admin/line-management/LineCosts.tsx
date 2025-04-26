
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface VendorCost {
  id: number;
  name: string;
  cost: number;
  currencies: string[];
}

const MOCK_VENDORS: VendorCost[] = [
  { id: 1, name: "AG Gaming", cost: 0.025, currencies: ["USDT", "CNY", "THB"] },
  { id: 2, name: "EVO Gaming", cost: 0.03, currencies: ["USDT", "CNY", "IDR"] },
  // Add more mock data as needed
];

const LineCosts: React.FC = () => {
  const [vendors, setVendors] = useState<VendorCost[]>(MOCK_VENDORS);
  const [editingId, setEditingId] = useState<number | null>(null);
  const { toast } = useToast();
  
  const handleCostChange = (id: number, newCost: string) => {
    setVendors(vendors.map(vendor => 
      vendor.id === id 
        ? { ...vendor, cost: Number(newCost) || 0 } 
        : vendor
    ));
  };

  const handleSave = (id: number) => {
    // Here you would typically make an API call to save the changes
    setEditingId(null);
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
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>厂商名称</TableHead>
            <TableHead>成本费率</TableHead>
            <TableHead>支持币种</TableHead>
            <TableHead className="w-[100px]">操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vendors.map((vendor) => (
            <TableRow key={vendor.id}>
              <TableCell>{vendor.name}</TableCell>
              <TableCell>
                {editingId === vendor.id ? (
                  <Input
                    type="number"
                    value={vendor.cost}
                    onChange={(e) => handleCostChange(vendor.id, e.target.value)}
                    className="w-24"
                    step="0.001"
                    min="0"
                    max="1"
                  />
                ) : (
                  `${(vendor.cost * 100).toFixed(2)}%`
                )}
              </TableCell>
              <TableCell>
                <div className="flex gap-1">
                  {vendor.currencies.map((currency) => (
                    <span 
                      key={currency}
                      className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-xs"
                    >
                      {currency}
                    </span>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                {editingId === vendor.id ? (
                  <Button 
                    size="sm" 
                    onClick={() => handleSave(vendor.id)}
                  >
                    <Save className="h-4 w-4 mr-1" />
                    保存
                  </Button>
                ) : (
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setEditingId(vendor.id)}
                  >
                    编辑
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default LineCosts;
