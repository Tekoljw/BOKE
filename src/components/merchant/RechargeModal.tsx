
import { QrCode } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface RechargeModalProps {
  open: boolean;
  onClose: () => void;
  usdtAddress: string;
}

const RechargeModal = ({ open, onClose, usdtAddress }: RechargeModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>USDT充值</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex justify-center">
            <QrCode className="w-48 h-48" />
          </div>
          <div className="p-4 bg-muted rounded-lg break-all text-center">
            <p className="text-sm text-muted-foreground mb-2">USDT充值地址</p>
            <p className="font-mono">{usdtAddress}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RechargeModal;
