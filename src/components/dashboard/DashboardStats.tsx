
import { Users, TrendingUp, ArrowUp, ChartBar } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: number;
  description?: string;
  icon: React.ReactNode;
}

const StatsCard = ({ title, value, description, icon }: StatsCardProps) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value.toLocaleString()}</div>
      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
    </CardContent>
  </Card>
);

export const PromotionStats = () => {
  const stats = [
    { title: "总商户数", value: 256, icon: <Users className="h-4 w-4 text-muted-foreground" /> },
    { title: "活跃商户数", value: 158, icon: <Users className="h-4 w-4 text-green-500" /> },
    { title: "总代理数", value: 45, icon: <ChartBar className="h-4 w-4 text-muted-foreground" /> },
    { title: "活跃代理数", value: 32, icon: <ChartBar className="h-4 w-4 text-green-500" /> },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <StatsCard key={stat.title} {...stat} />
      ))}
    </div>
  );
};

export const ProfitStats = ({ timeFrame }: { timeFrame: string }) => {
  const stats = [
    { title: "商户充值", value: 158900, icon: <TrendingUp className="h-4 w-4 text-blue-500" /> },
    { title: "代理佣金", value: 25600, icon: <ArrowUp className="h-4 w-4 text-green-500" /> },
    { title: "线路成本", value: 42300, icon: <ChartBar className="h-4 w-4 text-red-500" /> },
    { title: "平台利润", value: 91000, icon: <ChartBar className="h-4 w-4 text-purple-500" /> },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <StatsCard key={stat.title} {...stat} />
      ))}
    </div>
  );
};
