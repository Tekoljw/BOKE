import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, Pencil, Trash2, Shield } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { LoadMore } from "@/components/ui/load-more";

interface Merchant {
  id: string;
  merchantId: string;
  name: string;
  username: string;
  email: string;
  usdtBalance: number;
  pointBalance: number;
  bonusBalance: number;
  status: 'active' | 'inactive';
  whitelistedIps: string[];
  createdAt: string;
  agentId: string;
}

const mockMerchants: Merchant[] = [
  {
    id: '1',
    merchantId: 'M00001',
    name: '波克棋牌',
    username: 'bokeqipai',
    email: 'boke@example.com',
    usdtBalance: 50000,
    pointBalance: 150000,
    bonusBalance: 5000,
    status: 'active',
    whitelistedIps: ['192.168.1.1', '192.168.1.2'],
    createdAt: '2023-01-15',
    agentId: '1',
  },
  {
    id: '2',
    merchantId: 'M00002',
    name: '开元棋牌',
    username: 'kaiyuan',
    email: 'kaiyuan@example.com',
    usdtBalance: 30000,
    pointBalance: 80000,
    bonusBalance: 2000,
    status: 'active',
    whitelistedIps: ['192.168.2.1'],
    createdAt: '2023-02-20',
    agentId: '2',
  },
  {
    id: '3',
    merchantId: 'M00003',
    name: '乐游棋牌',
    username: 'leyou',
    email: 'leyou@example.com',
    usdtBalance: 25000,
    pointBalance: 60000,
    bonusBalance: 1500,
    status: 'inactive',
    whitelistedIps: [],
    createdAt: '2023-03-10',
    agentId: '3',
  },
];

