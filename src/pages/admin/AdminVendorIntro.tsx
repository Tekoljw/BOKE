
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Search, Upload, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data for vendors
const mockVendors = Array.from({ length: 10 }, (_, i) => ({
  id: `v${i + 1}`,
  name: `厂商 ${i + 1}`,
  logo: `/placeholder.svg`,
  description: `这是厂商${i + 1}的详细介绍。该厂商提供各种类型的游戏，包括老虎机、棋牌和真人游戏。他们的游戏以高质量的图形和流畅的游戏体验而闻名。`,
  website: `https://vendor${i + 1}.example.com`,
  foundedYear: 2000 + i,
  headquarters: ['中国', '菲律宾', '马来西亚', '新加坡'][i % 4],
  featuredGames: [`游戏A-${i}`, `游戏B-${i}`, `游戏C-${i}`]
}));

const AdminVendorIntro: React.FC = () => {
  const { toast } = useToast();
  const [selectedVendor, setSelectedVendor] = useState(mockVendors[0]?.id);
  const [searchTerm, setSearchTerm] = useState('');
  const [editData, setEditData] = useState(mockVendors[0]);

  // Filter vendors based on search term
  const filteredVendors = searchTerm 
    ? mockVendors.filter(v => v.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : mockVendors;

  const handleVendorSelect = (vendorId: string) => {
    const vendor = mockVendors.find(v => v.id === vendorId);
    setSelectedVendor(vendorId);
    if (vendor) {
      setEditData(vendor);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Here you would typically save the data to your backend
    toast({
      title: "保存成功",
      description: `厂商 ${editData.name} 的介绍已更新`,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">厂商介绍配置</h1>
        <p className="text-muted-foreground">管理游戏厂商介绍信息</p>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <div className="mb-6">
            <div className="flex gap-4 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="搜索厂商..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          <Tabs defaultValue={selectedVendor} onValueChange={handleVendorSelect}>
            <TabsList className="w-full flex-wrap h-auto justify-start">
              {filteredVendors.map((vendor) => (
                <TabsTrigger key={vendor.id} value={vendor.id}>
                  {vendor.name}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={selectedVendor} className="pt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">厂商名称</label>
                    <Input 
                      name="name"
                      value={editData.name} 
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">官方网站</label>
                    <Input 
                      name="website"
                      value={editData.website} 
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">成立年份</label>
                      <Input 
                        name="foundedYear"
                        type="number" 
                        value={editData.foundedYear} 
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">总部所在地</label>
                      <Input 
                        name="headquarters"
                        value={editData.headquarters} 
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">代表游戏</label>
                    <Input 
                      name="featuredGames"
                      value={editData.featuredGames.join(', ')} 
                      onChange={(e) => {
                        const value = e.target.value;
                        setEditData(prev => ({
                          ...prev,
                          featuredGames: value ? value.split(',').map(g => g.trim()) : []
                        }));
                      }}
                    />
                    <p className="text-xs text-muted-foreground mt-1">多个游戏名称请用逗号分隔</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Logo上传</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center">
                      <img src={editData.logo} alt="Logo" className="w-32 h-32 object-contain mb-4" />
                      <Button variant="outline">
                        <Upload className="mr-2 h-4 w-4" />
                        上传新Logo
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">厂商介绍</label>
                    <Textarea 
                      name="description"
                      value={editData.description} 
                      onChange={handleInputChange}
                      rows={6}
                    />
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <Button variant="outline" className="mr-2">
                  重置
                </Button>
                <Button onClick={handleSave}>
                  <Save className="mr-2 h-4 w-4" />
                  保存更改
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminVendorIntro;
