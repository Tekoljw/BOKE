
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, UserCheck, UserX, PlusCircle, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data for user accounts
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

// Permission sections
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

  // Filter users based on search term
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
        // Add permission
        if (!updatedPermissions[section].includes(permission)) {
          updatedPermissions[section] = [...updatedPermissions[section], permission];
        }
      } else {
        // Remove permission
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
        
        // Also update selected user if it's the one being toggled
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
              <Button>
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
    </div>
  );
};

export default AdminPermissions;
