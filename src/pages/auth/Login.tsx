
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Mock login logic - in a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Based on username prefix, navigate to different dashboards
      if (username.startsWith("admin")) {
        navigate("/admin");
      } else if (username.startsWith("agent")) {
        navigate("/agent");
      } else if (username.startsWith("merchant")) {
        navigate("/merchant");
      } else {
        // Default to merchant
        navigate("/merchant");
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
          <h1 className="text-3xl font-bold text-gray-900">棋牌游戏联运中心</h1>
          <p className="mt-2 text-gray-600">请登录您的账号</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>账号登录</CardTitle>
            <CardDescription>
              输入您的凭据以访问您的账户
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
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
          © 2024 棋牌游戏联运中心. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
