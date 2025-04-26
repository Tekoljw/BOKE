
import { Bell } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export const ImportantNotices = () => {
  return (
    <div className="space-y-4">
      <Alert variant="destructive">
        <Bell className="h-4 w-4" />
        <AlertTitle>重要提示</AlertTitle>
        <AlertDescription>
          手动汇率已超过24小时未更新
        </AlertDescription>
      </Alert>
      <Alert variant="warning">
        <Bell className="h-4 w-4" />
        <AlertTitle>重要提示</AlertTitle>
        <AlertDescription>
          当前有 3 条佣金提现待审核
        </AlertDescription>
      </Alert>
    </div>
  );
};
