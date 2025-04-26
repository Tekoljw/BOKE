
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface RankingItem {
  name: string;
  value: number;
  change: string;
}

const RankingTable = ({ items }: { items: RankingItem[] }) => (
  <div className="space-y-4">
    {items.map((item, index) => (
      <div key={index} className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className={`w-6 h-6 flex items-center justify-center rounded-full 
            ${index < 3 ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
            {index + 1}
          </span>
          <span className="font-medium">{item.name}</span>
        </div>
        <div className="text-right">
          <div className="font-mono">{item.value.toLocaleString()}</div>
          <div className={`text-sm ${
            item.change.startsWith('+') ? 'text-green-500' : 'text-red-500'
          }`}>
            {item.change}
          </div>
        </div>
      </div>
    ))}
  </div>
);

export const RankingList = () => {
  const merchantRankings: RankingItem[] = [
    { name: "商户A", value: 50000, change: "+15%" },
    { name: "商户B", value: 45000, change: "+12%" },
    { name: "商户C", value: 42000, change: "-5%" },
    { name: "商户D", value: 38000, change: "+8%" },
    { name: "商户E", value: 35000, change: "+6%" },
  ];

  const agentRankings: RankingItem[] = [
    { name: "代理A", value: 15000, change: "+20%" },
    { name: "代理B", value: 12000, change: "+15%" },
    { name: "代理C", value: 10000, change: "+10%" },
    { name: "代理D", value: 8000, change: "-8%" },
    { name: "代理E", value: 7000, change: "+5%" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>排行榜</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="merchants">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="merchants">商户排行</TabsTrigger>
            <TabsTrigger value="agents">代理排行</TabsTrigger>
          </TabsList>
          <TabsContent value="merchants" className="mt-4">
            <RankingTable items={merchantRankings} />
          </TabsContent>
          <TabsContent value="agents" className="mt-4">
            <RankingTable items={agentRankings} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
