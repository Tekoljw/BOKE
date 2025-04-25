
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md">
        <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">页面未找到</h2>
        <p className="text-gray-600 mb-8">
          您访问的页面不存在或已被移除，请返回首页或尝试其他页面。
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/">
            <Button>返回首页</Button>
          </Link>
          <Button variant="outline" onClick={() => window.history.back()}>
            返回上一页
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
