import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, Pencil, Trash2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface Agent {
  id: string;
  agentId: string;  // Add agentId to interface
  name: string;
  username: string;
  email: string;
  usdtBalance: number;
  pointBalance: number;
  bonusBalance: number;
  status: 'active' | 'inactive';
  createdAt: string;
}

const mockAgents: Agent[] = [
  {
    id: '1',
    agentId: 'A00001',  // Add agentId to mock data
    name: '代理商1',
    username: 'agent1',
    email: 'agent1@example.com',
    usdtBalance: 10000,
    pointBalance: 50000,
    bonusBalance: 1000,
    status: 'active',
    createdAt: '2023-01-01',
  },
  {
    id: '2',
    agentId: 'A00002',
    name: '代理商2',
    username: 'agent2',
    email: 'agent2@example.com',
    usdtBalance: 15000,
    pointBalance: 75000,
    bonusBalance: 1500,
    status: 'active',
    createdAt: '2023-02-15',
  },
  {
    id: '3',
    agentId: 'A00003',
    name: '代理商3',
    username: 'agent3',
    email: 'agent3@example.com',
    usdtBalance: 5000,
    pointBalance: 25000,
    bonusBalance: 500,
    status: 'inactive',
    createdAt: '2023-03-20',
  },
  {
    id: '4',
    agentId: 'A00004',
    name: '代理商4',
    username: 'agent4',
    email: 'agent4@example.com',
    usdtBalance: 8000,
    pointBalance: 40000,
    bonusBalance: 800,
    status: 'active',
    createdAt: '2023-04-10',
  },
  {
    id: '5',
    agentId: 'A00005',
    name: '代理商5',
    username: 'agent5',
    email: 'agent5@example.com',
    usdtBalance: 12000,
    pointBalance: 60000,
    bonusBalance: 1200,
    status: 'inactive',
    createdAt: '2023-05-01',
  },
];

const AdminAgents: React.FC = () => {
  const { toast } = useToast();
  const [agents, setAgents] = useState<Agent[]>(mockAgents);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const filteredAgents = agents.filter(agent => 
    agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.agentId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddAgent = () => {
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: '密码不匹配',
        description: '请确认两次输入的密码相同',
        variant: 'destructive',
      });
      return;
    }
    
    const newAgent: Agent = {
      id: `${Date.now()}`,
      agentId: `A${Date.now()}`,
      name: formData.name,
      username: formData.username,
      email: formData.email,
      usdtBalance: 0,
      pointBalance: 0,
      bonusBalance: 0,
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0],
    };
    
    setAgents(prev => [...prev, newAgent]);
    toast({
      title: '添加成功',
      description: `代理商 ${formData.name} 已成功添加`,
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

  const handleEditAgent = () => {
    if (!selectedAgent) return;
    
    setAgents(prev => 
      prev.map(a => 
        a.id === selectedAgent.id 
          ? { 
              ...a, 
              name: formData.name || a.name,
              username: formData.username || a.username,
              email: formData.email || a.email,
            } 
          : a
      )
    );
    
    toast({
      title: '更新成功',
      description: `代理商 ${selectedAgent.name} 已成功更新`,
    });
    
    setIsEditDialogOpen(false);
  };

  const handleDeleteAgent = (id: string) => {
    if (confirm('确定要删除此代理商吗？')) {
      setAgents(prev => prev.filter(a => a.id !== id));
      toast({
        title: '删除成功',
        description: '代理商已成功删除',
      });
    }
  };

  const openEditDialog = (agent: Agent) => {
    setSelectedAgent(agent);
    setFormData({
      name: agent.name,
      username: agent.username,
      email: agent.email,
      password: '',
      confirmPassword: '',
    });
    setIsEditDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">代理商管理</h1>
        <p className="text-muted-foreground">管理平台代理商账号和信息</p>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="w-64">
          <Input
            placeholder="搜索代理商名称或账号..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          添加代理商
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>代理商列表</CardTitle>
          <CardDescription>平台所有代理商账号列表</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>代理商ID</TableHead>
                <TableHead>代理商名称</TableHead>
                <TableHead>账号</TableHead>
                <TableHead>USDT余额</TableHead>
                <TableHead>分数余额</TableHead>
                <TableHead>赠分余额</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>创建日期</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAgents.map((agent) => (
                <TableRow key={agent.id}>
                  <TableCell>{agent.agentId}</TableCell>
                  <TableCell className="font-medium">{agent.name}</TableCell>
                  <TableCell>{agent.username}</TableCell>
                  <TableCell className="text-blue-600 font-medium">{agent.usdtBalance}</TableCell>
                  <TableCell className="text-green-600 font-medium">{agent.pointBalance}</TableCell>
                  <TableCell className="text-amber-600 font-medium">{agent.bonusBalance}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      agent.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {agent.status === 'active' ? '启用' : '禁用'}
                    </span>
                  </TableCell>
                  <TableCell>{agent.createdAt}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={() => openEditDialog(agent)}
                      >
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">编辑</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8 w-8 p-0 text-red-500 hover:text-red-600"
                        onClick={() => handleDeleteAgent(agent.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">删除</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredAgents.length === 0 && (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8">
                    没有找到匹配的代理商
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
            <DialogTitle>添加新代理商</DialogTitle>
            <DialogDescription>
              创建新的代理商账号以访问平台服务
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="name">代理商名称</Label>
                <Input 
                  id="name" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleInputChange} 
                  placeholder="输入代理商名称" 
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
            <Button onClick={handleAddAgent}>创建代理商</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>编辑代理商信息</DialogTitle>
            <DialogDescription>
              修改代理商账号信息
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="edit-name">代理商名称</Label>
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
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>取消</Button>
            <Button onClick={handleEditAgent}>保存更改</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminAgents;
