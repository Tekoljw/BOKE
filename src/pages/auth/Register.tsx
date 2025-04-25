
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Register: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    phone: "",
    accountType: "merchant",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate first step
    if (step === 1) {
      if (formData.password !== formData.confirmPassword) {
        setError("两次输入的密码不一致");
        return;
      }
      setError("");
      setStep(2);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Mock registration logic - in a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Redirect to login
      navigate("/login");
    } catch (err) {
      setError("注册失败，请稍后重试");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">棋牌游戏联运中心</h1>
          <p className="mt-2 text-gray-600">创建您的账号</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>注册账号</CardTitle>
            <CardDescription>
              {step === 1 ? "第1步: 基本信息" : "第2步: 账户详情"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {step === 1 ? (
              <form onSubmit={handleNextStep} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">用户名</Label>
                  <Input
                    id="username"
                    name="username"
                    placeholder="请输入用户名"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">电子邮件</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="请输入电子邮件"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">密码</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="请输入密码"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">确认密码</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="请再次输入密码"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <Button type="submit" className="w-full">
                  下一步
                </Button>
              </form>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">公司名称</Label>
                  <Input
                    id="companyName"
                    name="companyName"
                    placeholder="请输入公司名称"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">联系电话</Label>
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="请输入联系电话"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accountType">账户类型</Label>
                  <Select
                    value={formData.accountType}
                    onValueChange={(value) => handleSelectChange("accountType", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="选择账户类型" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="merchant">商户</SelectItem>
                      <SelectItem value="agent">代理商</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <div className="flex space-x-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-1/2"
                    onClick={() => setStep(1)}
                  >
                    返回
                  </Button>
                  <Button type="submit" className="w-1/2" disabled={loading}>
                    {loading ? "注册中..." : "注册"}
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-600">
              已有账号?{" "}
              <Link to="/login" className="text-primary hover:text-primary/80 font-medium">
                立即登录
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

export default Register;
