
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface BalanceCardProps {
  title: string;
  amount: number;
  className?: string;
  children?: React.ReactNode;
}

const BalanceCard = ({ title, amount, className, children }: BalanceCardProps) => {
  return (
    <Card className={cn("relative", className)}>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{amount.toLocaleString()}</div>
        {children}
      </CardContent>
    </Card>
  );
};

export default BalanceCard;
