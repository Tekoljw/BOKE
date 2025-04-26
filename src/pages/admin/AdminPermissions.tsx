import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, UserCheck, UserX, PlusCircle, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

const mockUsers = [
  { 
    id: 'admin1', 
    name: '管理员1', 
    role: 'admin', 
    permissions: { 
      merchants: ['view', 'edit', 'create', 'delete'],
      agents: ['view', 'edit', 'create', 'delete'],
      reports: ['view', 'export'],
      winControl: ['view', 'edit'],
      system: ['view', 'edit'],
    },
    lastLogin: '2024-04-26 09:15:22',
    status: 'active'
  },
  { 
    id: 'admin2', 
    name: '管理员2', 
    role: 'admin', 
    permissions: { 
      merchants: ['view', 'edit'],
      agents: ['view'],
      reports: ['view', 'export'],
      winControl: [],
      system: [],
    },
    lastLogin: '2024-04-25 14:30:12',
    status: 'active'
  },
  { 
    id: 'auditor1', 
    name: '审计员1', 
    role: 'auditor', 
    permissions: { 
      merchants: ['view'],
      agents: ['view'],
      reports: ['view', 'export'],
      winControl: [],
      system: [],
    },
    lastLogin: '2024-04-24 16:45:38',
    status: 'inactive'
  },
];

const permissionSections = [
  { 
    id: 'merchants', 
    name: '商户管理', 
    permissions: ['view', 'create', 'edit', 'delete'] 
  },
  { 
    id: 'agents', 
    name: '代理管理', 
    permissions: ['view', 'create', 'edit', 'delete'] 
  },
  { 
    id: 'reports', 
    name: '报表管理', 
    permissions: ['view', 'export'] 
  },
  { 
    id: 'winControl', 
    name: '输赢控制', 
    permissions: ['view', 'edit'] 
  },
  { 
    id: 'system', 
    name: '系统设置', 
    permissions: ['view', 'edit'] 
  },
];

const permissionLabels: Record<string, string> = {
  'view': '查看',
  'create': '创建',
  'edit': '编辑',
  'delete': '删除',
  'export': '导出'
};

