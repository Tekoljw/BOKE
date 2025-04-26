
import React from 'react';
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";

interface LoadMoreProps {
  onLoadMore: () => void;
  loading?: boolean;
  hasMore?: boolean;
}

export const LoadMore: React.FC<LoadMoreProps> = ({
  onLoadMore,
  loading = false,
  hasMore = true,
}) => {
  if (!hasMore) return null;
  
  return (
    <div className="mt-4 flex justify-center">
      <Button 
        variant="outline" 
        onClick={onLoadMore}
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader className="mr-2 h-4 w-4 animate-spin" />
            加载中...
          </>
        ) : (
          '加载更多'
        )}
      </Button>
    </div>
  );
};
