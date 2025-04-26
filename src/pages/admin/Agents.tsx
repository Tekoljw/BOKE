import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { Agent } from '@/types';
import { LoadMore } from "@/components/ui/load-more";

const AdminAgents: React.FC = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [formData, setFormData] = useState<Partial<Agent>>({
    username: "",
    email: "",
    commissionRate: 0,
  });
  const [agents, setAgents] = useState<Agent[]>([
    { 
      id: '1', 
      username: 'topagent', 
      role: 'agent', 
      email: 'topagent@example.com', 
      status: 'active', 
      createdAt: '2023-12-01', 
      commissionRate: 30, 
      totalMerchants: 25,
      totalCommission: 45000,
      pendingCommission: 12500
    },
    { 
      id: '2', 
      username: 'goldagent', 
      role: 'agent', 
      email: 'goldagent@example.com', 
      status: 'active', 
      createdAt: '2024-01-15', 
      commissionRate: 25, 
      totalMerchants: 18,
      totalCommission: 32000,
      pendingCommission: 8000
    },
    { 
      id: '3', 
      username: 'silver_agent', 
      role: 'agent', 
      email: 'silver@example.com', 
      status: 'inactive', 
      createdAt: '2024-02-10', 
      commissionRate: 20, 
      totalMerchants: 12,
      totalCommission: 18000,
      pendingCommission: 4500
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const filteredAgents = agents.filter(agent => 
    agent.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'commissionRate' ? parseFloat(value) : value,
    });
  };

  const handleAdd = () => {
    setFormData({
      username: "",
      email: "",
      commissionRate: 20,
    });
    setIsEditMode(false);
    setIsDialogOpen(true);
  };

  const handleEdit = (agent: Agent) => {
    setSelectedAgent(agent);
    setFormData({
      username: agent.username,
      email: agent.email,
      commissionRate: agent.commissionRate,
    });
    setIsEditMode(true);
    setIsDialogOpen(true);
  };

  const handleToggleStatus = (id: string, currentStatus: 'active' | 'inactive' | 'frozen') => {
    const newStatus = currentStatus === 'active' ? 'frozen' as const : 'active' as const;
    const updatedAgents = agents.map(agent => 
      agent.id === id ? { ...agent, status: newStatus } : agent
    );
    setAgents(updatedAgents);
    
    toast({
      title: `代理商状态已更新`,
      description: `代理商已${newStatus === 'active' ? '启用' : '冻结'}`,
    });
  };

  const handleDelete = (id: string) => {
    const updatedAgents = agents.filter(agent => agent.id !== id);
    setAgents(updatedAgents);
    
    toast({
      title: "代理商已删除",
      description: "代理商账号已成功删除",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditMode && selectedAgent) {
      const updatedAgents = agents.map(agent => 
        agent.id === selectedAgent.id 
          ? { 
              ...agent, 
              username: formData.username || agent.username, 
              email: formData.email || agent.email,
              commissionRate: formData.commissionRate !== undefined ? formData.commissionRate : agent.commissionRate
            } 
          : agent
      );
      setAgents(updatedAgents);
      
      toast({
        title: "代理商已更新",
        description: "代理商信息已成功更新",
      });
    } else {
      const newAgent: Agent = {
        id: `${agents.length + 1}`,
        username: formData.username || '',
        email: formData.email || '',
        role: 'agent',
        status: 'active',
        createdAt: new Date().toISOString().split('T')[0],
        commissionRate: formData.commissionRate || 20,
        totalMerchants: 0,
        totalCommission: 0,
        pendingCommission: 0
      };
      
      setAgents([...agents, newAgent]);
      
      toast({
        title: "代理商已添加",
        description: "新代理商已成功添加到系统",
      });
    }
    
    setIsDialogOpen(false);
  };

  const handleLoadMore = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">代理商管理</h1>
          <p className="text-muted-foreground">管理平台代理商账号和佣金政策</p>
        </div>
        <Button onClick={handleAdd}>添加代理商</Button>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>代理商列表</CardTitle>
          <CardDescription>
            平台目前共有 {agents.length} 个代理商账号
          </CardDescription>
          <div className="mt-2">
            <Input 
              placeholder="搜索代理商..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>用户名</TableHead>
                <TableHead>电子邮件</TableHead>
                <TableHead>佣金比例</TableHead>
                <TableHead>商户数量</TableHead>
                <TableHead>总佣金</TableHead>
                <TableHead>未结佣金</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>注册日期</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAgents.map((agent) => (
                <TableRow key={agent.id} className="table-row-hover">
                  <TableCell className="font-medium">{agent.username}</TableCell>
                  <TableCell>{agent.email}</TableCell>
                  <TableCell>{agent.commissionRate}%</TableCell>
                  <TableCell>{agent.totalMerchants}</TableCell>
                  <TableCell>¥{agent.totalCommission.toLocaleString()}</TableCell>
                  <TableCell>¥{agent.pendingCommission.toLocaleString()}</TableCell>
                  <TableCell>
                    <span className={agent.status === 'active' ? 'badge-active' : 'badge-inactive'}>
                      {agent.status === 'active' ? '正常' : '已冻结'}
                    </span>
                  </TableCell>
                  <TableCell>{agent.createdAt}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(agent)}>
                        编辑
                      </Button>
                      <Button 
                        size="sm" 
                        variant={agent.status === 'active' ? "destructive" : "default"}
                        onClick={() => handleToggleStatus(agent.id, agent.status)}
                      >
                        {agent.status === 'active' ? '冻结' : '启用'}
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(agent.id)}>
                        删除
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              
              {filteredAgents.length === 0 && (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-4">
                    没有找到匹配的代理商
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <LoadMore onLoadMore={handleLoadMore} loading={isLoading} />
        </CardContent>
      </Card>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>
                {isEditMode ? '编辑代理商' : '添加代理商'}
              </DialogTitle>
              <DialogDescription>
                {isEditMode 
                  ? '修改代理商信息和佣金政策' 
                  : '填写以下信息添加新的代理商账号'}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label htmlFor="username" className="text-sm font-medium">用户名</label>
                <Input
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">电子邮件</label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="commissionRate" className="text-sm font-medium">佣金比例 (%)</label>
                <Input
                  id="commissionRate"
                  name="commissionRate"
                  type="number"
                  min="1"
                  max="50"
                  value={formData.commissionRate}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                取消
              </Button>
              <Button type="submit">
                {isEditMode ? '保存' : '添加'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminAgents;
