
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Copy, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock API data
const merchantApiInfo = {
  merchantId: "M1234567890",
  apiKey: "APK_2c5f8d3a7b9e1c4f6d2a5b8e3c9f7d2a",
  secretKey: "a8d3f7c2e9b5a6d1c8e3b7f9a2d5c8e3",
  callbackUrl: "https://api.example.com/callback",
  ipWhitelist: ["192.168.1.1", "10.0.0.1", "172.16.0.1"]
};

// Mock demo downloads
const demoDownloads = [
  { name: "Java SDK", language: "Java", url: "#", icon: "☕" },
  { name: ".NET SDK", language: ".NET", url: "#", icon: "🔷" },
  { name: "PHP SDK", language: "PHP", url: "#", icon: "🐘" },
  { name: "Node.js SDK", language: "Node.js", url: "#", icon: "🟩" },
  { name: "Go SDK", language: "Go", url: "#", icon: "🔵" },
  { name: "Python SDK", language: "Python", url: "#", icon: "🐍" }
];

const MerchantApi: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'zh' | 'en'>('zh');
  const { toast } = useToast();

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "复制成功",
      description: `${label}已复制到剪贴板`
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">API管理</h1>
        <p className="text-muted-foreground">管理API接口、密钥和开发文档</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* API Key Information */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle>API凭据</CardTitle>
            <CardDescription>
              您的API密钥和配置信息
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="text-sm font-medium">商户ID</div>
              <div className="flex items-center justify-between rounded-md border p-2">
                <code className="text-sm">{merchantApiInfo.merchantId}</code>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleCopy(merchantApiInfo.merchantId, "商户ID")}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="text-sm font-medium">API Key</div>
              <div className="flex items-center justify-between rounded-md border p-2">
                <code className="text-sm">{merchantApiInfo.apiKey}</code>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleCopy(merchantApiInfo.apiKey, "API Key")}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="text-sm font-medium">Secret Key</div>
              <div className="flex items-center justify-between rounded-md border p-2">
                <code className="text-sm">{merchantApiInfo.secretKey}</code>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleCopy(merchantApiInfo.secretKey, "Secret Key")}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="text-sm font-medium">回调URL</div>
              <div className="flex items-center justify-between rounded-md border p-2">
                <code className="text-sm">{merchantApiInfo.callbackUrl}</code>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleCopy(merchantApiInfo.callbackUrl, "回调URL")}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium">IP白名单</div>
              <div className="rounded-md border p-2">
                {merchantApiInfo.ipWhitelist.map((ip, index) => (
                  <div key={index} className="flex items-center justify-between py-1">
                    <code className="text-sm">{ip}</code>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleCopy(ip, "IP地址")}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* API Documentation */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle>API文档</CardTitle>
            <CardDescription>
              接口文档和开发指南
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs 
              defaultValue={activeTab} 
              className="w-full" 
              onValueChange={(value) => setActiveTab(value as 'zh' | 'en')}
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="zh">中文文档</TabsTrigger>
                <TabsTrigger value="en">English Docs</TabsTrigger>
              </TabsList>
              
              <TabsContent value="zh" className="space-y-4 pt-4">
                <div className="rounded-md bg-muted p-4">
                  <h3 className="font-medium mb-2">API接入文档 (中文版)</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    详细的API接入文档，包括接口定义、参数说明、请求示例和错误代码。
                  </p>
                  <Button>
                    在线查看文档
                  </Button>
                </div>
                
                <div className="rounded-md border p-4">
                  <h3 className="font-medium mb-2">接入流程</h3>
                  <ol className="list-decimal list-inside text-sm space-y-2 text-muted-foreground">
                    <li>创建商户账号并获取API凭据</li>
                    <li>配置IP白名单和回调地址</li>
                    <li>下载适合您技术栈的SDK</li>
                    <li>根据文档集成API接口</li>
                    <li>进行测试和验证</li>
                    <li>正式上线</li>
                  </ol>
                </div>
              </TabsContent>
              
              <TabsContent value="en" className="space-y-4 pt-4">
                <div className="rounded-md bg-muted p-4">
                  <h3 className="font-medium mb-2">API Documentation (English)</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Detailed API integration documentation, including interface definitions, parameter descriptions, request examples, and error codes.
                  </p>
                  <Button>
                    View Documentation Online
                  </Button>
                </div>
                
                <div className="rounded-md border p-4">
                  <h3 className="font-medium mb-2">Integration Process</h3>
                  <ol className="list-decimal list-inside text-sm space-y-2 text-muted-foreground">
                    <li>Create merchant account and obtain API credentials</li>
                    <li>Configure IP whitelist and callback URL</li>
                    <li>Download SDK suitable for your tech stack</li>
                    <li>Integrate API interfaces according to documentation</li>
                    <li>Test and verify</li>
                    <li>Launch to production</li>
                  </ol>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      
      {/* SDK Downloads */}
      <Card>
        <CardHeader>
          <CardTitle>接入Demo下载</CardTitle>
          <CardDescription>
            各种编程语言的SDK和示例代码
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {demoDownloads.map((demo, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="bg-muted p-2 flex items-center space-x-2">
                  <div className="text-2xl">{demo.icon}</div>
                  <div className="font-medium">{demo.name}</div>
                </div>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground mb-4">
                    使用{demo.language}语言的接入示例和SDK
                  </p>
                  <Button className="w-full" variant="outline">
                    <Download className="mr-2 h-4 w-4" /> 
                    下载SDK
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MerchantApi;
