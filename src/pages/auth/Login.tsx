
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type UserRole = 'merchant' | 'agent' | 'admin';

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [role, setRole] = useState<UserRole>("merchant");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Navigate based on selected role
      switch(role) {
        case 'admin':
          navigate("/admin");
          break;
        case 'agent':
          navigate("/agent");
          break;
        case 'merchant':
          navigate("/merchant");
          break;
      }
    } catch (err) {
      setError("登录失败，请检查您的用户名和密码");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <img 
            src="/lovable-uploads/f9035fa0-ee25-47a2-b30b-46149ba3914e.png" 
            alt="波克棋牌" 
            className="mx-auto h-16"
          />
          <h1 className="mt-4 text-3xl font-bold text-gray-900">波克棋牌</h1>
          <p className="mt-2 text-gray-600">请登录您的账号</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>账号登录</CardTitle>
            <CardDescription>
              选择您的角色并输入登录信息
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <Tabs defaultValue="merchant" value={role} onValueChange={(value) => setRole(value as UserRole)}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="merchant">商户</TabsTrigger>
                  <TabsTrigger value="agent">代理商</TabsTrigger>
                  <TabsTrigger value="admin">管理员</TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="space-y-2">
                <Label htmlFor="username">用户名</Label>
                <Input
                  id="username"
                  placeholder="请输入用户名"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">密码</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="请输入密码"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              {error && <p className="text-red-500 text-sm">{error}</p>}

              <div className="text-sm text-right">
                <a href="#" className="text-primary hover:text-primary/80">
                  忘记密码?
                </a>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "登录中..." : "登录"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-600">
              还没有账号?{" "}
              <Link to="/register" className="text-primary hover:text-primary/80 font-medium">
                立即注册
              </Link>
            </p>
          </CardFooter>
        </Card>

        <p className="text-xs text-center text-gray-500">
          © 2024 波克棋牌. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
