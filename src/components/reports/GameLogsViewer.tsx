
interface GameLogsViewerProps {
  logs: string;
}

export function GameLogsViewer({ logs }: GameLogsViewerProps) {
  return (
    <div className="relative">
      <pre className="w-full h-[400px] p-4 bg-gray-100 rounded-lg overflow-y-auto font-mono text-sm whitespace-pre-wrap">
        {logs || '暂无日志数据'}
      </pre>
    </div>
  );
}
