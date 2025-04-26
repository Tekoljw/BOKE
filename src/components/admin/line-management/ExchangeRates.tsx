
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Plus, Edit, Check } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface ExchangeRate {
  currency: string;
  displayName: string;
  rate: number;
  autoUpdate: boolean;
}

const INITIAL_RATES: ExchangeRate[] = [
  { currency: "CNY", displayName: "人民币", rate: 7.2, autoUpdate: true },
  { currency: "THB", displayName: "泰铢", rate: 35.8, autoUpdate: false },
  { currency: "IDR", displayName: "印尼盾", rate: 15600, autoUpdate: true },
];

const ExchangeRates: React.FC = () => {
  const [rates, setRates] = useState<ExchangeRate[]>(INITIAL_RATES);
  const [newCurrency, setNewCurrency] = useState("");
  const [newCurrencyDisplayName, setNewCurrencyDisplayName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCurrency, setEditingCurrency] = useState<string | null>(null);
  const { toast } = useToast();

  const handleAddCurrency = () => {
    if (!newCurrency || !newCurrencyDisplayName) return;
    
    setRates([...rates, { 
      currency: newCurrency, 
      displayName: newCurrencyDisplayName, 
      rate: 1, 
      autoUpdate: true 
    }]);
    setNewCurrency("");
    setNewCurrencyDisplayName("");
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

  const handleCurrencyChange = (oldCurrency: string, newCurrency: string) => {
    setRates(rates.map(rate => 
      rate.currency === oldCurrency 
        ? { ...rate, currency: newCurrency.toUpperCase() } 
        : rate
    ));
    setEditingCurrency(null);
  };

  const handleEditDisplayName = (currency: string, newDisplayName: string) => {
    setRates(rates.map(rate => 
      rate.currency === currency 
        ? { ...rate, displayName: newDisplayName } 
        : rate
    ));
    setEditingCurrency(null);
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
            <div className="py-4 space-y-4">
              <div>
                <Label htmlFor="currency">币种代码</Label>
                <Input
                  id="currency"
                  value={newCurrency}
                  onChange={(e) => setNewCurrency(e.target.value.toUpperCase())}
                  placeholder="例如: EUR"
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="currencyName">币种名称</Label>
                <Input
                  id="currencyName"
                  value={newCurrencyDisplayName}
                  onChange={(e) => setNewCurrencyDisplayName(e.target.value)}
                  placeholder="例如: 欧元"
                  className="mt-2"
                />
              </div>
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
            <TableHead>币种代码</TableHead>
            <TableHead>币种名称</TableHead>
            <TableHead>汇率 (1 USDT =)</TableHead>
            <TableHead>自动更新</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rates.map((rate) => (
            <TableRow key={rate.currency}>
              <TableCell>
                {editingCurrency === rate.currency ? (
                  <div className="flex items-center gap-2">
                    <Input
                      value={rate.currency}
                      onChange={(e) => handleCurrencyChange(rate.currency, e.target.value)}
                      className="w-24"
                    />
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => setEditingCurrency(null)}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    {rate.currency}
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => setEditingCurrency(rate.currency)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </TableCell>
              <TableCell>{rate.displayName}</TableCell>
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
