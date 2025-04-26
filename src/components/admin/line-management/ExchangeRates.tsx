
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface ExchangeRate {
  currency: string;
  rate: number;
  autoUpdate: boolean;
}

const INITIAL_RATES: ExchangeRate[] = [
  { currency: "CNY", rate: 7.2, autoUpdate: true },
  { currency: "THB", rate: 35.8, autoUpdate: false },
  { currency: "IDR", rate: 15600, autoUpdate: true },
];

const ExchangeRates: React.FC = () => {
  const [rates, setRates] = useState<ExchangeRate[]>(INITIAL_RATES);
  const [newCurrency, setNewCurrency] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleAddCurrency = () => {
    if (!newCurrency) return;
    
    setRates([...rates, { currency: newCurrency, rate: 1, autoUpdate: true }]);
    setNewCurrency("");
    setIsDialogOpen(false);
    
    toast({
      title: "成功",
      description: "新币种已添加",
    });
  };

  const handleRateChange = (currency: string, newRate: string) => {
    setRates(rates.map(rate => 
      rate.currency === currency 
        ? { ...rate, rate: Number(newRate) || rate.rate } 
        : rate
    ));
  };

  const toggleAutoUpdate = (currency: string) => {
    setRates(rates.map(rate => 
      rate.currency === currency 
        ? { ...rate, autoUpdate: !rate.autoUpdate } 
        : rate
    ));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-medium">汇率配置</h3>
          <p className="text-sm text-muted-foreground">配置不同币种与USDT之间的汇率</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              添加币种
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>添加新币种</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <Label htmlFor="currency">币种代码</Label>
              <Input
                id="currency"
                value={newCurrency}
                onChange={(e) => setNewCurrency(e.target.value.toUpperCase())}
                placeholder="例如: EUR"
                className="mt-2"
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                取消
              </Button>
              <Button onClick={handleAddCurrency}>
                添加
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>币种</TableHead>
            <TableHead>汇率 (1 USDT =)</TableHead>
            <TableHead>自动更新</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rates.map((rate) => (
            <TableRow key={rate.currency}>
              <TableCell className="font-medium">{rate.currency}</TableCell>
              <TableCell>
                <Input
                  type="number"
                  value={rate.rate}
                  onChange={(e) => handleRateChange(rate.currency, e.target.value)}
                  className="w-32"
                  disabled={rate.autoUpdate}
                />
              </TableCell>
              <TableCell>
                <Switch
                  checked={rate.autoUpdate}
                  onCheckedChange={() => toggleAutoUpdate(rate.currency)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ExchangeRates;
