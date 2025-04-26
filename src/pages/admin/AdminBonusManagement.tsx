import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, ChevronDown, Loader } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Mock data
const mockBonusRecords = [
  {
    id: '1',
    merchantId: 'M001',
    merchantName: '商户A',
    vendorId: 'V001',
    vendorName: 'CQ9',
    bonusAmount: 1000,
    reason: '活动赠送',
    distributionType: 'auto',
    status: 'active',
    isClaimed: true,
    createdAt: '2024-04-26 10:30:00',
    expireAt: '2024-05-26 10:30:00',
    claimedAt: '2024-04-26 11:30:00'
  },
  {
    id: '2',
    merchantId: 'M002',
    merchantName: '商户B',
    vendorId: 'V002',
    vendorName: '开元棋牌',
    bonusAmount: 500,
    reason: '每月返佣',
    distributionType: 'auto',
    status: 'expired',
    isClaimed: false,
    createdAt: '2024-04-25 15:45:00',
    expireAt: '2024-05-25 15:45:00',
    claimedAt: null
  },
  {
    id: '3',
    merchantId: 'M003',
    merchantName: '商户C',
    vendorId: 'V001',
    vendorName: 'CQ9',
    bonusAmount: 2000,
    reason: '手动赠送',
    distributionType: 'manual',
    status: 'active',
    isClaimed: false,
    createdAt: '2024-04-24 09:15:00',
    expireAt: '2024-05-24 09:15:00',
    claimedAt: null
  },
];

// Mock vendors
const mockVendors = [
  { id: 'V001', name: 'CQ9' },
  { id: 'V002', name: '开元棋牌' },
  { id: 'V003', name: '捕鱼王' },
  { id: 'V004', name: 'PG电子' }
];

// Mock merchants
const mockMerchants = [
  { id: 'M001', name: '商户A' },
  { id: 'M002', name: '商户B' },
  { id: 'M003', name: '商户C' },
  { id: 'M004', name: '商户D' }
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

// Form schema for manual bonus
const manualBonusSchema = z.object({
  merchantId: z.string().min(1, "请选择商户"),
  vendorId: z.string().min(1, "请选择厂商线路"),
  amount: z.coerce.number().positive("请输入大于0的金额"),
  reason: z.string().min(1, "请输入赠分原因"),
});

type ManualBonusFormValues = z.infer<typeof manualBonusSchema>;

const AdminBonusManagement: React.FC = () => {
  const { toast } = useToast();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isManualBonusOpen, setIsManualBonusOpen] = useState(false);
  const [displayedRecords, setDisplayedRecords] = useState(mockBonusRecords.slice(0, 10));
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<ManualBonusFormValues>({
    resolver: zodResolver(manualBonusSchema),
    defaultValues: {
      merchantId: "",
      vendorId: "",
      amount: 0,
      reason: "",
    },
  });

  const handleLoadMore = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const currentLength = displayedRecords.length;
    const nextRecords = mockBonusRecords.slice(currentLength, currentLength + 10);
    setDisplayedRecords([...displayedRecords, ...nextRecords]);
    setHasMore(currentLength + 10 < mockBonusRecords.length);
    setIsLoading(false);
  };

  const handleManualBonus = (values: ManualBonusFormValues) => {
    toast({
      title: "手动赠分成功",
      description: `已为商户 ${values.merchantId} 在 ${mockVendors.find(v => v.id === values.vendorId)?.name} 线路赠送 ${values.amount} 分`,
    });
    setIsManualBonusOpen(false);
    form.reset();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">商户赠分管理</h1>
        <p className="text-muted-foreground">管理商户赠分记录</p>
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">赠分记录</h2>
        <Button onClick={() => setIsManualBonusOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          手动赠分
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>赠分记录查询</CardTitle>
          <CardDescription>
            按时间范围查询商户赠分记录
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-4 items-end">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <label className="text-sm text-muted-foreground">开始时间</label>
                <Input
                  type="datetime-local"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <label className="text-sm text-muted-foreground">结束时间</label>
                <Input
                  type="datetime-local"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
              <Button>
                <Search className="mr-2 h-4 w-4" />
                查询
              </Button>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>商户ID</TableHead>
                    <TableHead>商户名称</TableHead>
                    <TableHead>厂商线路</TableHead>
                    <TableHead>赠分数量</TableHead>
                    <TableHead>赠分原因</TableHead>
                    <TableHead>赠分方式</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead>领取状态</TableHead>
                    <TableHead>创建时间</TableHead>
                    <TableHead>过期时间</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {displayedRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell>{record.merchantId}</TableCell>
                      <TableCell>{record.merchantName}</TableCell>
                      <TableCell>{record.vendorName}</TableCell>
                      <TableCell>{record.bonusAmount}</TableCell>
                      <TableCell>{record.reason}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-sm ${
                          record.distributionType === 'auto' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                        }`}>
                          {record.distributionType === 'auto' ? '自动发放' : '手动赠分'}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-sm ${
                          record.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {record.status === 'active' ? '生效中' : '已过期'}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-sm ${
                          record.isClaimed ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {record.isClaimed ? '已领取' : '未领取'}
                        </span>
                      </TableCell>
                      <TableCell>{record.createdAt}</TableCell>
                      <TableCell>{record.expireAt}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {hasMore && (
              <div className="flex justify-center mt-4">
                <Button
                  variant="outline"
                  onClick={handleLoadMore}
                  className="w-full max-w-sm"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <ChevronDown className="mr-2 h-4 w-4" />
                  )}
                  {isLoading ? "加载中..." : "加载更多"}
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Manual Bonus Dialog */}
      <Dialog open={isManualBonusOpen} onOpenChange={setIsManualBonusOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>手动赠分</DialogTitle>
            <DialogDescription>
              为指定商户在特定厂商线路赠送积分
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleManualBonus)} className="space-y-4">
              <FormField
                control={form.control}
                name="merchantId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>商户</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="选择商户" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {mockMerchants.map((merchant) => (
                          <SelectItem key={merchant.id} value={merchant.id}>
                            {merchant.name} ({merchant.id})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="vendorId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>厂商线路</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="选择厂商线路" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {mockVendors.map((vendor) => (
                          <SelectItem key={vendor.id} value={vendor.id}>
                            {vendor.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>赠分金额</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>赠分原因</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsManualBonusOpen(false)}>
                  取消
                </Button>
                <Button type="submit">确认赠分</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminBonusManagement;