const AdminPermissions: React.FC = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState(mockUsers);
  const [selectedUser, setSelectedUser] = useState(mockUsers[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isNewAccountDialogOpen, setIsNewAccountDialogOpen] = useState(false);
  const [newAccountForm, setNewAccountForm] = useState({
    name: '',
    username: '',
    role: 'admin',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const filteredUsers = searchTerm 
    ? users.filter(u => u.name.toLowerCase().includes(searchTerm.toLowerCase()) || u.id.toLowerCase().includes(searchTerm.toLowerCase()))
    : users;

  const handleUserSelect = (userId: string) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      setSelectedUser(user);
    }
  };

  const handlePermissionChange = (section: string, permission: string, checked: boolean) => {
    setSelectedUser(prevUser => {
      const updatedPermissions = {...prevUser.permissions};
      
      if (checked) {
        if (!updatedPermissions[section].includes(permission)) {
          updatedPermissions[section] = [...updatedPermissions[section], permission];
        }
      } else {
        updatedPermissions[section] = updatedPermissions[section].filter(p => p !== permission);
      }
      
      return {
        ...prevUser,
        permissions: updatedPermissions
      };
    });
  };

  const handleStatusToggle = (userId: string) => {
    setUsers(prevUsers => prevUsers.map(user => {
      if (user.id === userId) {
        const newStatus = user.status === 'active' ? 'inactive' : 'active';
        
        if (selectedUser.id === userId) {
          setSelectedUser({...selectedUser, status: newStatus});
        }
        
        return {...user, status: newStatus};
      }
      return user;
    }));
  };

  const handleSavePermissions = () => {
    setUsers(prevUsers => prevUsers.map(user => {
      if (user.id === selectedUser.id) {
        return {...selectedUser};
      }
      return user;
    }));
    
    toast({
      title: "权限更新成功",
      description: `账号 ${selectedUser.name} 的权限已更新`,
    });
  };

  const handleNewAccount = () => {
    if (newAccountForm.password !== newAccountForm.confirmPassword) {
      toast({
        title: "密码不匹配",
        description: "请确认两次输入的密码相同",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "账号创建成功",
      description: `账号 ${newAccountForm.name} 已成功创建`,
    });
    setIsNewAccountDialogOpen(false);
    setNewAccountForm({
      name: '',
      username: '',
      role: 'admin',
      email: '',
      password: '',
      confirmPassword: '',
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">账号权限管理</h1>
        <p className="text-muted-foreground">管理系统账号和权限设置</p>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <div className="mb-6">
            <div className="flex gap-4 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="搜索账号..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button onClick={() => setIsNewAccountDialogOpen(true)}>
                <PlusCircle className="mr-2 h-4 w-4" />
                新建账号
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-medium mb-4">账号列表</h3>
              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>账号</TableHead>
                      <TableHead>角色</TableHead>
                      <TableHead>状态</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow 
                        key={user.id}
                        className={`cursor-pointer ${selectedUser.id === user.id ? 'bg-muted' : ''}`}
                        onClick={() => handleUserSelect(user.id)}
                      >
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.role === 'admin' ? '管理员' : '审计员'}</TableCell>
                        <TableCell>
                          {user.status === 'active' ? (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              <span className="mr-1 h-1.5 w-1.5 rounded-full bg-green-500"></span>
                              已启用
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              <span className="mr-1 h-1.5 w-1.5 rounded-full bg-red-500"></span>
                              已禁用
                            </span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            <div className="md:col-span-2">
              {selectedUser && (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium">账号详情</h3>
                    <div className="space-x-2">
                      <Button 
                        variant={selectedUser.status === 'active' ? 'destructive' : 'outline'}
                        size="sm"
                        onClick={() => handleStatusToggle(selectedUser.id)}
                      >
                        {selectedUser.status === 'active' ? (
                          <>
                            <UserX className="mr-1 h-4 w-4" />
                            禁用账号
                          </>
                        ) : (
                          <>
                            <UserCheck className="mr-1 h-4 w-4" />
                            启用账号
                          </>
                        )}
                      </Button>
                      <Button 
                        variant="default"
                        size="sm"
                        onClick={handleSavePermissions}
                      >
                        <Save className="mr-1 h-4 w-4" />
                        保存权限
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <p className="text-sm font-medium">账号ID</p>
                      <p className="text-sm text-muted-foreground">{selectedUser.id}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">账号名称</p>
                      <p className="text-sm text-muted-foreground">{selectedUser.name}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">角色类型</p>
                      <p className="text-sm text-muted-foreground">{selectedUser.role === 'admin' ? '管理员' : '审计员'}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">最后登录</p>
                      <p className="text-sm text-muted-foreground">{selectedUser.lastLogin}</p>
                    </div>
                  </div>

                  <div className="border rounded-md p-4">
                    <h3 className="font-medium mb-4">权限设置</h3>
                    
                    <div className="space-y-6">
                      {permissionSections.map((section) => (
                        <div key={section.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                          <h4 className="font-medium mb-2">{section.name}</h4>
                          <div className="flex flex-wrap gap-4">
                            {section.permissions.map((permission) => (
                              <div key={permission} className="flex items-center space-x-2">
                                <Checkbox 
                                  id={`${section.id}-${permission}`}
                                  checked={selectedUser.permissions[section.id]?.includes(permission) || false}
                                  onCheckedChange={(checked) => {
                                    if (typeof checked === 'boolean') {
                                      handlePermissionChange(section.id, permission, checked);
                                    }
                                  }}
                                />
                                <label
                                  htmlFor={`${section.id}-${permission}`}
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  {permissionLabels[permission]}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isNewAccountDialogOpen} onOpenChange={setIsNewAccountDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>创建新账号</DialogTitle>
            <DialogDescription>
              创建新的系统管理账号
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="name">账号名称</Label>
                <Input
                  id="name"
                  value={newAccountForm.name}
                  onChange={(e) => setNewAccountForm(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="username">登录账号</Label>
                <Input
                  id="username"
                  value={newAccountForm.username}
                  onChange={(e) => setNewAccountForm(prev => ({ ...prev, username: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="email">电子邮箱</Label>
                <Input
                  id="email"
                  type="email"
                  value={newAccountForm.email}
                  onChange={(e) => setNewAccountForm(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>
              <div>
                <Label>角色类型</Label>
                <Tabs defaultValue={newAccountForm.role} onValueChange={(value) => setNewAccountForm(prev => ({ ...prev, role: value }))}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="admin">管理员</TabsTrigger>
                    <TabsTrigger value="auditor">审计员</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              <div>
                <Label htmlFor="password">密码</Label>
                <Input
                  id="password"
                  type="password"
                  value={newAccountForm.password}
                  onChange={(e) => setNewAccountForm(prev => ({ ...prev, password: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="confirmPassword">确认密码</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={newAccountForm.confirmPassword}
                  onChange={(e) => setNewAccountForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewAccountDialogOpen(false)}>取消</Button>
            <Button onClick={handleNewAccount}>创建账号</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPermissions;
