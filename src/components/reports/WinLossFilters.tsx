
import { useState } from 'react';
import { Calendar } from 'lucide-react';
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface WinLossFiltersProps {
  onSearch: (filters: {
    startDate: Date | undefined;
    endDate: Date | undefined;
    playerId: string;
    roundId: string;
  }) => void;
}

export function WinLossFilters({ onSearch }: WinLossFiltersProps) {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [playerId, setPlayerId] = useState('');
  const [roundId, setRoundId] = useState('');

  const handleSearch = () => {
    onSearch({
      startDate,
      endDate,
      playerId,
      roundId
    });
  };

  return (
    <div className="space-y-4 md:space-y-0 md:flex md:gap-4 md:items-end">
      <div className="flex gap-2 flex-col md:flex-row">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full md:w-[180px]">
              <Calendar className="mr-2 h-4 w-4" />
              {startDate ? format(startDate, 'yyyy-MM-dd') : '开始日期'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <CalendarComponent
              mode="single"
              selected={startDate}
              onSelect={setStartDate}
              initialFocus
              className="pointer-events-auto"
            />
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full md:w-[180px]">
              <Calendar className="mr-2 h-4 w-4" />
              {endDate ? format(endDate, 'yyyy-MM-dd') : '结束日期'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <CalendarComponent
              mode="single"
              selected={endDate}
              onSelect={setEndDate}
              initialFocus
              className="pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex gap-2 flex-col md:flex-row">
        <Input
          placeholder="玩家ID"
          value={playerId}
          onChange={(e) => setPlayerId(e.target.value)}
          className="w-full md:w-[180px]"
        />
        <Input
          placeholder="局号"
          value={roundId}
          onChange={(e) => setRoundId(e.target.value)}
          className="w-full md:w-[180px]"
        />
      </div>

      <Button onClick={handleSearch} className="w-full md:w-auto">
        搜索
      </Button>
    </div>
  );
}
