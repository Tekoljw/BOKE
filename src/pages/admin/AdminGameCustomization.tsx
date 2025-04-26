
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ImagePlus, Plus, Trash2, Upload, PenLine } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface GameLogo {
  size: string;
  url: string;
}

interface CustomMerchant {
  id: string;
  merchantId: string;
  domains: string[];
  gamePath: string;
  gameName: string;
  logos: GameLogo[];
  createdAt: string;
  updatedAt: string;
}

// Mock data for demonstration
const mockCustomMerchants: CustomMerchant[] = [
  {
    id: "1",
    merchantId: "MERCH001",
    domains: ["game1.example.com", "game1-alt.example.com"],
    gamePath: "/custom/path1",
    gameName: "超级棋牌",
    logos: [],
    createdAt: "2024-04-20",
    updatedAt: "2024-04-25"
  },
  {
    id: "2",
    merchantId: "MERCH002",
    domains: ["game2.example.com"],
    gamePath: "/custom/path2",
    gameName: "欢乐棋牌",
    logos: [],
    createdAt: "2024-04-22",
    updatedAt: "2024-04-22"
  }
];

const AdminGameCustomization: React.FC = () => {
  const [domains, setDomains] = React.useState<string[]>(['']);
  const [logos, setLogos] = React.useState<GameLogo[]>([]);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [editingMerchant, setEditingMerchant] = React.useState<CustomMerchant | null>(null);
  const { toast } = useToast();

  const handleAddDomain = () => {
    setDomains([...domains, '']);
  };

  const handleDomainChange = (index: number, value: string) => {
    const newDomains = [...domains];
    newDomains[index] = value;
    setDomains(newDomains);
  };

  const handleRemoveDomain = (index: number) => {
    const newDomains = domains.filter((_, i) => i !== index);
    setDomains(newDomains);
  };

  const handleLogoUpload = async (size: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Here you would typically upload the file to your server
    const url = URL.createObjectURL(file);
    
    setLogos(prev => {
      const existing = prev.find(logo => logo.size === size);
      if (existing) {
        return prev.map(logo => 
          logo.size === size ? { ...logo, url } : logo
        );
      }
      return [...prev, { size, url }];
    });

    toast({
      title: "Logo已上传",
      description: `${size} 规格的logo上传成功`,
    });
  };

  const handleEditMerchant = (merchant: CustomMerchant) => {
    setEditingMerchant(merchant);
    setDomains(merchant.domains);
    setLogos(merchant.logos);
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "保存成功",
      description: "商户定制配置已更新",
    });
    
    setIsDialogOpen(false);
    setEditingMerchant(null);
    setDomains(['']);
    setLogos([]);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">客户端定制商户</h1>
        <p className="text-muted-foreground">管理商户专属的客户端配置</p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>定制商户列表</CardTitle>
            <CardDescription>
              当前运营中的定制商户配置
            </CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => {
                setEditingMerchant(null);
                setDomains(['']);
                setLogos([]);
              }}>
                <Plus className="h-4 w-4 mr-2" />
                新增定制商户
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingMerchant ? '编辑定制商户' : '新增定制商户'}</DialogTitle>
                <DialogDescription>
                  配置商户专属客户端参数
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="merchantId">商户ID</Label>
                    <Input 
                      id="merchantId" 
                      placeholder="请输入商户ID"
                      defaultValue={editingMerchant?.merchantId}
                    />
                  </div>

                  <div>
                    <Label htmlFor="gamePath">游戏线路</Label>
                    <Input 
                      id="gamePath" 
                      placeholder="请输入游戏线路"
                      defaultValue={editingMerchant?.gamePath}
                    />
                  </div>

                  <div>
                    <Label htmlFor="gameName">游戏名称</Label>
                    <Input 
                      id="gameName" 
                      placeholder="请输入游戏名称"
                      defaultValue={editingMerchant?.gameName}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>前端域名</Label>
                    {domains.map((domain, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={domain}
                          onChange={(e) => handleDomainChange(index, e.target.value)}
                          placeholder="请输入域名"
                        />
                        {domains.length > 1 && (
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            onClick={() => handleRemoveDomain(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleAddDomain}
                      className="mt-2"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      添加域名
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <Label>游戏Logo</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {['大尺寸 (256x256)', '中尺寸 (128x128)', '小尺寸 (64x64)'].map((size) => (
                        <Card key={size}>
                          <CardContent className="p-4 space-y-4">
                            <div className="text-sm font-medium">{size}</div>
                            <div className="aspect-square border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center relative overflow-hidden">
                              {logos.find(logo => logo.size === size) ? (
                                <img 
                                  src={logos.find(logo => logo.size === size)?.url} 
                                  alt={`${size} logo`}
                                  className="w-full h-full object-contain"
                                />
                              ) : (
                                <ImagePlus className="h-8 w-8 text-gray-400" />
                              )}
                              <input
                                type="file"
                                accept="image/*"
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                onChange={(e) => handleLogoUpload(size, e)}
                              />
                            </div>
                            <div className="text-xs text-center text-muted-foreground">
                              点击上传或拖拽图片
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>

                <DialogFooter>
                  <Button type="submit">
                    <Save className="h-4 w-4 mr-2" />
                    保存配置
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>商户ID</TableHead>
                <TableHead>游戏名称</TableHead>
                <TableHead>游戏线路</TableHead>
                <TableHead>前端域名</TableHead>
                <TableHead>更新时间</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockCustomMerchants.map((merchant) => (
                <TableRow key={merchant.id}>
                  <TableCell>{merchant.merchantId}</TableCell>
                  <TableCell>{merchant.gameName}</TableCell>
                  <TableCell>{merchant.gamePath}</TableCell>
                  <TableCell>{merchant.domains.join(', ')}</TableCell>
                  <TableCell>{merchant.updatedAt}</TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleEditMerchant(merchant)}
                    >
                      <PenLine className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminGameCustomization;
