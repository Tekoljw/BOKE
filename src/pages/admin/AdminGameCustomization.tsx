
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ImagePlus, Plus, Trash2, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface GameLogo {
  size: string;
  url: string;
}

interface CustomGame {
  merchantId: string;
  domains: string[];
  gamePath: string;
  gameName: string;
  logos: GameLogo[];
}

const AdminGameCustomization: React.FC = () => {
  const [domains, setDomains] = React.useState<string[]>(['']);
  const [logos, setLogos] = React.useState<GameLogo[]>([]);
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
    // For now, we'll just create a temporary URL
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically submit the form data
    toast({
      title: "保存成功",
      description: "游戏定制配置已更新",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">自研游戏定制</h1>
        <p className="text-muted-foreground">定制游戏仅支持自研游戏</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>游戏定制配置</CardTitle>
          <CardDescription>
            配置商户专属游戏参数
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="merchantId">商户ID</Label>
                <Input id="merchantId" placeholder="请输入商户ID" />
              </div>

              <div>
                <Label htmlFor="gamePath">游戏线路</Label>
                <Input id="gamePath" placeholder="请输入游戏线路" />
              </div>

              <div>
                <Label htmlFor="gameName">游戏名称</Label>
                <Input id="gameName" placeholder="请输入游戏名称" />
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

            <Button type="submit" className="w-full">
              <Upload className="h-4 w-4 mr-2" />
              保存配置
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminGameCustomization;
