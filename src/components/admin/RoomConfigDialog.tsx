
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface RoomConfigDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  gameId: string;
  roomId: string;
  currentRate: number;
  onSubmit: (rate: string) => void;
}

const RoomConfigDialog = ({
  open,
  onOpenChange,
  gameId,
  roomId,
  currentRate,
  onSubmit,
}: RoomConfigDialogProps) => {
  const [rate, setRate] = React.useState(currentRate.toString());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(rate);
    onOpenChange(false);
  };

  React.useEffect(() => {
    setRate(currentRate.toString());
  }, [currentRate]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>修改房间杀率配置</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>游戏ID</Label>
              <Input value={gameId} disabled />
            </div>
            <div className="grid gap-2">
              <Label>房间ID</Label>
              <Input value={roomId} disabled />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="rate">杀率设置 (%)</Label>
              <Input
                id="rate"
                type="number"
                min="0"
                max="100"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                placeholder="请输入0-100之间的数值"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">保存设置</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RoomConfigDialog;
