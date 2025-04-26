
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileCode, Link as LinkIcon, Download } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

// Mock data for uploaded demos
const mockDemos = [
  {
    id: 1,
    name: 'PHP Demo SDK',
    size: '2.3MB',
    uploadDate: '2024-04-25'
  },
  {
    id: 2,
    name: 'Java Demo SDK',
    size: '3.1MB',
    uploadDate: '2024-04-24'
  }
];

const AdminApi: React.FC = () => {
  const { toast } = useToast();

  const handleSDKUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      toast({
        title: "Demo SDK已上传",
        description: `成功上传文件: ${files[0].name}`,
      });
    }
  };

  const handleSaveLink = () => {
    toast({
      title: "API文档链接已保存",
      description: "新的API文档链接已成功保存",
    });
  };

  const handleDownload = (demoName: string) => {
    toast({
      title: "开始下载",
      description: `正在下载 ${demoName}`,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">API管理</h1>
        <p className="text-muted-foreground">上传SDK、添加api文档链接</p>
      </div>
      
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>上传Demo SDK</CardTitle>
            <CardDescription>
              上传SDK示例代码，供商户接入参考
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <input
                type="file"
                accept=".zip,.rar,.7z"
                className="hidden"
                id="sdk-upload"
                onChange={handleSDKUpload}
              />
              <label 
                htmlFor="sdk-upload"
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center cursor-pointer hover:border-primary/50 transition-colors"
              >
                <FileCode className="h-12 w-12 text-gray-400 mb-4" />
                <div className="text-center">
                  <p className="text-sm font-medium">点击上传SDK示例代码</p>
                  <p className="text-xs text-gray-500 mt-1">支持 .zip, .rar, .7z 格式</p>
                </div>
              </label>

              <div className="mt-6">
                <h4 className="text-sm font-medium mb-3">已上传的Demo</h4>
                <div className="space-y-2">
                  {mockDemos.map((demo) => (
                    <div 
                      key={demo.id}
                      className="flex items-center justify-between p-3 bg-muted rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <FileCode className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">{demo.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {demo.size} • 上传于 {demo.uploadDate}
                          </p>
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDownload(demo.name)}
                      >
                        <Download className="h-4 w-4 mr-1" />
                        下载
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>API文档链接</CardTitle>
            <CardDescription>
              添加或更新API文档在线链接
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="输入API文档链接"
                    type="url"
                  />
                </div>
                <Button onClick={handleSaveLink}>
                  <LinkIcon className="mr-2 h-4 w-4" />
                  保存链接
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminApi;
