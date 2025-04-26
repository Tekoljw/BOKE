
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, FileCode, Link as LinkIcon } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

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