const AdminMerchants: React.FC = () => {
  const { toast } = useToast();
  const [merchants, setMerchants] = useState<Merchant[]>(mockMerchants);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isWhitelistDialogOpen, setIsWhitelistDialogOpen] = useState(false);
  const [selectedMerchant, setSelectedMerchant] = useState<Merchant | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  const [whitelistIp, setWhitelistIp] = useState('');
  const [selectedAgent, setSelectedAgent] = useState<string>('all');

  const agents = Array.from({ length: 20 }, (_, i) => ({
    id: `${i + 1}`, 
    name: `代理商${i + 1}`
  }));

  const filteredMerchants = merchants.filter(merchant => {
    const matchesSearch = merchant.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      merchant.username.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch && (selectedAgent === 'all' || merchant.agentId === selectedAgent);
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddMerchant = () => {
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: '密码不匹配',
        description: '请确认两次输入的密码相同',
        variant: 'destructive',
      });
      return;
    }
    
    const newMerchant: Merchant = {
      id: `${Date.now()}`,
      merchantId: 'M00004',
      name: formData.name,
      username: formData.username,
      email: formData.email,
      usdtBalance: 0,
      pointBalance: 0,
      bonusBalance: 0,
      status: 'active',
      whitelistedIps: [],
      createdAt: new Date().toISOString().split('T')[0],
      agentId: '1',
    };
    
    setMerchants(prev => [...prev, newMerchant]);
    toast({
      title: '添加成功',
      description: `商户 ${formData.name} 已成功添加`,
    });
    
    setFormData({
      name: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
    setIsAddDialogOpen(false);
  };

  const handleEditMerchant = () => {
    if (!selectedMerchant) return;
    
    setMerchants(prev => 
      prev.map(m => 
        m.id === selectedMerchant.id 
          ? { 
              ...m, 
              name: formData.name || m.name,
              username: formData.username || m.username,
              email: formData.email || m.email,
            } 
          : m
      )
    );
    
    toast({
      title: '更新成功',
      description: `商户 ${selectedMerchant.name} 已成功更新`,
    });
    
    setIsEditDialogOpen(false);
  };

  const handleDeleteMerchant = (id: string) => {
    if (confirm('确定要删除此商户吗？')) {
      setMerchants(prev => prev.filter(m => m.id !== id));
      toast({
        title: '删除成功',
        description: '商户已成功删除',
      });
    }
  };

  const handleAddWhitelistIp = () => {
    if (!selectedMerchant || !whitelistIp) return;
    
    if (selectedMerchant.whitelistedIps.includes(whitelistIp)) {
      toast({
        title: 'IP已存在',
        description: '该IP地址已经在白名单中',
        variant: 'destructive',
      });
      return;
    }
    
    setMerchants(prev => 
      prev.map(m => 
        m.id === selectedMerchant.id 
          ? { 
              ...m, 
              whitelistedIps: [...m.whitelistedIps, whitelistIp] 
            } 
          : m
      )
    );
    
    setWhitelistIp('');
    
    toast({
      title: '添加成功',
      description: `IP ${whitelistIp} 已添加到白名单`,
    });
  };

  const handleRemoveWhitelistIp = (ip: string) => {
    if (!selectedMerchant) return;
    
    setMerchants(prev => 
      prev.map(m => 
        m.id === selectedMerchant.id 
          ? { 
              ...m, 
              whitelistedIps: m.whitelistedIps.filter(i => i !== ip)
            } 
          : m
      )
    );
    
    toast({
      title: '移除成功',
      description: `IP ${ip} 已从白名单移除`,
    });
  };

  const openEditDialog = (merchant: Merchant) => {
    setSelectedMerchant(merchant);
    setFormData({
      name: merchant.name,
      username: merchant.username,
      email: merchant.email,
      password: '',
      confirmPassword: '',
    });
    setIsEditDialogOpen(true);
  };

  const openWhitelistDialog = (merchant: Merchant) => {
    setSelectedMerchant(merchant);
    setIsWhitelistDialogOpen(true);
  };

  const handleLoadMore = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">商户管理</h1>
        <p className="text-muted-foreground">管理平台商户账号、余额和白名单</p>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="w-64">
          <Input
            placeholder="搜索商户名称或账号..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          添加商户
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>商户列表</CardTitle>
          <CardDescription>平台所有商户账号列表</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="mb-6" onValueChange={(value) => setSelectedAgent(value)}>
            <TabsList className="w-full justify-start items-start flex-wrap h-auto gap-2">
              <TabsTrigger value="all" className="ml-0">全部</TabsTrigger>
              {agents.map((agent) => (
                <TabsTrigger key={agent.id} value={agent.id}>
                  {agent.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>商户ID</TableHead>
                <TableHead>商户名</TableHead>
                <TableHead>账号</TableHead>
                <TableHead>USDT余额</TableHead>
                <TableHead>分数余额</TableHead>
                <TableHead>赠分余额</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>白名单</TableHead>
                <TableHead>创建日期</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMerchants.map((merchant) => (
                <TableRow key={merchant.id}>
                  <TableCell>{merchant.merchantId}</TableCell>
                  <TableCell className="font-medium">{merchant.name}</TableCell>
                  <TableCell>{merchant.username}</TableCell>
                  <TableCell className="text-blue-600 font-medium">{merchant.usdtBalance}</TableCell>
                  <TableCell className="text-green-600 font-medium">{merchant.pointBalance}</TableCell>
                  <TableCell className="text-amber-600 font-medium">{merchant.bonusBalance}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      merchant.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {merchant.status === 'active' ? '启用' : '禁用'}
                    </span>
                  </TableCell>
                  <TableCell>{merchant.whitelistedIps.length} 个IP</TableCell>
                  <TableCell>{merchant.createdAt}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={() => openEditDialog(merchant)}
                      >
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">编辑</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={() => openWhitelistDialog(merchant)}
                      >
                        <Shield className="h-4 w-4" />
                        <span className="sr-only">白名单</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8 w-8 p-0 text-red-500 hover:text-red-600"
                        onClick={() => handleDeleteMerchant(merchant.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">删除</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredMerchants.length === 0 && (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8">
                    没有找到匹配的商户
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>添加新商户</DialogTitle>
            <DialogDescription>
              创建新的商户账号以访问平台服务
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="name">商户名称</Label>
                <Input 
                  id="name" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleInputChange} 
                  placeholder="输入商户名称" 
                />
              </div>
              <div>
                <Label htmlFor="username">登录账号</Label>
                <Input 
                  id="username" 
                  name="username" 
                  value={formData.username} 
                  onChange={handleInputChange}
                  placeholder="输入登录账号" 
                />
              </div>
              <div>
                <Label htmlFor="email">电子邮箱</Label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  value={formData.email} 
                  onChange={handleInputChange}
                  placeholder="输入电子邮箱" 
                />
              </div>
              <div>
                <Label htmlFor="password">密码</Label>
                <Input 
                  id="password" 
                  name="password" 
                  type="password" 
                  value={formData.password} 
                  onChange={handleInputChange}
                  placeholder="输入密码" 
                />
              </div>
              <div>
                <Label htmlFor="confirmPassword">确认密码</Label>
                <Input 
                  id="confirmPassword" 
                  name="confirmPassword" 
                  type="password" 
                  value={formData.confirmPassword} 
                  onChange={handleInputChange}
                  placeholder="再次输入密码" 
                />
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>取消</Button>
            <Button onClick={handleAddMerchant}>创建商户</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>编辑商户信息</DialogTitle>
            <DialogDescription>
              修改商户账号信息
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="edit-name">商户名称</Label>
                <Input 
                  id="edit-name" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleInputChange} 
                />
              </div>
              <div>
                <Label htmlFor="edit-username">登录账号</Label>
                <Input 
                  id="edit-username" 
                  name="username" 
                  value={formData.username} 
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="edit-email">电子邮箱</Label>
                <Input 
                  id="edit-email" 
                  name="email" 
                  type="email" 
                  value={formData.email} 
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="edit-status">状态</Label>
                <Tabs defaultValue={selectedMerchant?.status || 'active'} className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="active">启用</TabsTrigger>
                    <TabsTrigger value="inactive">禁用</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>取消</Button>
            <Button onClick={handleEditMerchant}>保存更改</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={isWhitelistDialogOpen} onOpenChange={setIsWhitelistDialogOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>管理白名单IP</DialogTitle>
            <DialogDescription>
              {selectedMerchant?.name} 的IP白名单管理
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="flex items-center gap-2">
              <Input 
                placeholder="输入IP地址" 
                value={whitelistIp} 
                onChange={(e) => setWhitelistIp(e.target.value)}
              />
              <Button onClick={handleAddWhitelistIp}>添加</Button>
            </div>
            
            <div className="border rounded-md p-4 h-64 overflow-y-auto">
              {selectedMerchant?.whitelistedIps.length === 0 ? (
                <p className="text-center text-muted-foreground py-10">
                  尚未添加任何IP到白名单
                </p>
              ) : (
                <ul className="space-y-2">
                  {selectedMerchant?.whitelistedIps.map((ip) => (
                    <li key={ip} className="flex justify-between items-center border-b py-2 last:border-0">
                      <span>{ip}</span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 p-0 text-red-500 hover:text-red-600"
                        onClick={() => handleRemoveWhitelistIp(ip)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          
          <DialogFooter>
            <Button onClick={() => setIsWhitelistDialogOpen(false)}>完成</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <LoadMore 
        onLoadMore={handleLoadMore}
        loading={loading}
        hasMore={hasMore}
      />
    </div>
  );
};

export default AdminMerchants;
