
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowUp, ArrowDown } from 'lucide-react';

interface Vendor {
  id: string;
  name: string;
  enabled: boolean;
  order: number;
}

interface Game {
  id: string;
  name: string;
  enabled: boolean;
  vendorId: string;
}

// Mock data
const mockVendors: Vendor[] = [
  { id: '1', name: '开元棋牌', enabled: true, order: 1 },
  { id: '2', name: 'AG', enabled: true, order: 2 },
];

const mockGames: Game[] = [
  { id: '1', name: '德州扑克', enabled: true, vendorId: '1' },
  { id: '2', name: '二人麻将', enabled: true, vendorId: '1' },
  { id: '3', name: '百家乐', enabled: true, vendorId: '2' },
];

const AdminGames: React.FC = () => {
  const [vendors, setVendors] = React.useState<Vendor[]>(mockVendors);
  const [games, setGames] = React.useState<Game[]>(mockGames);

  const handleVendorToggle = (vendorId: string) => {
    setVendors(vendors.map(vendor => 
      vendor.id === vendorId ? { ...vendor, enabled: !vendor.enabled } : vendor
    ));
  };

  const handleGameToggle = (gameId: string) => {
    setGames(games.map(game => 
      game.id === gameId ? { ...game, enabled: !game.enabled } : game
    ));
  };

  const moveVendor = (vendorId: string, direction: 'up' | 'down') => {
    const currentIndex = vendors.findIndex(v => v.id === vendorId);
    if (
      (direction === 'up' && currentIndex > 0) || 
      (direction === 'down' && currentIndex < vendors.length - 1)
    ) {
      const newVendors = [...vendors];
      const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
      [newVendors[currentIndex], newVendors[targetIndex]] = 
      [newVendors[targetIndex], newVendors[currentIndex]];
      
      // Update order numbers
      newVendors.forEach((vendor, index) => {
        vendor.order = index + 1;
      });
      
      setVendors(newVendors);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">游戏Demo管理</h1>
        <p className="text-muted-foreground">管理游戏Demo页面展示的游戏和厂商</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>厂商和游戏管理</CardTitle>
          <CardDescription>
            管理厂商的排序、开关状态，以及游戏的展示状态
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="border rounded-lg p-4 space-y-4">
              <h3 className="font-medium mb-4">厂商排序和开关</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>排序</TableHead>
                    <TableHead>厂商名称</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead>操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vendors.map((vendor) => (
                    <TableRow key={vendor.id}>
                      <TableCell>{vendor.order}</TableCell>
                      <TableCell>{vendor.name}</TableCell>
                      <TableCell>
                        <Switch 
                          checked={vendor.enabled}
                          onCheckedChange={() => handleVendorToggle(vendor.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => moveVendor(vendor.id, 'up')}
                            disabled={vendor.order === 1}
                          >
                            <ArrowUp className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => moveVendor(vendor.id, 'down')}
                            disabled={vendor.order === vendors.length}
                          >
                            <ArrowDown className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-4">游戏列表管理</h3>
              <Tabs defaultValue={vendors[0]?.id} className="w-full">
                <TabsList className="w-full justify-start">
                  {vendors.map((vendor) => (
                    <TabsTrigger key={vendor.id} value={vendor.id}>
                      {vendor.name}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {vendors.map((vendor) => (
                  <TabsContent key={vendor.id} value={vendor.id}>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>游戏名称</TableHead>
                          <TableHead>状态</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {games
                          .filter(game => game.vendorId === vendor.id)
                          .map((game) => (
                            <TableRow key={game.id}>
                              <TableCell>{game.name}</TableCell>
                              <TableCell>
                                <Switch 
                                  checked={game.enabled}
                                  onCheckedChange={() => handleGameToggle(game.id)}
                                />
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminGames;
