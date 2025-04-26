
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface BalanceCardProps {
  title: string;
  amount: number;
  className?: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
}

const BalanceCard = ({ title, amount, className, children, icon }: BalanceCardProps) => {
  return (
    <Card className={cn("relative", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{amount.toLocaleString()}</div>
        {children}
      </CardContent>
    </Card>
  );
};

export default BalanceCard;
